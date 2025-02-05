const express = require("express");
const uploadMiddleware = require("../middleware/upload-middleware");
const authMiddleware = require("../middleware/auth-middleware");
const { createApplication, getApplications } = require("../controllers/application-controller");

const router = express.Router();

router.post("/create/:id", authMiddleware, uploadMiddleware.single("file"), createApplication);
router.get("/job/:jobId", getApplications);

module.exports = router;
