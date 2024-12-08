import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../data/apis";




export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',


  }),
  endpoints: (builder) => ({})
});