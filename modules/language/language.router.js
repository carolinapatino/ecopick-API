const express = require("express");
const router = express.Router();
const languageController = require("./language.controller");

router.post("/:language", languageController.translate);

module.exports = router;
