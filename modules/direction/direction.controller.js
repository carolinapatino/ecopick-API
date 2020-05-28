const directionModel = require("./direction.model");
const logger = require("../../config/logger");

const Lob = require("lob")(process.env.LOB_API_KEY);

module.exports = {
  test: async function (req, res, next) {
    let addressVerification = await Lob.usVerifications.verify(
      {
        primary_line: req.body.primary_line,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
      },
      (err) => {
        logger.error(err);
      }
    );
    if (
      addressVerification.deliverability == "deliverable" ||
      addressVerification.deliverability == "deliverable_missing_unit"
    ) {
      logger.info({
        message: `STATUS 200 | THIS DIRECTION IS  DELIVERABLE`,
      });
      res.status(200);
    } else {
      logger.info({
        message: `STATUS 204 | THIS DIRECTION IS NOT DELIVERABLE`,
      });
      res.status(204);
    }
    res.json({});
  },
};
