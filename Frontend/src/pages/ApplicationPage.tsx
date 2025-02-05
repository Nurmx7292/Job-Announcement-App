import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCreateApplicationMutation } from "../services/ApplicationApi";

export const ApplicationPage = () => {
    const { id: jobId } = useParams(); 
    const navigate = useNavigate();

    const [coverLetter, setCoverLetter] = useState("");
     
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const [success, setSuccess] = useState(false);

    const [createApplication, { isLoading, error }] = useCreateApplicationMutation();

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (!resumeFile) {
            alert("Please upload your resume.");
            return;
        }

        
        const formData = new FormData();
        formData.append("jobId", jobId!); 
        formData.append("coverLetter", coverLetter);
        formData.append("file", resumeFile); 

        try {
            const response = await createApplication(formData).unwrap();
            console.log("Application submitted successfully:", response);

            setSuccess(true);

            setTimeout(() => {
                navigate(`/job/${jobId}`);
            }, 3000); 
        } catch (err) {
            console.error("Failed to submit application:", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Apply for the Job</h2>

            {success ? (
                <div className="p-4 mb-6 text-green-800 bg-green-200 rounded">
                    Your application has been submitted successfully!
                </div>
            ) : null}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block font-semibold mb-2" htmlFor="resume">
                        Upload Your Resume
                    </label>
                    <input
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              setResumeFile(files[0]);
                            }
                          }}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-2" htmlFor="coverLetter">
                        Cover Letter
                    </label>
                    <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows={6}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="border rounded p-2 w-full"
                        placeholder="Write your cover letter here..."
                    />
                </div>

                {error && <div className="mb-4 text-red-600">An error occurred. Please try again.</div>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                >
                    {isLoading ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
};
