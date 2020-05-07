var createError = require("http-errors");
const shipmentModel = require("./shipment.model");
const receiverModel = require("../receiver/receiver.model");
const packageModel = require("../package/package.model");
const optionModel = require("../option/option.model");
const discountModel = require("../discount/discount.model");
const logger = require("../../logger");

module.exports = {
  getShipment: async function (req, res, next) {
    let results = await shipmentModel.getShipment(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error({
        message: `${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else {
      logger.info({
        message: `This is the detail of the shipment ${req.params.id}`,
      });
      res.json(results);
    }
  },
  createOrder: async function (req, res, next) {
    // Se inserta un receptor, y retorna su ID
    let receiver = await receiverModel.createReceiver(
      req.con,
      req.body.receiver
    );

    //Se inserta un envío, con la FK del receptor
    let shipment = await shipmentModel.createShipment(
      req.con,
      req.body.shipment,
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
        message: `The shipment ${req.body.shipment.trackingID} has been proceed succesfully`,
      });
      res.json({ status: "200" });
    }
  },
  getInvoice: async function (req, res, next) {
    let promises = ([
      shipment_options,
      origin,
      destination,
      receiver,
      packages,
      discounts,
    ] = await Promise.all([
      shipmentModel.getShipmentOptions(req.con, req.params.trackingId),
      shipmentModel.getShipmentOrigin(req.con, req.params.trackingId),
      shipmentModel.getShipmentDestination(req.con, req.params.trackingId),
      shipmentModel.getShipmentReceiver(req.con, req.params.trackingId),
      shipmentModel.getShipmentPackages(req.con, req.params.trackingId),
      shipmentModel.getShipmentDiscounts(req.con, req.params.trackingId),
    ]));
    for (p in packages) {
      package_options = await packageModel.getPackageCharacteristics(
        req.con,
        packages[p].pa_id
      );
      if (package_options instanceof Error) {
        logger.error(package_options.message);
        next(createError(500, package_options.message));
        return;
      } else {
        packages[p].characteristics = package_options;
      }
    }
    for (p in promises) {
      if (promises[p] instanceof Error) {
        logger.error(promises[p].message);
        next(createError(500, promises[p].message));
        return;
      }
    }
    logger.info(
      `The invoice details for shipment ${req.params.trackingId} were successfully consulted`
    );
    res.json({
      options: shipment_options,
      route: { origin: origin, destination: destination },
      receiver: receiver,
      packages: packages,
      discounts: discounts,
    });
  },
};
