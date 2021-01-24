const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("user", "Agrega un email válido").not().isEmpty(),
    check("password", "El password no puede estar vacio").not().isEmpty(),
  ],
  auth,
  authController.userAuth
);

router.post(
  "/reg",
  [
    check("user", "Agrega un email válido").not().isEmpty(),
    check("password", "El password no puede estar vacio").not().isEmpty(),
  ],
  authController.newAdmin
);

router.get("/", auth, authController.authenticatedUser);

module.exports = router;
