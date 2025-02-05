const express = require("express");
const { upload } = require("../upload")
const {
    createJob,
    getAllJobs,
    getSingleJob,
    updateSingleJob,
    deleteSingleJob,
    getUserJobs,
} = require("../controllers/job-controller");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/create-job", authMiddleware,upload.single("image"), createJob);
router.get("/get-user-posts",authMiddleware,getUserJobs);
router.get("/get-all", getAllJobs);
router.get("/get/:id", getSingleJob);
router.put("/update/:id", authMiddleware, updateSingleJob);
router.delete("/delete/:id", authMiddleware, deleteSingleJob);

module.exports = router;
