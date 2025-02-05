// services/ApplicationApi.ts
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { IApplication } from "../models/Application";

export const applicationApi = createApi({
    reducerPath: "applicationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://54.165.132.132:3000/api/application/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Application"],
    endpoints: (build) => ({
        createApplication: build.mutation<IApplication, FormData>({
            query: (formData) => ({
                url: `create/${formData.get("jobId")}`, // Assuming you include jobId in the FormData or adjust as needed
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Application"],
        }),
        fetchApplications: build.query<{ data: IApplication[]; success: boolean }, string>({
            query: (jobId) => `job/${jobId}`, // For example, fetch all applications for a job
            providesTags: ["Application"],
        }),
        // You can add more endpoints for updating, deleting, etc.
    }),
});

export const { useCreateApplicationMutation, useFetchApplicationsQuery } = applicationApi;
