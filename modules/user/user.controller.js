const userModel = require("./user.model");
const auth = require("../../middleware/auth");
const logger = require("../../logger");
var createError = require("http-errors");

module.exports = {
    createUser: async function (req,res,next) {
        let results = await userModel.createUser(req.con,req.body);
        if(results instanceof Error) {
            next(createError(500, `${results.message}`));
            logger.error({
                message: `${results.message}`
            });
        }
        else {
            logger.info({
                message: `User ${req.body.email} registered successfully`,
              });
            res.json({ status: "200"/*, token: auth.createToken()*/});
        }
    }, 
    validateUser: async function (req, res, next) {
      let results = await userModel.validateUser(req.con, req.body);
      if (results instanceof Error) {
        logger.error({
          message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
        });
        next(createError(500, `${results.message}`));
      } else if (results.length == 0) {
        logger.info({
          message: `STATUS 401 | UNAUTHORIZED | Invalid email or password `,
        });
        res.status(401);
        res.json({});
      } else if (
        results[0].us_charge !== "Client" ||
        results[0].us_fk_status == 5
      ) {
        if (results[0].us_fk_status == 5) {
          logger.info({
            message: `STATUS 204 | NO CONTENT | User ${req.body.email} is disabled.`,
          });
        } else if (results[0].us_charge !== "Client") {
          logger.info({
            message: `STATUS 204 | NO CONTENT | User ${req.body.email} doesn't have permission to access the system`,
          });
        }
        res.status(204);
        res.json({});
      } else {
        logger.info({
          message: `STATUS 200 | OK | User ${req.body.email} has logged in successfully`,
        });
        res.json({ token: auth.createToken(), results });
      }
    },
    BO_validateUser: async function (req, res, next) {
      let results = await userModel.validateUser(req.con, req.body);
      if (results instanceof Error) {
        logger.error({
          message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
        });
        next(createError(500, `${results.message}`));
      } else if (results.length == 0) {
        logger.info({
          message: `STATUS 401 | UNAUTHORIZED | Invalid email or password `,
        });
        res.status(401);
        res.json({});
      } else if (
        results[0].us_charge !== "Admin" ||
        results[0].us_fk_status == 5
      ) {
        if (results[0].us_fk_status == 5) {
          logger.info({
            message: `STATUS 204 | NO CONTENT | User ${req.body.email} is disabled.`,
          });
        } else if (results[0].us_charge !== "Client") {
          logger.info({
            message: `STATUS 204 | NO CONTENT | User ${req.body.email} doesn't have permission to access the system`,
          });
        }
        res.status(204);
        res.json({});
      } else {
        logger.info({
          message: `STATUS 200 | OK | User ${req.body.email} has logged in successfully`,
        });
        res.json({ token: auth.createToken(), results });
      }
    }, 
};
