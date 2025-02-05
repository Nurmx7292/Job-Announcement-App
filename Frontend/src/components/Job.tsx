// components/Job.tsx
import React from "react";
import { Link } from "react-router-dom";
import { IJob } from "../models/Job";
import { MdDelete, MdEdit, MdListAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectId, selectRole } from "../store/reducers/userSlice";
import { useDeleteJobMutation } from "../services/JobService";
import { useTranslation } from "react-i18next";

export const Job: React.FC<{ job: IJob }> = ({ job }) => {
    const { t } = useTranslation();
    const [deleteJob] = useDeleteJobMutation();
    const userId = useSelector(selectId);
    const userRole = useSelector(selectRole);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                await deleteJob(job._id).unwrap();
            } catch (error) {
                console.error("Failed to delete job:", error);
            }
        }
    };

    return (
        <div
            key={job._id}
            className="relative bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-300 flex flex-col items-center"
        >
            {/* Иконка редактирования (видна владельцу или администратору) */}
            {(job.employerId === userId || userRole === "admin") && (
                <Link to={`/job/edit/${job._id}`} className="absolute top-6 left-4">
                    <MdEdit className="text-3xl text-blue-500 cursor-pointer" />
                </Link>
            )}
            {/* Иконка удаления (видна владельцу или администратору) */}
            {(job.employerId === userId || userRole === "admin") && (
                <MdDelete
                    onClick={handleDelete}
                    className="absolute top-6 right-4 text-3xl text-red-500 cursor-pointer"
                />
            )}
            <img
                src={job.imageUrl ? `http://54.165.132.132:3000/${job.imageUrl}` : "../assets/default.webp"}
                alt="default"
                height={230}
                width={130}
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">{job.title}</h2>
            <p className="text-gray-600 mt-2">{job.description}</p>
            <p className="text-gray-500 mt-2">
                <strong>{t("location")}:</strong> {job.location}
            </p>
            <p className="text-gray-500 mt-2">
                <strong>{t("salary")}:</strong> ${job.salary.toLocaleString()}
            </p>
            <p className="text-gray-500 mt-2">
                <strong>{t("category")}:</strong> {job.category}
            </p>
            <Link
                to={`/job/${job._id}`}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
                {t("showMore")}
            </Link>

            {/* Иконка для просмотра списка откликов, доступна только создателю джоба */}
            {job.employerId === userId && (
                <Link
                    to={`/job/${job._id}/applications`}
                    className="mt-4 flex items-center text-green-500 hover:text-green-600 transition duration-300"
                    title="View Applications"
                >
                    <MdListAlt className="text-3xl" />
                    <span className="ml-2">{t("viewApplication")}</span>
                </Link>
            )}
        </div>
    );
};
