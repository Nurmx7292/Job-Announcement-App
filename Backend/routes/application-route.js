const express = require("express");
const uploadMiddleware = require("../middleware/upload-middleware");
const authMiddleware = require("../middleware/auth-middleware");
const { createApplication } = require("../controllers/application-controller");

const router = express.Router();

router.post("/create/:id", authMiddleware, uploadMiddleware.single("file"), createApplication);

module.exports = router;
