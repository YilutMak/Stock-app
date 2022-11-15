import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'
import { useNavigate } from 'react-router-dom'

import { renderErrors } from './_ultils'

const AuthContext = createContext()

const initialShow = { data: null, error: null, loading: true, authenticating: false, unAuthenticating: false }

export function AuthProvider({ children }) {
  const navigation = useNavigate()
  const [showState, setShowState] = useState(initialShow)

  const getMyProfile = async (updateInBackground) => {
    if (!updateInBackground) setShowState(initialShow)
    setShowState(await produce(updateInBackground ? initialShow : showState, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: 'https://fswdi-api-auth-todos.herokuapp.com/api/my/profile'
        })
        draft.data = resp.data.user
      } catch (err) {
        draft.error = err.response.data
      } finally {
        draft.loading = false
      }
    }))
  }

  const signup = async (data) => {
    setShowState(await produce(showState, async (draft) => { draft.authenticating = true }))
    setShowState(await produce(showState, async (draft) => {
      try {
        const resp = await axios({
          method: 'POST',
          url: 'https://fswdi-api-auth-todos.herokuapp.com/api/auth/signup',
          data
        })
        draft.data = resp.data.user
        navigation('/my/todos')
      } catch (err) {
        renderErrors(err)
      }
    }))
  }

  const login = async (data) => {
    setShowState(await produce(showState, async (draft) => { draft.authenticating = true }))
    setShowState(await produce(showState, async (draft) => {
      try {
        const resp = await axios({
          method: 'POST',
          url: 'https://fswdi-api-auth-todos.herokuapp.com/api/auth/login',
          data
        })
        draft.data = resp.data.user
        navigation('/my/todos')
      } catch (err) {
        renderErrors(err)
      }
    }))
  }

  const logout = async () => {
    setShowState(await produce(showState, async (draft) => { draft.unAuthenticating = true }))
    setShowState(await produce(showState, async (draft) => {
      try {
        await axios({
          method: 'DELETE',
          url: 'https://fswdi-api-auth-todos.herokuapp.com/api/auth/logout'
        })
        draft.data = null
        navigation('/auth/login')
      } catch (err) {
        renderErrors(err)
      }
    }))
  }

  const contextData = {
    show: showState,
    getMyProfile,
    signup,
    login,
    logout
  }

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
