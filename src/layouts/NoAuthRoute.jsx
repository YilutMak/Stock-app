import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '@/contexts/Auth'

function NoAuthRoute({ children }) {
  const { show: { data: currentUser, unAuthenticating } } = useAuth()

  if (unAuthenticating) return null
  if (currentUser) {
    toast.error('You are already logged in!')
    return <Navigate to="/" />
  }

  return children
}

export default NoAuthRoute
