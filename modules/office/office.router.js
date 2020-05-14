const express = require("express");
const router = express.Router();
const officeController = require("./office.controller");

router.get("/:id/direction", officeController.getOfficeDirection);

module.exports = router;
