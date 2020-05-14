const officeModel = require("./office.model");
const logger = require("../../config/logger");

module.exports = {
  getOfficeDirection: async function (req, res, next) {
    let results = await officeModel.getOfficeDirection(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | Office ${req.params.id} doesn't exist`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | Office ${req.params.id} direction was found successfuly`,
      });
    }
    res.json(results);
  },
};
