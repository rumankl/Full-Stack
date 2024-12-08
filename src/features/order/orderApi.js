
import { appApi } from "../../app/appApi";


export const orderApi = appApi.injectEndpoints({


  endpoints: (builder) => ({

    getAllOrders: builder.query({
      query: (token) => ({
        url: '/orders',
        // headers: {
        //   Authorization: token
        // },
        method: 'GET'
      }),
      providesTags: ['Order']
    }),

    getUserOrders: builder.query({
      query: (token) => ({
        url: '/orders/users',
        // headers: {
        //   Authorization: token
        // },
        method: 'GET'
      }),
      providesTags: ['Order']
    }),


    getOrderDetail: builder.query({
      query: (q) => ({
        url: `/orders/users/${q.id}`,
        // headers: {
        //   Authorization: q.token
        // },
        method: 'GET'
      }),
      providesTags: ['Order']
    }),

    addOrder: builder.mutation({
      query: (q) => ({
        url: '/orders',
        body: q.body,
        // headers: {
        //   Authorization: q.token
        // },
        method: 'POST'
      }),
      invalidatesTags: ['Order']
    }),





  })

});


export const {
  useAddOrderMutation,
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
  useGetOrderDetailQuery
} = orderApi;