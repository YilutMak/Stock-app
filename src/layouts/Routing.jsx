import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'

import ReduxProvider from '@/layouts/ReduxProvider'
import { AuthProvider } from '@/contexts/Auth'
import { MyTodosProvider } from '@/contexts/MyTodos'
import { TodosProvider } from '@/contexts/Todos'

import App from '@/layouts/App'
import AuthRoute from '@/layouts/AuthRoute'
import NoAuthRoute from '@/layouts/NoAuthRoute'

import PagesHome from '@/pages/Home'

import PagesAuthLogin from '@/pages/auth/Login'
import PagesAuthSignup from '@/pages/auth/Signup'

import PagesTodosIndex from '@/pages/todos/Index'
import PagesTodosShow from '@/pages/todos/Show'

import PagesMyTodosIndex from '@/pages/my-todos/Index'
import PagesMyTodosNew from '@/pages/my-todos/New'
import PagesMyTodosShow from '@/pages/my-todos/Show'
import PagesMyTodosEdit from '@/pages/my-todos/Edit'

import PagesNotFound from '@/pages/NotFound'

function Routing() {
  return (
    <ReduxProvider>
      <BrowserRouter>
        <AuthProvider>
          <MyTodosProvider>
            <TodosProvider>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<PagesHome />} />

                  <Route path="/auth/login" element={<NoAuthRoute><PagesAuthLogin /></NoAuthRoute>} />
                  <Route path="/auth/signup" element={<NoAuthRoute><PagesAuthSignup /></NoAuthRoute>} />

                  <Route path="/todos" element={<PagesTodosIndex />} />
                  <Route path="/todos/:id" element={<PagesTodosShow />} />

                  <Route path="/my/todos" element={<AuthRoute><PagesMyTodosIndex /></AuthRoute>} />
                  <Route path="/my/todos/new" element={<AuthRoute><PagesMyTodosNew /></AuthRoute>} />
                  <Route path="/my/todos/:id" element={<AuthRoute><PagesMyTodosShow /></AuthRoute>} />
                  <Route path="/my/todos/:id/edit" element={<AuthRoute><PagesMyTodosEdit /></AuthRoute>} />

                  <Route path="*" element={<PagesNotFound />} />
                </Route>
              </Routes>
            </TodosProvider>
          </MyTodosProvider>
        </AuthProvider>
      </BrowserRouter>
    </ReduxProvider>
  )
}

export default Routing
