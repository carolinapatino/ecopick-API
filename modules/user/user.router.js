const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middleware/auth");
const multer = require("multer");
var upload = multer({ storage: multer.memoryStorage({}) });

// Registro / Inicio de sesión / Recuperación de contraseña
router.post("/register", userController.createUser);
router.post("/login", userController.validateUser);
router.post("/BO_login", userController.BO_validateUser);
router.put("/:id/newPassword", userController.forgotPassword);

// Manipulación de datos de USER
router.get("/", auth.validateToken, userController.getUsers);
router.post(
  "/:userId/assignDiscount",
  auth.validateToken,
  userController.assignDiscount
);

// Envio de correo con archivo
router.post(
  "/sendAttachment",
  upload.single("file"),
  userController.sendAttachment
);

module.exports = router;
