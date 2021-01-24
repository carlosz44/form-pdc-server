const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config({ path: "variables.env" });

exports.newAdmin = async (req, res) => {
  // Validator Error Messages
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Verify registered user
  const { user, password } = req.body;

  let loginUser = await Auth.findOne({ user });

  if (loginUser) {
    return res.status(400).json({ msg: "El usuario ya esta registrado" });
  }

  // Creating new user
  loginUser = new Auth(req.body);

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  loginUser.password = await bcrypt.hash(password, salt);

  try {
    await loginUser.save();
    res.json({ msg: "Usuario Creado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

exports.userAuth = async (req, res, next) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Buscar el usuario para ver si esta registrado
  const { user, password } = req.body;
  const login = await Auth.findOne({ user });
  // console.log(usuario);

  if (!login) {
    res.status(401).json({ msg: "El Usuario No Existe" });
    return next();
  }

  // Verificar el password y autenticar el usuario

  if (bcrypt.compareSync(password, login.password)) {
    // Create JWT
    const token = jwt.sign(
      {
        id: login._id,
        user: login.user,
      },
      process.env.SECRET,
      {
        expiresIn: "8h",
      }
    );
    res.json({ token });
  } else {
    res.status(401).json({ msg: "Password Incorrecto" });
    return next();
  }
};

exports.authenticatedUser = (req, res, next) => {
  res.json({ user: req.user });
};
