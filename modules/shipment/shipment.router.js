const express = require("express");
const router = express.Router();
const shipmentController = require("./shipment.controller");
const auth = require("../../middleware/auth");

module.exports = router;

router.post("/", auth.validateToken, shipmentController.createShipment);

module.exports = router;
