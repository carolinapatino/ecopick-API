const optionModel = require("./option.model");
const logger = require("../../config/logger");

module.exports = {
  getAllOptions: async function (req, res, next) {
    let results = await optionModel.getAllOptions(req.con);
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | There are not shipment's options`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | The shipment's options was found successfully`,
      });
    }
    res.json(results);
  },
};
