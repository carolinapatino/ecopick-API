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
router.put("/newPassword", userController.forgotPassword);
router.post("/validateEmail", userController.validateEmail);

// Manipulación de datos del usuario
router.get("/", auth.validateToken, userController.getUsers);
router.get("/:id", auth.validateToken, userController.getUser);
router.put("/", auth.validateToken, userController.updateUser);
router.patch("/disable", auth.validateToken, userController.disableUser);
router.post(
  "/:userId/assignDiscount",
  auth.validateToken,
  userController.assignDiscount
);

// Envio de correos con archivo
router.post(
  "/sendAttachment",
  auth.validateToken,
  upload.single("file"),
  userController.sendAttachment
);

module.exports = router;
