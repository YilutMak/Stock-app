import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PagesStockDetails from '@/layouts/stockDetail'

import { useAuth } from '@/contexts/Auth'
import { useStockDetails } from '@/contexts/stockDetails'

import LayoutsNavbar from '@/layouts/Navbar'
import LayoutsSidebar from '@/layouts/Sidebar'
import Loading from '@/components/Loading'

function App() {
  const {
    show: {
      loading
    },
    getMyProfile
  } = useAuth()

  const {
    expandDetails
  } = useStockDetails()

  useEffect(() => {
    getMyProfile()
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <LayoutsNavbar />
      <div id="stockBadges" className="d-flex position relative" style={{ marginRight: `${expandDetails.stockBadgesMargin}` }}>
        <LayoutsSidebar className="col" style={{ height: '100%' }} />
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
    </div>
  )
}

export default App
