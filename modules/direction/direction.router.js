const express = require("express");
const router = express.Router();
const directionController = require("./direction.controller");

router.get("/:id", directionController.getDirection);

module.exports = router;
