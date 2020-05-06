var createError = require("http-errors");
const shipmentModel = require("./shipment.model");
const createError = require("http-errors");
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
  getShipmentRoute: async function (req, res, next) {
    let route = await shipmentModel.getShipmentRoute(
      req.con,
      req.params.trackingId
    );
    if (route instanceof Error) {
      logger.error(route.message);
      next(createError(500, route.message));
    } else {
      logger.info({
        message: `Route details for shipment ${req.params.trackingId} were successfully consulted`,
      });
      res.json(route);
    }
  },
};
