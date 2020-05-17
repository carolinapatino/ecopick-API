const configurationModel = require("../configuration/configuration.model");
const directionModel = require("../direction/direction.model");
const officeModel = require("../office/office.model");
const statusModel = require("../status/status.model");
const stopModel = require("../stop/stop.model");
const logger = require("../../config/logger");
const moment = require("moment");
const location = require("../../utils/Location");

function randomDate(start, end) {
  return moment(+start + Math.random() * (end - start));
}

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

async function createRoute(
  con,
  startDate,
  endDate,
  shipmentId,
  originId,
  destinationId,
  route
) {
  var status;
  status = await statusModel.getStatusByName(con, "Out For Delivery");
  await stopModel.createStop(
    con,
    startDate.format("YYYY-MM-DD hh:mm:ss"),
    shipmentId,
    status[0].st_id,
    originId
  );
  var stopDate = startDate;
  var stopDirection;
  for (var i = 0; i < route.length; i++) {
    stopDate = randomDate(stopDate, moment((stopDate + endDate) / 2));
    stopDirection = await directionModel.createDirection(con, route[i]);
    status = await statusModel.getStatusByName(con, "In Transit");
    await stopModel.createStop(
      con,
      stopDate.format("YYYY-MM-DD hh:mm:ss"),
      shipmentId,
      status[0].st_id,
      stopDirection[0].di_id
    );
  }
  status = await statusModel.getStatusByName(con, "Delivered");
  await stopModel.createStop(
    con,
    endDate.format("YYYY-MM-DD hh:mm:ss"),
    shipmentId,
    status[0].st_id,
    destinationId
  );
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
    let route = await generateRoute(trackingID, origin[0], destination[0]);
    let startDate = moment();
    let endDate = randomDate(
      startDate.clone().add(2, "days"),
      startDate.clone().add(7, "days")
    );
    logger.info({
      message: `ROUTE GENERATION | Shipment #${trackingID} |
                  Route start: ${startDate.format("YYYY-MM-DD hh:mm:ss")}
                  Route end: ${endDate.format("YYYY-MM-DD hh:mm:ss")}`,
    });
    await createRoute(
      con,
      startDate,
      endDate,
      shipmentId,
      origin[0].di_id,
      destinationId,
      route
    );
    logger.info({
      message: `ROUTE GENERATION | Shipment #${trackingID} | Ended successfuly`,
    });
  }, deliveryStart[0].co_value * 60000);
}
module.exports = { generateShipmentRoute };
