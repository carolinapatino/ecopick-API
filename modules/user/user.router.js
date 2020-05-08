const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middleware/auth");

router.post("/register", userController.createUser);
router.get("/login", /*auth.validateToken,*/ userController.validateUser);
router.post(
  "/:id/newPassword",
  auth.validateToken,
  userController.forgotPassword
);

module.exports = router;
