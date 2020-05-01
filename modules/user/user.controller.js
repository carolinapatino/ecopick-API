const userModel = require("./user.model");
const auth = require("../../middleware/auth");
const logger = require("../../logger");
var createError = require("http-errors");

module.exports = {
    createUser: async function (req,res,next) {
        let results = await userModel.createUser(req.con,req.body);
        if(results instanceof Error) {
            next(createError(500, `${results.message}`));
            logger.error({
                message: `${results.message}`
            });
        }
        else {
            logger.info({
                message: `User ${req.body.email} registered successfully`,
              });
            res.json({ status: "200"/*, token: auth.createToken()*/});
        }
    }
};
