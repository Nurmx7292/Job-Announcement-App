const express = require("express");
const {
    createJob,
    getAllJobs,
    getSingleJob,
    updateSingleJob,
    deleteSingleJob,
} = require("../controllers/job-controller");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/create-job", authMiddleware, createJob);
router.get("/get-all", getAllJobs);
router.get("/get/:id", getSingleJob);
router.put("/update/:id", authMiddleware, updateSingleJob);
router.delete("/delete/:id", authMiddleware, deleteSingleJob);

module.exports = router;
