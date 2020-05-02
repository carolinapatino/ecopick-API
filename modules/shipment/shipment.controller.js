const shipmentModel = require("./shipment.model");
const createError = require("http-errors");
const logger = require("../../logger");

module.exports = {
  getInvoice: async function (req, res, next) {
    let promises = ([
      shipment_options,
      origin,
      destination,
      receiver,
      packages,
      discounts,
    ] = await Promise.all([
      shipmentModel.getShipmentOptions(req.con, req.params.trackingId),
      shipmentModel.getShipmentOrigin(req.con, req.params.trackingId),
      shipmentModel.getShipmentDestination(req.con, req.params.trackingId),
      shipmentModel.getShipmentReceiver(req.con, req.params.trackingId),
      shipmentModel.getShipmentPackages(req.con, req.params.trackingId),
      shipmentModel.getShipmentDiscounts(req.con, req.params.trackingId),
    ]));
    for (p in packages) {
      package_options = await shipmentModel.getPackageCharacteristics(
        req.con,
        packages[p].pa_id
      );
      if (package_options instanceof Error) {
        logger.error(package_options.message);
        next(createError(500, package_options.message));
        return;
      } else {
        packages[p].characteristics = package_options;
      }
    }
    for (p in promises) {
      if (promises[p] instanceof Error) {
        logger.error(promises[p].message);
        next(createError(500, promises[p].message));
        return;
      }
    }
    logger.info(
      `The invoice details for shipment ${req.params.trackingId} were successfully consulted`
    );
    res.json({
      options: shipment_options,
      route: { origin: origin, destination: destination },
      receiver: receiver,
      packages: packages,
      discounts: discounts,
    });
  },
};
