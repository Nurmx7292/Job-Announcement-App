// components/JobPost.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Если не требуется сохранять данные в локальном стейте Redux, можно убрать useDispatch
// import { useDispatch } from "react-redux";
import { useCreateJobMutation } from "../services/JobService";
import { useTranslation } from "react-i18next";

type FormDataState = {
    image: File | null;
    title: string;
    company: string;
    description: string;
    location: string;
    salary: string;
    category: string;
    requirements: string;
};

function JobPost() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // Проверяем авторизацию
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
            alert("Must be authorized to post a job!");
        }
    }, [navigate]);

    const [formData, setFormData] = useState<FormDataState>({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: "",
        category: "",
        requirements: "",
        image: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, description: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    // Используем mutation-хук для создания вакансии
    const [createJob, { isLoading, error }] = useCreateJobMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const submissionData = new FormData();
        submissionData.append("title", formData.title);
        submissionData.append("company", formData.company);
        submissionData.append("description", formData.description);
        submissionData.append("location", formData.location);
        submissionData.append("salary", formData.salary);
        submissionData.append("category", formData.category);
        submissionData.append("requirements", formData.requirements);
        if (formData.image) {
            submissionData.append("image", formData.image);
        }

        try {
            const res = await createJob(submissionData).unwrap();
            console.log("Job created:", res);
            navigate("/");
            alert("Job was created successfully!");
        } catch (err) {
            console.error("Error creating job:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-md p-4 space-y-3">
            <h2 className="text-xl font-semibold text-gray-800 text-center">{t("createJobTitle")}</h2>

            <input
                type="text"
                name="title"
                placeholder={t("titlePlaceholder")}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
                type="text"
                name="company"
                placeholder={t("companyPlaceholder")}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <textarea
                name="description"
                placeholder={t("descriptionPlaceholder")}
                onChange={handleTextareaChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-24"
            ></textarea>

            <input
                type="text"
                name="location"
                placeholder={t("locationPlaceholder")}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
                type="number"
                name="salary"
                placeholder={t("salaryPlaceholder")}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <select
                name="category"
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
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input type="file" onChange={handleFileChange} className="w-full" />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                {isLoading ? t("loading") : t("createJobButton")}
            </button>

            {error && (
                <div className="text-red-500">
                    {t("errorCreatingJob")} {JSON.stringify(error)}
                </div>
            )}
        </form>
    );
}

export default JobPost;
