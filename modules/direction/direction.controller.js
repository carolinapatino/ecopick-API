const directionModel = require("./direction.model");
const logger = require("../../config/logger");

module.exports = {
  getDirection: async function (req, res, next) {
    let results = await directionModel.getDirection(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | Direction ${req.params.id} doesn't exist`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | Direction ${req.params.id} was found successfuly`,
      });
    }
    res.json(results);
  },
};
