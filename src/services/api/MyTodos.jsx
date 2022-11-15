import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/services/axios-base-query'

export const apiMyTodos = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'https://fswdi-api-auth-todos.herokuapp.com/api/my/todos' }),
  reducerPath: 'apiMyTodos',
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getMyTodos: builder.query({
      query: () => ({
        url: '',
        method: 'GET'
      })
    }),
    createMyTodo: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'POST',
        data
      })
    })
  })
})

export const { useGetMyTodosQuery, useCreateMyTodoMutation } = apiMyTodos
