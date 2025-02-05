import { JobApi } from "../services/JobService";
import { Job } from "../components/Job";
import { useTranslation } from "react-i18next";

export const MyPosts = () => {
    const { t } = useTranslation();

    // Fetch jobs for the user using the RTK Query hook
    const { data: response, error, isLoading } = JobApi.useFetchUserJobsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred while fetching jobs.</div>;
    if (!response || response.data.length === 0) return <div>No jobs found.</div>;

    console.log(error);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">{t("myPost")}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {response.data.map((job) => (
                    <Job key={job._id} job={job} />
                ))}
            </div>
        </div>
    );
};
