import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/api" }),
  tagTypes: ["users", "user"],
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["users"],
    }),
    getUser: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
      }),
      providesTags: (result, error, arg) => [{ type: "user", id: arg }],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "users",
        { type: "user", id: arg.id },
      ],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = usersApi;
