import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '@/contexts/search'

function LayoutsSidebar() {
  // const { show: { data: currentUser }, logout } = useAuth()
  const navigate = useNavigate()

  const {
    resetSearch
  } = useSearch()

  const goToMyStocks = () => {
    resetSearch()
    navigate('/my/stocks')
  }

  const gotToStocks = () => {
    resetSearch()
    navigate('/stocks')
  }

  return (
    <div style={{ height: '100%', width: '50px' }}>
      <div style={{ height: '50px', width: '50px', background: 'gray' }} onClick={() => goToMyStocks()}> stocks </div>
      <div style={{ height: '50px', width: '50px', background: 'black' }} onClick={() => gotToStocks()}> search </div>
      <div style={{ height: '100%', width: '50px', background: 'blue' }} />
    </div>
  )
}

export default LayoutsSidebar
