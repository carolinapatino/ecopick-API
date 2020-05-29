const characteristicModel = require("./characteristic.model");
const logger = require("../../config/logger");

module.exports = {
  getAllCharacteristic: async function (req, res, next) {
    let results = await characteristicModel.getAllCharacteristic(req.con);
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | There are not package's characteristics`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | The package's characteristics was found successfully`,
      });
    }
    res.json(results);
  },
};
