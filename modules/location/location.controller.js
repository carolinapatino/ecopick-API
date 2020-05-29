const createError = require("http-errors");
const logger = require("../../config/logger");
const Location = require("../../utils/Location");

module.exports = {
  locationToLatLon: async (req, res, next) => {
    let latLon = await Location.transformDirectionToLatLon(req.body.direction);

    logger.info(
      `STATUS 200 | OK | Location ${req.body.direction} transformed to LatLon`
    );
    res.json(latLon);
  },
};
