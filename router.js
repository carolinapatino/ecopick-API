const express = require("express");
const router = express.Router();
const characteristicRouter = require("./modules/characteristic/characteristic.router");
const configurationRouter = require("./modules/configuration/configuration.router");
const directionRouter = require("./modules/direction/direction.router");
const discountRouter = require("./modules/discount/discount.router");
const officeRouter = require("./modules/office/office.router");
const optionRouter = require("./modules/option/option.router");
const packageRouter = require("./modules/package/package.router");
const receiverRouter = require("./modules/receiver/receiver.router");
const shipmentRouter = require("./modules/shipment/shipment.router");
const stopRouter = require("./modules/stop/stop.router");
const userRouter = require("./modules/user/user.router");

//Rutas base para los módulos del proyecto

router.use("/characteristic", characteristicRouter);
router.use("/configuration", configurationRouter);
router.use("/direction", directionRouter);
router.use("/discount", discountRouter);
router.use("/office", officeRouter);
router.use("/option", optionRouter);
router.use("/package", packageRouter);
router.use("/receiver", receiverRouter);
router.use("/shipment", shipmentRouter);
router.use("/stop", stopRouter);
router.use("/user", userRouter);

module.exports = router;
