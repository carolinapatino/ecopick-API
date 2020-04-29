const express = require("express");
const router = express.Router();
const characteristicController = require("./characteristic.controller");
const auth = require("../../middleware/auth");

module.exports = router;
