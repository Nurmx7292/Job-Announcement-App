// pages/JobDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { JobApi } from "../services/JobService";
import { useTranslation } from "react-i18next";

export const JobDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: response, error, isLoading } = JobApi.useFetchAllJobsQuery();

    if (isLoading) return <div>Loading job details...</div>;
    if (error) return <div>Error loading job details.</div>;

    const job = response?.data?.find((job) => job._id === id);
    if (!job) return <div>Job not found.</div>;

    const imageUrl = job.imageUrl ? `http://54.165.132.132:3000/${job.imageUrl}` : "../assets/default.webp";

    // Функция для автоматического перехода на страницу подачи заявки
    const handleApply = () => {
        navigate(`/job/${job._id}/apply`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <img src={imageUrl} alt={job.title} className="w-full h-auto rounded-lg shadow-lg object-cover" />
                </div>

                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                    <p className="text-lg text-gray-600 mb-4">{job.description}</p>
                    <p className="text-gray-500 mb-2">
                        <strong>{t("location")}:</strong> {job.location}
                    </p>
                    <p className="text-gray-500 mb-2">
                        <strong>{t("salary")}:</strong> ${job.salary.toLocaleString()}
                    </p>
                    <p className="text-gray-500 mb-2">
                        <strong>{t("category")}:</strong> {job.category}
                    </p>

                    {job.requirements && job.requirements.length > 0 && (
                        <div className="mt-4">
                            <strong>{t("requirements")}:</strong>
                            <ul className="list-disc pl-5 mt-2">
                                {job.requirements}
                            </ul>
                        </div>
                    )}
                    <div className="mt-6">
                        <button
                            onClick={handleApply}
                            className="inline-block px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                        >
                            {t("applyNow")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
