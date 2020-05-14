const location = require("./Location");
const request = require("request");
const logger = require("../config/logger");

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
  async generate() {
    let deliveryStart = await this.doRequest(
      `${process.env.API_URL}/configuration/deliveryStart`
    );
    logger.info({
      message: `ROUTE GENERATION | Shipment #${this.shipment} | Starting in ${deliveryStart.co_value} minutes`,
    });
    setTimeout(async () => {
      logger.info({
        message: `ROUTE GENERATION | Shipment #${this.shipment} | Starts`,
      });
      let origin = await this.doRequest(
        `${process.env.API_URL}/office/${this.originID}/direction`
      );
      let destination = await this.doRequest(
        `${process.env.API_URL}/direction/${this.destinationID}`
      );
      let route = await location.generateRoute(origin, destination);
      logger.info({
        message: `ROUTE GENERATION | Number of stops: ${route.length} (considering origin and destination)`,
      });
    }, deliveryStart.co_value * 10000);
  }
};
