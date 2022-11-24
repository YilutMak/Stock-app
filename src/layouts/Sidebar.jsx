import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '@/contexts/search'

import { useStocks } from '@/contexts/stocks'
import { useMyStocks } from '@/contexts/MyStocks'

function LayoutsSidebar() {
  // const { show: { data: currentUser }, logout } = useAuth()
  const navigate = useNavigate()

  const {
    resetSearch
  } = useSearch()

  const {
    getStockRecommendations
  } = useStocks()

  const goToMyStocks = () => {
    resetSearch()
    navigate('/my/stocks')
  }

  const {
    myStocks: {
      stockList
    }
  } = useMyStocks()

  const gotToStocks = () => {
    resetSearch()
    navigate('/stocks')
    getStockRecommendations(stockList[stockList.length - 1].symbol ? stockList[stockList.length - 1].symbol : 'SPY')
  }

  return (
    <div id="sidebar" style={{ height: '100vh', width: '50px' }}>
      <div id="sidebarMyStock" style={{ height: '50px', width: '50px' }} onClick={() => goToMyStocks()}> </div>
      <div id="sidebarSearch" style={{ height: '50px', width: '50px' }} onClick={() => gotToStocks()}> </div>
    </div>
  )
}

export default LayoutsSidebar

// <a href="https://www.freeiconspng.com/img/9966" title="Image from freeiconspng.com"><img src="https://www.freeiconspng.com/uploads/search-icon-png-2.png" width="30" alt="Png Search Download Icon" /></a>
