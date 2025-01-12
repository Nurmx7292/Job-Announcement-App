import React from "react";
import { JobApi } from "../services/JobService";

export const Home = () => {
    const { data: jobs, error, isLoading } = JobApi.useFetchAllJobsQuery();

    return <div>{JSON.stringify(jobs)}</div>;
};
