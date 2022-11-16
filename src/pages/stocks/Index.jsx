import React, { useEffect } from 'react'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

import { useStocks } from '@/contexts/stocks'

function PagesStocksIndex() {
//  const navigate = useNavigate()
  const { getStockRecommendations } = useStocks()

  useEffect(() => {
    console.log(getStockRecommendations('INTC'))
  }, [])

  return (
    <div>Stocks
    </div>
  )
}

export default PagesStocksIndex
