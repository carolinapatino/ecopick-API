const discountModel = require("./discount.model");
const logger = require("../../config/logger");

module.exports = {
  getDiscount: async function (req, res, next) {
    let results = await discountModel.getDiscount(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT |  User ${req.params.id} doesn't have discounts available`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | Available discounts associated with user ${req.params.id} were found successfully`,
      });
    }
    res.json(results);
  },
};
