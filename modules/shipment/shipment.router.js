const express = require("express");
const router = express.Router();
const shipmentController = require("./shipment.controller");
const auth = require("../../middleware/auth");

router.get("/:id", /*auth.validateToken,*/ shipmentController.getShipment);

module.exports = router;
