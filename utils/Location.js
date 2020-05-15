const axios = require("axios");
const logger = require("../config/logger");

async function getDirections(start, finish) {
  var route = [];
  await axios
    .get(
      `https://us1.locationiq.com/v1/directions/driving/${start.lon},${start.lat};${finish.lon},${finish.lat}?key=${process.env.LOCATIONIQ_API_KEY}&steps=true&annotations=true`
    )
    .then((response) => {
      for (
        var i = 1;
        i < response.data.routes[0].legs[0].steps.length - 1;
        i++
      ) {
        if (i % 10 == 0 && response.data.routes[0].legs[0].steps.length > 9) {
          route.push(
            response.data.routes[0].legs[0].steps[i].intersections[0].location
          );
        } else if (response.data.routes[0].legs[0].steps.length < 10) {
          route.push(
            response.data.routes[0].legs[0].steps[i].intersections[0].location
          );
        }
      }
    })
    .catch((error) => {
      logger.error({
        message: `${error} | LocationIQ Error | get directions`,
      });
      return new Error(error);
    });
  return route;
}

async function transformDirectionToLatLon(direction) {
  let transformedDir;
  await axios
    .get(
      `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_API_KEY}&q=${direction}&format=json`
    )
    .then((response) => {
      transformedDir = {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      };
    })
    .catch((error) => {
      logger.error({
        message: `${error}  | LocationIQ Error | Transform direction to LatLon`,
      });
      return new Error(error);
    });
  return transformedDir;
}

async function transformLatLonToDirection(lat, lon) {
  let transformedDir;
  await axios
    .get(
      `https://us1.locationiq.com/v1/reverse.php?key=${process.env.LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&format=json`
    )
    .then((response) => {
      transformedDir = {
        city: response.data.address.city,
        country: response.data.address.country,
        county: response.data.address.county,
        state: response.data.address.state,
      };
    })
    .catch((error) => {
      logger.error({
        message: `${error}  | LocationIQ Error | Transform LatLon to direction`,
      });
      return new Error(error);
    });
  return transformedDir;
}

async function transformRoutes(routesLatLon) {
  let route = [];
  for (var i = 0; i < routesLatLon.length; i++) {
    route.push(
      await transformLatLonToDirection(routesLatLon[i][1], routesLatLon[i][0])
    );
  }
  var filtered = route.filter((x) => x !== undefined);
  return filtered;
}

module.exports = {
  generateRoute: async (origin, destination) => {
    originLatLon = await transformDirectionToLatLon(
      origin.di_primary_line + ", " + origin.di_city + ", " + origin.di_state
    );
    destinationLatLon = await transformDirectionToLatLon(
      destination.di_primary_line +
        ", " +
        destination.di_city +
        ", " +
        destination.di_state
    );
    routeLatLon = await getDirections(originLatLon, destinationLatLon);
    let route = await transformRoutes(routeLatLon);
    return route;
  },
};
