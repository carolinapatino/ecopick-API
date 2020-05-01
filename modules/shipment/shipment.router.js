const express = require("express");
const router = express.Router();
const shipmentController = require("./shipment.controller");
const auth = require("../../middleware/auth");

router.get(
  "/:trackingId/invoice",
  auth.validateToken,
  shipmentController.getInvoice
);

module.exports = router;
