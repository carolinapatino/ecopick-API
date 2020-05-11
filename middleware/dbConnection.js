const connectionBD = require("../config/db");

function connect(req, res, next) {
  req.con = connectionBD;
  next();
}

module.exports = { connect };
