const discountModel = require("./discount.model");
const logger = require("../../logger");

module.exports = {
  getDiscount: async function (req, res, next) {
    let results = await discountModel.getDiscount(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error({
        message: `${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else {
      logger.info({
        message: `The discounts associated with the user ${req.params.id} has been found successfully`,
      });
      res.json(results);
    }
  },
};
