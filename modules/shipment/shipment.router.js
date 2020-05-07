const express = require("express");
const router = express.Router();
const shipmentController = require("./shipment.controller");
const auth = require("../../middleware/auth");

router.get("/:id", auth.validateToken, shipmentController.getShipment);
router.post("/", auth.validateToken, shipmentController.createOrder);

module.exports = router;
