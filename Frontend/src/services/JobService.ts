import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { IJob } from "../models/Job";

export const JobApi = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3000/api/job/"}),
    tagTypes: ["Job"],
    endpoints: (build) => ({
        fetchAllJobs: build.query<IJob[], void>({
            query: () => "get-all",
            providesTags: ["Job"]
        })
    })
    
})
