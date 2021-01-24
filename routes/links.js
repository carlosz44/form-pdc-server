const express = require("express");
const router = express.Router();
const linksController = require("../controllers/linksController");
const { check } = require("express-validator");
// const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("name", "Sube un archivo").not().isEmpty(),
    check("original_name", "Sube un archivo").not().isEmpty(),
  ],
  linksController.newLink
);

router.get("/", linksController.allLinks);

router.get(
  "/:url",
  // linksController.tienePassword,
  linksController.getLink
);

router.post(
  "/:url",
  // linksController.verificarPassword,
  linksController.getLink
);

module.exports = router;
