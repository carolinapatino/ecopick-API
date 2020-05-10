const logger = require("../logger.js");

function notFoundLog(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  logger.error({
    message: `ERROR ${err.status}: Not Found`,
  });
  next(err);
}

function setLog(req, res, next) {
  logger.info(req.method + " " + req.originalUrl);
  next();
}

module.exports = { notFoundLog, setLog };
