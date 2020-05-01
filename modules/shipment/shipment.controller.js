const shipmentModel = require("./shipment.model");
const logger = require("../../logger");

module.exports = {
  getInvoice: async function (req, res, next) {
    let [origin, destination, receiver] = await Promise.all([
      shipmentModel.getShipmentOrigin(req.con, req.params.trackingId),
      shipmentModel.getShipmentDestination(req.con, req.params.trackingId),
    ]);
    res.json({
      route: { origin: origin, destination: destination },
    });
  },
};
