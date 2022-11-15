import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '@/contexts/Auth'

function AuthRoute({ children }) {
  const { show: { data: currentUser, authenticating } } = useAuth()

  if (authenticating) return null
  if (!currentUser) {
    toast.error('You need to login first!')
    return <Navigate to="/auth/login" />
  }

  return children
}

export default AuthRoute
