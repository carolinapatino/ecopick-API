var createError = require("http-errors");
const shipmentModel = require("./shipment.model");
const shipmentService = require("./shipment.service");
const receiverModel = require("../receiver/receiver.model");
const packageModel = require("../package/package.model");
const characteristicModel = require("../characteristic/characteristic.model");
const optionModel = require("../option/option.model");
const discountModel = require("../discount/discount.model");
const directionModel = require ("../direction/direction.model");
const logger = require("../../config/logger");

module.exports = {
  getShipment: async function (req, res, next) {
    let results = await shipmentModel.getShipment(
      req.con,
      req.params.trackingId
    );
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | Shippment ${req.params.trackingId} doesn't exist`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | Detail info for shipment #${req.params.trackingId} was found successfully`,
      });
    }
    res.json(results);
  },
  //CONSULTAR ENVIO POR USUARIO
  getShipmentbyUser: async function (req, res, next) {
    let results = await shipmentModel.getShipmentbyUser(
      req.con,
      req.params.userId
    );
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | There are not shipments by user ${req.params.userId}`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | The shipments by user #${req.params.userId} was found successfully`,
      });
    }
    res.json(results);
  },

  //REGISTRAR ENVIO

  createOrder: async function (req, res, next) {
    let receiver = await receiverModel.createReceiver(
      req.con,
      req.body.receiver
    );
    if (receiver instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${receiver.message}`,
      });
      next(createError(500, `${receiver.message}`));
    }
    //Se inserta una dirección y retorna su ID
    let direction = await directionModel.createDirection(
      req.con,
      req.body.direction
    );
    if (direction instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${direction.message}`,
      });
      next(createError(500, `${direction.message}`));
    }

    let shipment = await shipmentModel.createShipment(
      req.con,
      req.body.shipment,
      receiver,
      direction
    );
    if (shipment instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${shipment.message}`,
      });
      next(createError(500, `${shipment.message}`));
    }

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
          message: `STATUS 500 | DATABASE ERROR | ${package.message}`,
        });
        next(createError(500, `${package.message}`));
      }
    }

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
          message: `STATUS 500 | DATABASE ERROR | ${option.message}`,
        });
        next(createError(500, `${option.message}`));
      }
    }

    let discount = await discountModel.useDiscount(
      req.con,
      req.body,
      shipment[0].sh_id
    );
    if (discount instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${discount.message}`,
      });
      next(createError(500, `${discount.message}`));
    }

    logger.info({
      message: `STATUS 201 | CREATED | The shipment ${req.body.shipment.trackingID} has been registered successfully`,
    });

    shipmentService.generateShipmentRoute(
      req.con,
      shipment[0].sh_id,
      req.body.shipment.trackingID,
      req.body.shipment.office,
      direction[0].di_id
    );

    res.status(201);
    res.json({});
  },

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
    for (p in promises) {
      if (promises[p] instanceof Error) {
        logger.error({
          message: `STATUS 500 | DATABASE ERROR | ${promises[p].message}`,
        });
        next(createError(500, promises[p].message));
        return;
      }
    }
    for (p in packages) {
      package_characteristic = await characteristicModel.getCharacteristic(
        req.con,
        packages[p].pa_fk_characteristic
      );
      if (package_characteristic instanceof Error) {
        logger.error({
          message: `STATUS 500 | DATABASE ERROR | ${package_characteristic.message}`,
        });
        next(createError(500, package_characteristic.message));
        return;
      } else {
        packages[p].characteristic = package_characteristic;
      }
    }
    logger.info({
      message: `STATUS 200 | OK | Invoice details for shipment #${req.params.trackingId} were found successfully`,
    });

    res.json({
      options: shipment_options,
      route: { origin: origin, destination: destination },
      receiver: receiver,
      packages: packages,
      discounts: discounts,
    });
  },
  getAllShipments: async function (req, res, next) {
    let results = await shipmentModel.getAllShipments(req.con);
    if (results instanceof Error) {
      logger.error({
        message: `STATUS 500 | DATABASE ERROR | ${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else if (results.length == 0) {
      logger.info({
        message: `STATUS 204 | NO CONTENT | The database doesn't have shipments registered`,
      });
      res.status(204);
    } else {
      logger.info({
        message: `STATUS 200 | OK | Shipments were found successfully`,
      });
    }
    res.json(results);
  },
};
