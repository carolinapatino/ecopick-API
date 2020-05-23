const configurationModel = require("./configuration.model");
const logger = require("../../config/logger");

module.exports = {
  getDeliveryStart: async function (req, res, next) {
    let results = await configurationModel.getDeliveryStart(req.con);
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | Configuration "Delivery Start" doesn't exist`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | "Delivery Start" value was found successfuly`,
      });
    }
    res.json(results);
  },
  getBaseCost: async function (req, res, next) {
    let results = await configurationModel.getBaseCost(req.con);
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | Configuration "Shipping Price" doesn't exist`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | "Shipping Price" value was found successfuly`,
      });
    }
    res.json(results);
  },
};
