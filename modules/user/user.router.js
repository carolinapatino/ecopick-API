const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middleware/auth");

router.post("/register", userController.createUser);
router.post("/login", userController.validateUser);

module.exports = router;
