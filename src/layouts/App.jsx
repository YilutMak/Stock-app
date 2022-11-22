import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PagesStockDetails from '@/layouts/stockDetail'

import { useAuth } from '@/contexts/Auth'

import LayoutsNavbar from '@/layouts/Navbar'
import LayoutsSidebar from '@/layouts/Sidebar'
import Loading from '@/components/Loading'

function App() {
  const { show: { loading }, getMyProfile } = useAuth()

  useEffect(() => {
    getMyProfile()
  }, [])

  return (
    <>
      <LayoutsNavbar />
      <div id="stockBadges" className="d-flex position relative">
        <LayoutsSidebar />
        { loading ? <Loading /> : <Outlet />}
        <PagesStockDetails />
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
