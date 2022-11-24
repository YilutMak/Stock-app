import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiMyTodos = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: `${process.env.API_URL}' }),
  reducerPath: 'apiMyTodos',
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getMyStocks: builder.query({
      query: () => ({
        url: '/api/my/stocks',
        method: 'GET'
      })
    }),
    createMyStock: builder.mutation({
      query: (data) => ({
        url: '/api/my/stocks',
        method: 'POST',
        data
      })
    }),
    deleteMyStock: builder.mutation({
      query: (data) => ({
        url: '/api/my/stock/:id',
        method: 'DELETE',
        data
      })
    })
  })
})

export const { useGetMyStocksQuery, useCreateMyStockMutation, useDeleteMyStockMutation } = apiMyTodos
