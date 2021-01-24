const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("documentId", "El número de DNI es obligatorio").not().isEmpty(),
    check("firstName", "El nombre es obligatorio").not().isEmpty(),
    check("lastName", "Los apellidos son obligatorios").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("phone", "El número de teléfono es obligatorio").not().isEmpty(),
    check("retailSpaceType", "El tipo de local es obligatorio").not().isEmpty(),
    check("mode", "La modalidad de compra es obligatoria").not().isEmpty(),
    check("ammount", "El monto abonado es obligatorio").not().isEmpty(),
    // check("contractUrl", "El contrato es obligatorio").not().isEmpty(),
    // check("depositsUrl", "La(s) constancia(s) de depósito son obligatorias")
    //   .not()
    //   .isEmpty(),
    // check("receiptsUrl", "Lo(s) recibo(s) de abono son obligatorios")
    //   .not()
    //   .isEmpty(),
  ],
  userController.newUser
);

module.exports = router;
