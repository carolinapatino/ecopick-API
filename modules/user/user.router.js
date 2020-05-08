const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middleware/auth");

router.post("/register", userController.createUser);
router.get("/login", /*auth.validateToken,*/ userController.validateUser);
router.put(
  "/:id/newPassword",
  auth.validateToken,
  userController.forgotPassword
);
router.post(
  "/:userId/discount/:discountId",
  auth.validateToken,
  userController.assignDiscount
);
router.get("/", auth.validateToken, userController.getUsers);

module.exports = router;
