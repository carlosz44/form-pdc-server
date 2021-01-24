const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");
const Links = require("../models/Link");

exports.uploadFile = async (req, res, next) => {
  const multerConfig = {
    limits: { fileSize: 1024 * 1024 * 10 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };

  const upload = multer(multerConfig).single("uploadedFile");

  upload(req, res, async (error) => {
    console.log(req.file);

    if (!error) {
      res.json({ uploadedFile: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

exports.deleteFile = async (req, res) => {
  console.log(req.upload);

  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.upload}`);
    console.log("Archivo Eliminado");
  } catch (error) {
    console.log(error);
  }
};

// Descarga un archivo
exports.download = async (req, res, next) => {
  // Get linl
  const { archivo } = req.params;
  const link = await Links.findOne({ nombre: archivo });

  const archivoDescarga = __dirname + "/../uploads/" + archivo;
  res.download(archivoDescarga);

  // Eliminar el archivo y la entrada de la BD
  // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
  const { descargas, nombre } = link;

  if (descargas === 1) {
    // Eliminar el archivo
    req.archivo = nombre;

    // eliminar la entrada de la bd
    await Links.findOneAndRemove(link.id);
    next();
  } else {
    // si las descargas son > a 1 - Restar 1
    link.descargas--;
    await link.save();
  }
};
