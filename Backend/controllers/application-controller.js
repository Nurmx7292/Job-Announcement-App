const Application = require("../models/Application");

const createApplication = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "File is required. Please upload an file",
        });
    }
    try {
        const jobIdInfo = req.params.id;
        const { coverLetter } = req.body;

        const existingApplication = await Application.findOne({
            jobId: jobIdInfo,
            applicantId: req.userInfo.userId,
        });

        if (existingApplication) {
            return res.status(409).json({
                success: false,
                message: "You have already applied for this job",
            });
        }

        const newApplication = {
            jobId: jobIdInfo,
            applicantId: req.userInfo.userId,
            resume: req.file.filename,
            coverLetter,
        };

        const applicationInfo = await Application.create(newApplication);

        return res.status(200).json({
            success: true,
            message: "New application has been created",
            data: applicationInfo,
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ success: false, message: "Some error occured" });
    }
};

module.exports = { createApplication };
