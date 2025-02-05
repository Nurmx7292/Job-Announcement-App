// models/Application.ts

export interface IApplication {
    _id: string; // Unique identifier for the application (if available)
    jobId: string; // The ID of the job being applied for
    applicantId: { _id: string; email: string }; // The ID of the applicant
    resume: string; // Filename or URL of the uploaded resume
    coverLetter: string; // The cover letter text provided by the applicant
    createdAt?: string; // (Optional) Timestamp when the application was created
    updatedAt?: string; // (Optional) Timestamp when the application was last updated
}
