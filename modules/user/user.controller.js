const userModel = require("./user.model");
const discountModel = require("../discount/discount.model");
const auth = require("../../middleware/auth");
const logger = require("../../logger");
const Email = require("../../utils/Email");
var createError = require("http-errors");

module.exports = {
  createUser: async function (req, res, next) {
    let user = await userModel.createUser(req.con, req.body);
    if (user instanceof Error) {
      next(createError(500, `${user.message}`));
      logger.error({
        message: `${user.message}`,
      });
    } else {
      let discount = await discountModel.getDiscountByName(req.con, "Welcome");
      if (discount instanceof Error) {
        next(createError(500, `${discount.message}`));
        logger.error({
          message: `Discount not found | ${discount.message}`,
        });
      } else {
        logger.info({
          message: `User ${req.body.email} registered successfully`,
        });
        let assignedDiscount = await discountModel.assignDiscount(
          req.con,
          user[0].us_id,
          discount[0].di_id
        );
        if (assignedDiscount instanceof Error) {
          next(createError(500, `${assignedDiscount.message}`));
          logger.error({
            message: `Discount not assigned | ${assignedDiscount.message}`,
          });
        } else {
          new Email(req.body.email, req.body.first_name, "Welcome").send(
            "-" + discount[0].di_percentage * 100
          );
        }
        res.json({ status: "200" /*, token: auth.createToken()*/ });
      }
    }
  },
  validateUser: async function (req, res, next) {
    let results = await userModel.validateUser(req.con, req.body);
    if (results instanceof Error) {
      logger.error({
        message: `${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else {
      if (results.length == 0) {
        logger.info({
          message: `The user entered an invalid email or password `,
        });
        //res.json(results);
        res.json({ status: "401" });
      } else {
        if (results[0].us_charge !== "Client" || results[0].us_fk_status == 5) {
          if (results[0].us_fk_status == 5) {
            logger.info({
              message: `The user ${req.body.email} is disabled.`,
            });
          } else {
            logger.info({
              message: `The user ${req.body.email} hasn't permission to access to the system`,
            });
          }
          //res.json(results);
          res.json({ status: "403" });
        } else {
          logger.info({
            message: `The user ${req.body.email} has logged in successfully`,
          });
          //res.json(results);
          res.json({ status: "200", token: auth.createToken() });
        }
      }
    }
  },
};
