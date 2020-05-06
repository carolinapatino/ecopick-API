var createError = require("http-errors");
const shipmentModel = require("./shipment.model");
const logger = require("../../logger");

module.exports = {
  getShipment: async function (req, res, next) {
    let results = await shipmentModel.getShipment(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error({
        message: `${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else {
      logger.info({
        message: `This is the detail of the shipment ${req.params.id}`,
      });
      res.json(results);
    }
  },
};
