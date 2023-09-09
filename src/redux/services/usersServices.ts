import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL.api}/users`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");

        if (token) {
            headers.set("Authorization", JSON.parse(token));
        };
        
        return headers;
    }
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
        query: ({ is_activated }) => ({
            url: `/?is_activated=${is_activated}`,
            method: "GET",
            mode: "cors"
        })
    }),
    getUserById: builder.query({
        query: ({ _id }) => ({
            url: `/${_id}`,
            method:  "GET",
            mode: "cors"
        })
    }),
    updateUser: builder.mutation({
        query: (body) => ({
            url: `/${body._id}`,
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }),
    deleteUser: builder.mutation({
        query: ({ _id }) => ({
            url: `/${_id}`,
            method: "DELETE",
            mode: "cors"
        })
    })
  })
});

export const { 
    useGetUserByIdQuery,
    useGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApi;