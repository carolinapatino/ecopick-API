const location = require("./Location");
const request = require("request");
const logger = require("../config/logger");

const officeController = require("../modules/office/office.controller");

module.exports = class Route {
  constructor(trackingId, originID, destinationID) {
    this.shipment = trackingId;
    this.originID = originID;
    this.destinationID = destinationID;
    this.deliveryStart = 1;
  }
  doRequest(url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(JSON.parse(body)[0]);
        } else {
          reject(error);
        }
      });
    });
  }
  async getRoute(origin, destination) {
    logger.info({
      message: `ROUTE GENERATION | Shipment #${this.shipment} | Starts`,
    });
    let route = await location.generateRoute(origin, destination);
    logger.info({
      message: `ROUTE GENERATION | Shipment #${
        this.shipment
      } | Number of stops: ${
        route.length + 2
      } (considering origin and destination)`,
    });
    return route;
  }
  async generate() {
    let deliveryStart = await this.doRequest(
      `${process.env.API_URL}/configuration/deliveryStart`
    );
    logger.info({
      message: `ROUTE GENERATION | Shipment #${this.shipment} | Starting in ${deliveryStart.co_value} minutes`,
    });
    setTimeout(async () => {
      let origin = await this.doRequest(
        `${process.env.API_URL}/office/${this.originID}/direction`
      );
      let destination = await this.doRequest(
        `${process.env.API_URL}/direction/${this.destinationID}`
      );
      let route = await this.getRoute(origin, destination);
    }, deliveryStart.co_value * 6);
  }
};
