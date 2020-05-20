const express = require("express");
const router = express.Router();
const officeController = require("./office.controller");
const auth = require("../../middleware/auth");

router.get("/", auth.validateToken, officeController.getAllOffices);
module.exports = router;
