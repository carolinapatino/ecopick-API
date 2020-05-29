const express = require("express");
const router = express.Router();
const directionController = require("./direction.controller");

router.post("/verify", directionController.test);
module.exports = router;
