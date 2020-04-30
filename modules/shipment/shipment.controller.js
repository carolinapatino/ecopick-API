var createError = require("http-errors");
const shipmentModel = require("./shipment.model");
const auth = require("../../middleware/auth");
const logger = require("../../logger");
module.exports = {
  createShipment: async function (req, res, next) {
    let results = await shipmentModel.createShipment(req.con, req.body);
    if (results instanceof Error) {
      logger.error({
        message: `${results.message}`,
      });
      next(createError(500, `${results.message}`));
    } else {
      logger.info({
        message: `The shipment ${req.body.trackingID} has been proceed succesfully`,
      });
      res.json({ status: "200", token: auth.createToken() });
      //Esta parte del token DEBE estar en iniciar sesión unicamente
      //TAMBIEN PUEDE ser parte del registro, pero esto unicamente si hacemos que el usuario inicie sesión automáticamente luego de registrarse
      //En el caso de que al registrarse le presentemos el formulario de iniciar sesión, no deberia estar el auth.createToken
    }
  },
};
