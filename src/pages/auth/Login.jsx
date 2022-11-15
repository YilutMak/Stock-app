import React from 'react'

import { useAuth } from '@/contexts/Auth'

import FormsAuthLogin from '@/forms/auth/Login'

function PagesAuthLogin() {
  const { login } = useAuth()

  return (
    <div id="pages-auth-login" className="container">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <h1 className="text-center">Login</h1>

          <FormsAuthLogin
            onSubmit={login}
          />
        </div>
      </div>
    </div>
  )
}

export default PagesAuthLogin
