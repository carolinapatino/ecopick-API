const express = require("express");
const router = express.Router();
const discountController = require("./discount.controller");
const auth = require("../../middleware/auth");

router.get("/:id", discountController.getDiscount);

module.exports = router;
