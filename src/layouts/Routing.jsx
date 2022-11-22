import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'

import { AuthProvider } from '@/contexts/Auth'
import { MyStocksProvider } from '@/contexts/MyStocks'
import { StocksProvider } from '@/contexts/stocks'
import { SearchProvider } from '@/contexts/search'

import App from '@/layouts/App'
import AuthRoute from '@/layouts/AuthRoute'
import NoAuthRoute from '@/layouts/NoAuthRoute'

import PagesHome from '@/pages/Home'

import PagesAuthLogin from '@/pages/auth/Login'
import PagesAuthSignup from '@/pages/auth/Signup'

import PagesStockIndex from '@/pages/stocks/Index'

import PagesMyStocksIndex from '@/pages/my-stocks/Index'

import PagesNotFound from '@/pages/NotFound'

function Routing() {
  return (
    <BrowserRouter>
      <SearchProvider>

        <AuthProvider>
          <MyStocksProvider>
            <StocksProvider>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<PagesHome />} />

                  <Route path="/auth/login" element={<NoAuthRoute><PagesAuthLogin /></NoAuthRoute>} />
                  <Route path="/auth/signup" element={<NoAuthRoute><PagesAuthSignup /></NoAuthRoute>} />

                  <Route path="/stocks" element={<PagesStockIndex />} />

                  <Route path="/my/stocks" element={<AuthRoute><PagesMyStocksIndex /></AuthRoute>} />
                  {/* <Route path="/my/todos/new" element={<AuthRoute><PagesMyTodosNew /></AuthRoute>} /> */}

                  <Route path="*" element={<PagesNotFound />} />
                </Route>
              </Routes>
            </StocksProvider>
          </MyStocksProvider>
        </AuthProvider>
      </SearchProvider>
    </BrowserRouter>
  )
}

export default Routing
