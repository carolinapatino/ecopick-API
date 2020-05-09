const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middleware/auth");
const multer = require("multer");
var upload = multer({ storage: multer.memoryStorage({}) });

router.post("/register", userController.createUser);
router.get("/login", /*auth.validateToken,*/ userController.validateUser);
router.put(
  "/:id/newPassword",
  auth.validateToken,
  userController.forgotPassword
);
router.post(
  "/:userId/assignDiscount",
  auth.validateToken,
  userController.assignDiscount
);
router.get("/", auth.validateToken, userController.getUsers);
router.post(
  "/sendAttachment",
  upload.single("file"),
  userController.sendAttachment
);

module.exports = router;
