var createError = require("http-errors");
const shipmentModel = require("./shipment.model");
const receiverModel = require("../receiver/receiver.model");
const packageModel = require("../package/package.model");
const optionModel = require("../option/option.model");
const discountModel = require("../discount/discount.model");
const logger = require("../../config/logger");

module.exports = {
  //CONSULTAR ENVIO
  getShipment: async function (req, res, next) {
    let results = await shipmentModel.getShipment(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT |  Shippment ${req.params.id} doesn't exist`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | Detail info for shipment #${req.params.id} was found successfully`,
      });
    }
    res.json(results);
  },
  //REGISTRAR ENVIO
  createOrder: async function (req, res, next) {
    // Se inserta un receptor, y retorna su ID
    let receiver = await receiverModel.createReceiver(
      req.con,
      req.body.receiver
    );
    if (receiver instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${receiver.message}`));
    }

    //Se inserta un envío, con la FK del receptor
    let shipment = await shipmentModel.createShipment(
      req.con,
      req.body.shipment,
      receiver
    );
    if (shipment instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${shipment.message}`));
    }

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
      if (package instanceof Error) {
        logger.error({
          message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
        });
        next(createError(500, `${package.message}`));
      }
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
      if (option instanceof Error) {
        logger.error({
          message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
        });
        next(createError(500, `${option.message}`));
      }
    }

    // Se actualiza la validez de un descuento y se le agrega la FK del envio
    let discount = await discountModel.useDiscount(
      req.con,
      req.body,
      shipment[0].sh_id
    );
    if (discount instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${discount.message}`));
    }

    logger.info({
      message: `STATUS 201 | CREATED | The shipment ${req.body.shipment.trackingID} has been registered successfully`,
    });
    res.status(201);
    res.json({});
  },
  //CONSULTAR RUTA DE ENVIO
  getShipmentRoute: async function (req, res, next) {
    let route = await shipmentModel.getShipmentRoute(
      req.con,
      req.params.trackingId
    );
    if (route instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${route.message}`,
      });
      next(createError(500, route.message));
    } else if (route.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | Shippment #${req.params.trackingId} hasn't started its route or doesn't exist`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | Route info for shipment #${req.params.trackingId} was found successfully`,
      });
    }
    res.json(route);
  },
};
