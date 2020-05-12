const express = require("express");
const router = express.Router();
const discountController = require("./discount.controller");
const auth = require("../../middleware/auth");

router.get("/:userId", auth.validateToken, discountController.getDiscount);

module.exports = router;
