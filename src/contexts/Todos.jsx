import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'

import { renderErrors } from './_ultils'

const TodosContext = createContext()

const initialIndex = { data: [], error: null, loading: true }
const initialShow = { data: null, error: null, loading: true }

export function TodosProvider({ children }) {
  const [indexState, setIndexState] = useState(initialIndex)
  const [showState, setShowState] = useState(initialShow)

  const getTodos = async () => {
    setIndexState(initialIndex)
    setIndexState(await produce(initialIndex, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: 'https://fswdi-api-auth-todos.herokuapp.com/api/todos'
        })
        draft.data = resp.data.todos
      } catch (err) {
        draft.error = err.response.data
      } finally {
        draft.loading = false
      }
    }))
  }

  const getTodo = async (id) => {
    setShowState(initialShow)
    setShowState(await produce(initialShow, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: `https://fswdi-api-auth-todos.herokuapp.com/api/todos/${id}`
        })
        draft.data = resp.data.todo
      } catch (err) {
        draft.error = err.response.data
        renderErrors(err)
      } finally {
        draft.loading = false
      }
    }))
  }

  const contextData = {
    index: indexState,
    getTodos,
    show: showState,
    getTodo
  }

  return <TodosContext.Provider value={contextData}>{children}</TodosContext.Provider>
}

export function useTodos() {
  return useContext(TodosContext)
}
