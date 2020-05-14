const express = require("express");
const router = express.Router();
const configurationController = require("./configuration.controller");

router.get("/deliveryStart", configurationController.getDeliveryStart);

module.exports = router;
