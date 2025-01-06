const Job = require("../models/Job");

const createJob = async (req, res) => {
    try {
        const { title, description, location, salary, category, requirements, employerId } = req.body;

        const newJob = {
            title,
            description,
            location,
            salary,
            category,
            requirements,
            employerId: req.userInfo.userId,
        };

        const newlyCreatedJob = await Job.create(newJob);

        return res.status(201).json({
            success: true,
            message: "Job has been created",
            job: newlyCreatedJob,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({});

        if (jobs.length > 0) {
            return res.status(200).json({
                success: true,
                data: jobs,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No books found in collection",
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const getSingleJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const singleJob = await Job.findById(jobId);

        if (!singleJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        } else {
            return res.status(200).json({
                success: true,
                data: singleJob,
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const updateSingleJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, location, salary, category, requirements } = req.body;

        const existingJob = await Job.findById(jobId);

        if (!existingJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        if (req.userInfo.userId !== existingJob.employerId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this job",
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { title, description, location, salary, category, requirements },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: updatedJob,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const deleteSingleJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        if (job.employerId.toString() !== req.userInfo.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this job",
            });
        }

        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

module.exports = { createJob, getAllJobs, getSingleJob, updateSingleJob, deleteSingleJob };
