// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseUrl } from "../../data/apis";
import { appApi } from "../../app/appApi";


// export const productApi = createApi({
//   reducerPath: 'productApi',
//   baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),


export const productApi = appApi.injectEndpoints({

  endpoints: (builder) => ({

    getProducts: builder.query({
      query: (q) => ({
        url: '/products',
        params: {
          search: q
        },
        method: 'GET'
      }),
      providesTags: ['Product']
    }),


    getTop5: builder.query({
      query: () => ({
        url: '/products/top-5-products',
        method: 'GET'
      }),
      providesTags: ['Product']
    }),


    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET'
      }),
      providesTags: ['Product']
    }),


    addProduct: builder.mutation({
      query: (q) => ({
        url: '/products',
        body: q.body,
        method: 'POST',
        // headers: {
        //   Authorization: q.token
        // }
      }),
      invalidatesTags: ['Product']
    }),


    updateProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        body: q.body,
        method: 'PATCH',
        // headers: {
        //   Authorization: q.token
        // }
      }),
      invalidatesTags: ['Product']
    }),

    removeProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        method: 'DELETE',
        // headers: {
        //   Authorization: q.token
        // }
      }),
      invalidatesTags: ['Product']
    }),







  })

});


export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useGetTop5Query,
  useRemoveProductMutation
} = productApi;