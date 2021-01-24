const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.newUser = async (req, res) => {
  // Validator Error Messages
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Verify registered user
  const { documentId } = req.body;

  let user = await User.findOne({ documentId });

  if (user) {
    return res.status(400).json({ msg: "El usuario ya esta registrado" });
  }

  // Creating new user
  user = new User(req.body);

  try {
    await user.save();
    res.json({ msg: "Usuario Creado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};
