// services/JobService.ts
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { IJob } from "../models/Job";

export const JobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://54.165.132.132:3000/api/job/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Job"],
  endpoints: (build) => ({
    fetchAllJobs: build.query<{data:IJob[], success:boolean}, void>({
      query: () => "get-all",
      providesTags: ["Job"],
    }),
    fetchUserJobs: build.query<{ data: IJob[]; success: boolean }, void>({
      query: () => "get-user-posts",
      providesTags: ["Job"]
    }),
    createJob: build.mutation<IJob, FormData>({
      query: (formData) => ({
        url: "create-job",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Job"],
    }),
    // New endpoint to fetch a single job by its ID
    fetchSingleJob: build.query<{data:IJob, success:boolean}, string>({
      query: (jobId) => `get/${jobId}`,
      providesTags: ["Job"],
    }),
    // New endpoint to update a job
    updateJob: build.mutation<IJob, { jobId: string; updateData: Partial<IJob> }>({
      query: ({ jobId, updateData }) => ({
        url: `update/${jobId}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Job"],
    }),
    // (Existing delete endpoint from previous example)
    deleteJob: build.mutation<{ success: boolean; message: string }, string>({
      query: (jobId) => ({
        url: `delete/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useFetchAllJobsQuery,
  useFetchUserJobsQuery,
  useCreateJobMutation,
  useFetchSingleJobQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = JobApi;
