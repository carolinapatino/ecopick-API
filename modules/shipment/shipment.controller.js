var createError = require("http-errors");
const shipmentModel = require("./shipment.model");
const receiverModel = require("../receiver/receiver.model");
const packageModel = require("../package/package.model");
const optionModel = require("../option/option.model");
const discountModel = require("../discount/discount.model");
const auth = require("../../middleware/auth");
const logger = require("../../logger");

module.exports = {
  createOrder: async function (req, res, next) {
    // Se inserta un receptor, y retorna su ID
    let receiver = await receiverModel.createReceiver(req.con, req.body);

    //Se inserta un envío, con la FK del receptor
    let shipment = await shipmentModel.createShipment(
      req.con,
      req.body,
      receiver
    );

    // Se inicia un ciclo para insertar todos los paquetes de este envío
    var i;
    let package;
    for (i = 0; i < req.body.packages.length; i++) {
      package = await packageModel.createPackage(
        req.con,
        req.body,
        shipment,
        i
      );
    }
    // Se inicia un ciclo para insertar todas las opciones de envío
    let option;
    for (i = 0; i < req.body.options.length; i++) {
      option = await optionModel.JoinOptionShipment(
        req.con,
        req.body,
        shipment,
        i
      );
    }

    // Se actualiza la validez de un descuento y se le agrega la FK del envio
    console.log(req.body.id);
    let discount = await discountModel.useDiscount(req.con, req.body, shipment);

    if (receiver instanceof Error) {
      logger.error({
        message: `${receiver.message}`,
      });
      next(createError(500, `${receiver.message}`));
    }
    if (shipment instanceof Error) {
      logger.error({
        message: `${shipment.message}`,
      });
      next(createError(500, `${shipment.message}`));
    }
    if (package instanceof Error) {
      logger.error({
        message: `${package.message}`,
      });
      next(createError(500, `${package.message}`));
    }
    if (option instanceof Error) {
      logger.error({
        message: `${option.message}`,
      });
      next(createError(500, `${option.message}`));
    }
    if (discount instanceof Error) {
      logger.error({
        message: `${discount.message}`,
      });
      next(createError(500, `${discount.message}`));
    } else {
      logger.info({
        message: `The shipment ${req.body.trackingID} has been proceed succesfully`,
      });
      res.json({ status: "200" });
    }
  },
};
