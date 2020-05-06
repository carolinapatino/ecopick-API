const express = require("express");
const router = express.Router();
const shipmentController = require("./shipment.controller");
const auth = require("../../middleware/auth");

router.get("/:id", auth.validateToken, shipmentController.getShipment);
router.get("/:trackingId/route", shipmentController.getShipmentRoute);

module.exports = router;
