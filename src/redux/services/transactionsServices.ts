import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL.api}/transactions`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");

        if (token) {
            headers.set("Authorization", token);
        };
        
        return headers;
    }
  }),
  endpoints: (builder) => ({
    getRecentTransactions: builder.query({
        query: () => ({
            url: "/r",
            method: "GET",
            mode: "cors"
        })
    }),
    getTransactions: builder.query({
        query: ({ is_deleted, is_completed }) => ({
            url: `/?${is_deleted && is_completed ? `is_deleted=${is_deleted}&is_completed=${is_completed}` : (is_deleted ? `is_deleted=${is_deleted}` : (is_completed ? `is_completed=${is_completed}` : ''))}`,
            method: "GET",
            mode: "cors"
        })
    }),
    getTransactionById: builder.query({
        query: ({ _id }) => ({
            url: `/${_id}`,
            method: "GET",
            mode: "cors"
        })
    }),
    getTransactionsStatistics: builder.query({
        query: () => ({
            url: "/s",
            method: "GET",
            mode: "cors"
        })
    }),
    createTransaction: builder.mutation({
        query: (body) => ({
            url: "/",
            method: "POST",
            mode: "cors",
            body: JSON.stringify(body),
            headers:{
                "Content-Type": "application/json"
            }
        })
    }),
    updateTransaction: builder.mutation({
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
    deleteTransaction: builder.mutation({
        query: ({ _id }) => ({
            url: `/${_id}`,
            method: "DELETE",
            mode: "cors"
        })
    })
  })
});

export const { 
    useGetRecentTransactionsQuery, 
    useGetTransactionByIdQuery,
    useGetTransactionsQuery,
    useGetTransactionsStatisticsQuery,
    useCreateTransactionMutation, 
    useUpdateTransactionMutation,
    useDeleteTransactionMutation 
} = transactionsApi;