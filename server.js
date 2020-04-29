const app = require("./app");
const logger = require("./logger");
const port = 3000;

// El servidor levanta la aplicación
app.listen(port, () => {
  logger.info({
    message: `App listening`,
  });
});
