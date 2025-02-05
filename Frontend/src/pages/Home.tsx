import { useState, useMemo } from "react";
import { JobApi } from "../services/JobService";
import { Job } from "../components/Job";
import { useTranslation } from "react-i18next";

export const Home = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const { data: response, error, isLoading } = JobApi.useFetchAllJobsQuery();

    const jobs = response && Array.isArray(response.data) ? response.data : [];

    const uniqueCategories = Array.from(new Set(jobs.map((job) => job.category))).filter(Boolean);
    const uniqueLocations = Array.from(new Set(jobs.map((job) => job.location))).filter(Boolean);

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch =
                searchTerm.trim() === "" ||
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === "" || job.category === selectedCategory;
            const matchesLocation = selectedLocation === "" || job.location === selectedLocation;

            return matchesSearch && matchesCategory && matchesLocation;
        });
    }, [jobs, searchTerm, selectedCategory, selectedLocation]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{t("jobListings")}</h1>

            {isLoading ? (
                <div>{t("loading")}</div>
            ) : error ? (
                <div>{t("errorLoadingJobs")}</div>
            ) : jobs.length === 0 ? (
                <div>{t("noJobsAvailable")}</div>
            ) : (
                <>
                    <div className="mb-6 flex flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder={t("searchJobsPlaceholder")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2"
                        />

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2"
                        >
                            <option value="">{t("allCategories")}</option>
                            {uniqueCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2"
                        >
                            <option value="">{t("allLocations")}</option>
                            {uniqueLocations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => <Job job={job} key={job._id} />)
                        ) : (
                            <div className="col-span-full text-center text-gray-500">{t("noJobsMatchFilters")}</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
