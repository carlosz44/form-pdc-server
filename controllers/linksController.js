const Links = require("../models/Link");
const shortid = require("shortid");
// const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.newLink = async (req, res, next) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Creatring link object
  const { original_name, name } = req.body;

  const link = new Links();
  link.url = shortid.generate();
  link.name = shortid.generate();
  link.original_name = original_name;
  // link.autor = req.user.documentId;

  // Si el usuario esta autenticado
  // if (req.usuario) {
  //   const { password, descargas } = req.body;

  // Asignar a enlace el número de descargas
  // if (descargas) {
  //   link.descargas = descargas;
  // }

  // asignar un password
  // if (password) {
  //   const salt = await bcrypt.genSalt(10);
  //   link.password = await bcrypt.hash(password, salt);
  // }

  // Asignar el autor

  // }
  console.log(link);
  // Almacenar en la BD
  try {
    await link.save();
    return res.json({ msg: `${link.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

// Get link list
exports.allLinks = async (req, res) => {
  try {
    const links = await Links.find({}).select("url -_id");
    res.json({ links });
  } catch (error) {
    console.log(error);
  }
};

// Retorna si el enlace tiene password o no
// exports.tienePassword = async (req, res, next) => {
//   // console.log(req.params.url);
//   const { url } = req.params;

//   console.log(url);

//   // Verificar si existe el enlace
//   const enlace = await Enlaces.findOne({ url });

//   if (!enlace) {
//     res.status(404).json({ msg: "Ese Enlace no existe" });
//     return next();
//   }

//   if (enlace.password) {
//     return res.json({ password: true, enlace: enlace.url });
//   }

//   next();
// };

// Verifica si el password es Correcto
// exports.verificarPassword = async (req, res, next) => {
//   const { url } = req.params;
//   const { password } = req.body;

//   // Consultar por el enlace
//   const link = await Links.findOne({ url });

//   // Verificar el password
//   if (bcrypt.compareSync(password, link.password)) {
//     // Permitirle al usuario descargar el archivo
//     next();
//   } else {
//     return res.status(401).json({ msg: "Password Incorrecto" });
//   }
// };

// Get Link
exports.getLink = async (req, res, next) => {
  // console.log(req.params.url);
  const { url } = req.params;

  // Verify link
  const link = await Links.findOne({ url });

  if (!link) {
    res.status(404).json({ msg: "Enlace no existe" });
    return next();
  }

  // If link doesn't exist
  res.json({ archivo: link.nombre, password: false });

  next();
};
