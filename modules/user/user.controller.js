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
    }, 
    BO_validateUser: async function (req, res, next) {
      let results = await userModel.BO_validateUser(req.con,req.body); 
      if (results instanceof Error) {
        logger.error({
          message: `${results.message}`,
        });
        next(createError(500, `${results.message}`));
      } else { 
            if (results.length==0) {
              logger.info({
                message: `The user entered an invalid email or password `,
                });
                //res.json(results);
                res.json({ status: "401"});
            } else {
                if ((results[0].us_charge !== "Admin")||(results[0].us_fk_status==5)) { 
                      if(results[0].us_fk_status==5){
                          logger.info({
                          message: `The user ${req.body.email} is disabled.`,
                          });
                      } else { 
                          logger.info({
                          message: `The user ${req.body.email} hasn't permission to access to the system`,
                      }); }
                      //res.json(results);
                      res.json({ status: "403"});
                      }  else { 
                              logger.info({
                              message: `The user ${req.body.email} has logged in successfully`,
                              });
                              //res.json(results);
                              res.json({ status: "200", token: auth.createToken()});
                        }
        }
      }
    }  
};
