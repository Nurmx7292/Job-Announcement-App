const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: [true, "Job ID is required"],
        },
        applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Applicant ID is required"],
        },
        resume: {
            type: String,
        },
        coverLetter: {
            type: String,
            maxlength: [5000, "Cover letter cannot exceed 5000 characters"],
        },
        status: {
            type: String,
            enum: ["submitted", "reviewed", "interview", "hired", "rejected"],
            default: "submitted",
        },
    },
    { timestamps: true }
);

ApplicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

module.exports = mongoose.model("Application", ApplicationSchema);
