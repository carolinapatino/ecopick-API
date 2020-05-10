require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger.js");
const connectionBD = require("./config/db.js");
const router = require("./router.js");
const parseRequestBody = require("./middleware/parseRequestBody");

// Admitir comunicaciones a través de la red con Cors
// if (process.env.NODE_ENV == "production") {
app.use(cors());
// }

// Configuración de elementos de optimización y seguridad
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexión con la BD
app.use(function (req, res, next) {
  req.con = connectionBD;
  next();
});

// Logger que indica cuándo se hizo una petición y a qué URL
app.use((req, res, next) => {
  logger.info(req.method + " " + req.originalUrl);
  next();
});

// Router de la aplicación, con la ruta base de la API
app.use("/mrpostel/api/", parseRequestBody.convertToSnakeCase, router);

// Error 404 en caso de ir a una ruta no especificada
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  logger.error({
    message: `ERROR ${err.status}: Not Found`,
  });
  next(err);
});

module.exports = app;
