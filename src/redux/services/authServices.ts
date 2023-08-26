import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body: JSON.stringify(body),
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body: JSON.stringify(body),
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
    }),
  })
});

export const { useSigninMutation, useSignupMutation } = authApi;