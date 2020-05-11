const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middleware/auth");
const multer = require("multer");
var upload = multer({ storage: multer.memoryStorage({}) });

router.post("/register", userController.createUser);
router.post("/login", userController.validateUser);
router.get("/", auth.validateToken, userController.getUsers);
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
router.post(
  "/sendAttachment",
  upload.single("file"),
  userController.sendAttachment
);

module.exports = router;
