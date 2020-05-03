const shipmentModel = require("./shipment.model");
const createError = require("http-errors");
const logger = require("../../logger");

module.exports = {
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
