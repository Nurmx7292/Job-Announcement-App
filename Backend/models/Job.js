const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Job title is required"],
            trim: true,
            maxlength: [100, "Job title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Job description is required"],
            trim: true,
            maxlength: [1000, "Job description cannot exceed 1000 characters"],
        },
        location: {
            type: String,
            required: [true, "Job location is required"],
            trim: true,
            maxlength: [200, "Location cannot exceed 200 characters"],
        },
        salary: {
            type: Number,
            required: [true, "Salary is required"],
            min: [0, "Salary cannot be negative"],
        },
        category: {
            type: String,
            required: [true, "Job category is required"],
            enum: ["Engineering", "Design", "Marketing", "Sales", "Customer Support", "Other"],
        },
        requirements: {
            type: [String],
            enum: [],
        },
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        imageUrl: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
