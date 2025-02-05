import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IUser {
    username: string;
    email: string;
    password: string;
}

interface ILoginResponse {
    username: string;
    email: string;
    accessToken: string;
    userId: string;
    role: string;
}

interface IGetAllUsersResponse {
    data: IUser[];
}

export const UserApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://54.165.132.132:3000/api/user/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Users"],
    endpoints: (build) => ({
        registerUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: "register",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),
        loginUser: build.mutation<ILoginResponse, { email: string; password: string }>({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user,
            }),
        }),
        getAllUsers: build.query<IGetAllUsersResponse, void>({
            query: () => "get-all",
            providesTags: ["Users"], // Adjust the URL to match your API
        }),
        deleteUser: build.mutation<string, string>({
            query: (deleteUserId) => ({
                url: `delete-user/${deleteUserId}`, // send the id as a URL parameter
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetAllUsersQuery } = UserApi;
