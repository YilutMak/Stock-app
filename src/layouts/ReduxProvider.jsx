import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { apiMyTodos } from '@/services/api/MyTodos'

const store = configureStore({
  reducer: {
    [apiMyTodos.reducerPath]: apiMyTodos.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiMyTodos.middleware)
})

setupListeners(store.dispatch)

function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
