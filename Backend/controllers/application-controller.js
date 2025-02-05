// controllers/applicationController.js
const Application = require("../models/Application");

// Создание новой заявки
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

        // Проверка, если пользователь уже подавал заявку на эту вакансию
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
        console.error(e);
        return res.status(400).json({ success: false, message: "Some error occured" });
    }
};

// Получение всех заявок на вакансию по ID вакансии с информацией о пользователях
const getApplications = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        console.log(jobId);
        // Найти все заявки по jobId и популяция информации о пользователе (например, name и email)
        const applications = await Application.find({ jobId }).populate(
            "applicantId",
            "name email" // укажите нужные поля пользователя
        );
        console.log(applications);
        return res.status(200).json({
            success: true,
            data: applications,
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({ success: false, message: "Some error occured" });
    }
};

module.exports = { createApplication, getApplications };
