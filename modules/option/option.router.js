const express = require("express");
const router = express.Router();
const optionController = require("./option.controller");
const auth = require("../../middleware/auth");

router.get("/", auth.validateToken, optionController.getAllOptions);
module.exports = router;
