const express = require("express");
const router = express.Router();
const discountController = require("./discount.controller");
const auth = require("../../middleware/auth");

module.exports = router;
