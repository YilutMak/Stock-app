import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'
import { useNavigate } from 'react-router-dom'

import { renderErrors } from './_ultils'

const MyTodosContext = createContext()

const initialIndex = { data: [], error: null, loading: true }
const initialShow = { data: null, error: null, loading: true }

export function MyTodosProvider({ children }) {
  const navigation = useNavigate()
  const [indexState, setIndexState] = useState(initialIndex)
  const [showState, setShowState] = useState(initialShow)

  const getMyTodos = async () => {
    setIndexState(initialIndex)
    setIndexState(await produce(initialIndex, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: 'https://fswdi-api-auth-todos.herokuapp.com/api/my/todos'
        })
        draft.data = resp.data.todos
      } catch (err) {
        draft.error = err.response.data
        renderErrors(err)
      } finally {
        draft.loading = false
      }
    }))
  }

  const getMyTodo = async (id) => {
    setShowState(initialShow)
    setShowState(await produce(initialShow, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: `https://fswdi-api-auth-todos.herokuapp.com/api/my/todos/${id}`
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

  const createMyTodo = async (data) => {
    try {
      const resp = await axios({
        method: 'POST',
        url: 'https://fswdi-api-auth-todos.herokuapp.com/api/my/todos',
        data
      })
      navigation(`/my/todos/${resp.data.todo.id}`)
    } catch (err) {
      renderErrors(err)
    }
  }

  const updateMyTodo = async (data) => {
    try {
      const resp = await axios({
        method: 'PUT',
        url: `https://fswdi-api-auth-todos.herokuapp.com/api/my/todos/${data.id}`,
        data
      })
      navigation(`/my/todos/${resp.data.todo.id}`)
    } catch (err) {
      renderErrors(err)
    }
  }

  const deleteMyTodo = async (data) => {
    try {
      await axios({
        method: 'DELETE',
        url: `https://fswdi-api-auth-todos.herokuapp.com/api/my/todos/${data.id}`
      })
      navigation('/my/todos')
    } catch (err) {
      renderErrors(err)
    }
  }

  const contextData = {
    index: indexState,
    getMyTodos,
    show: showState,
    getMyTodo,
    createMyTodo,
    updateMyTodo,
    deleteMyTodo
  }

  return <MyTodosContext.Provider value={contextData}>{children}</MyTodosContext.Provider>
}

export function useMyTodos() {
  return useContext(MyTodosContext)
}
