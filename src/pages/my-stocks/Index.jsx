import React from 'react'
// import moment from 'moment'
// import Skeleton from 'react-loading-skeleton'
// import { useNavigate } from 'react-router-dom'

import { useGetMyStocksQuery } from '@/services/api/MyStocks'

function PagesMyStocksIndex() {
  // const navigate = useNavigate()
  // const { data: { todos: myTodos } = {}, isLoading, error } = useGetMyStocksQuery()
  const { error } = useGetMyStocksQuery()

  if (error) return <h1 className="text-center">{error.data.message}</h1>

  return (
    <div id="pages-my-todos-index" className="container">
      my stocks
    </div>
  )
}

export default PagesMyStocksIndex
