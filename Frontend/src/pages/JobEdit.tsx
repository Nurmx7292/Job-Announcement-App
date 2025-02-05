// pages/EditJobPost.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSingleJobQuery, useUpdateJobMutation } from "../services/JobService";
import { IJob } from "../models/Job";
import { useTranslation } from "react-i18next";

type FormDataState = {
    title: string;
    description: string;
    location: string;
    salary: number;
    category: string;
    requirements: string | undefined;
};

export const EditJobPost = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fetch the job details using the provided ID
    const { data: job, isLoading, error } = useFetchSingleJobQuery(id!);
    console.log(job);
    // Local state for the form with default values
    const [formData, setFormData] = useState<FormDataState>({
        title: job?.data.title || "",
        description: job?.data.description || "",
        location: job?.data.location || "",
        salary: job?.data.salary || 0,
        category: job?.data.category || "",
        requirements: job?.data.requirements || "",
    });

    // When the job is loaded, pre-populate the form with fallback defaults
    useEffect(() => {
        if (job) {
            setFormData({
                title: job!.data.title,
                description: job!.data.description,
                location: job!.data.location,
                salary: job!.data.salary,
                category: job!.data.category,
                requirements: job!.data.requirements,
            });
        }
    }, [job]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "salary" ? Number(value) : value,
        });
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, description: e.target.value });
    };

    // Set up the mutation hook for updating the job
    const [updateJob, { isLoading: isUpdating, error: updateError }] = useUpdateJobMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateJob({
                jobId: id!,
                updateData: { ...formData, category: formData.category as IJob["category"] },
            }).unwrap();
            alert("Job updated successfully!");
            navigate(`/job/${id}`);
        } catch (err) {
            console.error("Error updating job:", err);
        }
    };

    if (isLoading) return <div>Loading job details...</div>;
    if (error) return <div>Error loading job details: {JSON.stringify(error)}</div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-md p-4 space-y-3">
            <h2 className="text-xl font-semibold text-gray-800 text-center">{t("editJobTitle")}</h2>

            <input
                type="text"
                name="title"
                placeholder={t("titlePlaceholder")}
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <textarea
                name="description"
                placeholder={t("descriptionPlaceholder")}
                value={formData.description}
                onChange={handleTextareaChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-24"
            ></textarea>

            <input
                type="text"
                name="location"
                placeholder={t("locationPlaceholder")}
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
                type="number"
                name="salary"
                placeholder={t("salaryPlaceholder")}
                value={formData.salary}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                <option value="">{t("categoryLabel")}</option>
                <option value="Engineering">{t("categoryOptions.engineering")}</option>
                <option value="Design">{t("categoryOptions.design")}</option>
                <option value="Marketing">{t("categoryOptions.marketing")}</option>
                <option value="Sales">{t("categoryOptions.sales")}</option>
                <option value="Customer Support">{t("categoryOptions.customerSupport")}</option>
                <option value="Other">{t("categoryOptions.other")}</option>
            </select>

            <input
                type="text"
                name="requirements"
                placeholder={t("requirementsPlaceholder")}
                value={formData.requirements}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
                type="submit"
                disabled={isUpdating}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                {isUpdating ? t("loading") : t("updateJobButton")}
            </button>

            {updateError && (
                <div className="text-red-500">
                    {t("errorUpdatingJob")} {JSON.stringify(updateError)}
                </div>
            )}
        </form>
    );
};
