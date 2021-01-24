const express = require("express");
const router = express.Router();
const uploadsController = require("../controllers/uploadsController");

router.post("/", uploadsController.uploadFile);

router.get("/:url", uploadsController.download, uploadsController.deleteFile);

module.exports = router;
