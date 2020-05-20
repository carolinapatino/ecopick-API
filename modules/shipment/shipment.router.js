const express = require("express");
const router = express.Router();
const shipmentController = require("./shipment.controller");
const auth = require("../../middleware/auth");

router.get("/:trackingId", auth.validateToken, shipmentController.getShipment);
router.get(
  "/byUser/:userId",
  /*auth.validateToken,*/
  shipmentController.getShipmentbyUser
);
router.post("/", auth.validateToken, shipmentController.createOrder);

router.get("/:trackingId/route", shipmentController.getShipmentRoute);
router.get(
  "/:trackingId/invoice",
  auth.validateToken,
  shipmentController.getInvoice
);

module.exports = router;
