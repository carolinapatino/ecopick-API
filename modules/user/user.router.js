const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middleware/auth");

router.post("/register", userController.createUser);
router.post("/login", userController.validateUser);
router.post("/BO_login",/*auth.validateToken,*/userController.BO_validateUser); 

module.exports = router;
