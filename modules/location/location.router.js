const express = require("express");
const router = express.Router();
const locationController = require("./location.controller");

router.post("/latLon", locationController.locationToLatLon);

module.exports = router;
