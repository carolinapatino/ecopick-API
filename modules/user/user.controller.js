const userModel = require("./user.model");
const discountModel = require("../discount/discount.model");
const auth = require("../../middleware/auth");
const logger = require("../../config/logger");
const Email = require("../../utils/Email");
var createError = require("http-errors");

module.exports = {
  // Registro / Inicio de sesión / Recuperación de contraseña
  createUser: async function (req, res, next) {
    let user = await userModel.createUser(req.con, req.body);
    if (user instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${user.message}`,
      });
      next(createError(500, `${user.message}`));
    } else {
      let discount = await discountModel.getDiscountByName(req.con, "Welcome");
      if (discount instanceof Error) {
        logger.error({
          message: `STATUS 500 | DATABASE ERROR | ${discount.message}`,
        });
        next(createError(500, `${discount.message}`));
      } else {
        logger.info({
          message: `STATUS 201 | CREATED | User ${req.body.email} registered successfully`,
        });
        let assignedDiscount = await discountModel.assignDiscount(
          req.con,
          user[0].us_id,
          discount[0].di_id
        );
        if (assignedDiscount instanceof Error) {
          logger.error({
            message: `STATUS 500 | DATABASE ERROR | Discount not assigned | ${assignedDiscount.message}`,
          });
          next(createError(500, `${assignedDiscount.message}`));
        } else {
          new Email(
            req.body.email,
            req.body.first_name,
            "Welcome"
          ).discountAnnouncement("-" + discount[0].di_percentage * 100);
        }
        res.status(201);
        res.json({});
      }
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
      } else if (results[0].us_charge !== "Admin") {
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
  forgotPassword: async function (req, res, next) {
    var password = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    let result = await userModel.updatePassword(
      req.con,
      req.body.email,
      password
    );
    if (result instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${result.message}`,
      });
      next(createError(500, `${result.message}`));
    } else {
      if (result.length == 0) {
        logger.info({
          message: `STATUS 204 | NO CONTENT | User ${req.body.email} doesn't exist`,
        });
        res.status(204);
      } else {
        new Email(
          req.body.email,
          result[0].us_first_name,
          "Password"
        ).passwordChange(password);
        logger.info({
          message: `STATUS 200 | OK | The password for user ${req.body.email} was changed successfully`,
        });
      }
      res.json({});
    }
  },
  // Manipulación de datos del usuario
  getUsers: async function (req, res, next) {
    let users = await userModel.getUsers(req.con, req.body);
    if (users instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${users.message}`,
      });
      next(createError(500, `${users.message}`));
    } else if (users.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | No users  with charge ${req.body.charge} registered`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | Users with charge ${req.body.charge} where sucessfully consulted`,
      });
    }
    res.json(users);
  },
  getUser: async function (req, res, next) {
    let user = await userModel.getUser(req.con, req.params.id);
    if (user instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${user.message}`,
      });
      next(createError(500, `${user.message}`));
    } else if (user.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | User ${req.params.id} doesn't exist`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | User ${req.params.id} was sucessfully consulted`,
      });
    }
    res.json(user);
  },
  assignDiscount: async function (req, res, next) {
    let assignedDiscount = await discountModel.assignDiscount(
      req.con,
      req.params.userId,
      req.body.discount.id
    );
    if (assignedDiscount instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | Discount not assigned | ${assignedDiscount.message}`,
      });
      next(createError(500, `${assignedDiscount.message}`));
    } else {
      new Email(
        req.body.user.email,
        req.body.user.firstName,
        "Discount"
      ).discountAnnouncement("-" + req.body.discount.percentage * 100);
      logger.info({
        message: `STATUS 201 | CREATED | Discount ${req.body.discount.id} assigned successfully to user ${req.body.user.email}`,
      });
      res.status(201);
      res.json({});
    }
  },
  // Envio de correos
  sendAttachment: async function (req, res, next) {
    new Email(req.body.userEmail, req.body.userName, "Attachment").invoice(
      req.file
    );
  },
};
