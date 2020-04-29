const express = require("express");
const router = express.Router();
const receiverController = require("./receiver.controller");
const auth = require("../../middleware/auth");

module.exports = router;
