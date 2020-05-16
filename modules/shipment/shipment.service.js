const configurationModel = require("../configuration/configuration.model");
const directionModel = require("../direction/direction.model");
const officeModel = require("../office/office.model");
const logger = require("../../config/logger");
const location = require("../../utils/Location");

async function generateRoute(trackingID, origin, destination) {
  logger.info({
    message: `ROUTE GENERATION | Shipment #${trackingID} | Starts`,
  });
  let route = await location.generateRoute(origin, destination);
  logger.info({
    message: `ROUTE GENERATION | Shipment #${trackingID} | Number of stops: ${
      route.length + 2
    } (considering origin and destination)`,
  });
  return route;
}

async function generateShipmentRoute(
  con,
  shipmentId,
  trackingID,
  originId,
  destinationId
) {
  let origin = await officeModel.getOfficeDirection(con, originId);
  let destination = await directionModel.getDirection(con, destinationId);
  let deliveryStart = await configurationModel.getDeliveryStart(con);

  logger.info({
    message: `ROUTE GENERATION | Shipment #${trackingID} | Starting in ${deliveryStart[0].co_value} minutes`,
  });
  setTimeout(async () => {
    await generateRoute(trackingID, origin[0], destination[0]);
  }, deliveryStart[0].co_value * 6);
}
module.exports = { generateShipmentRoute };
