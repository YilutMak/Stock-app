import React, { useEffect } from 'react'
import Loading from '@/components/Loading'
import MyStockBadge from '@/components/MyStockBadge'

// import Skeleton from 'react-loading-skeleton'
// import { useNavigate } from 'react-router-dom'

import { useMyStocks } from '@/contexts/MyStocks'
// import { useStocks } from '@/contexts/stocks'

function PagesMyStocksIndex() {
  const {
    index: {
      // dataStocks,
      // dataQuote,
      // dataSpark,
      errorStocks,
      errorQuote,
      errorSpark,
      stocksIsLoading,
      quotesIsLoading,
      sparkIsLoading
    },
    getMyStocks
  } = useMyStocks()

  useEffect(() => {
    getMyStocks()
  }, [])

  const error = errorStocks || errorQuote || errorSpark

  if (error) return <h1 className="text-center">{error.data.message}</h1>
  if (stocksIsLoading || quotesIsLoading || sparkIsLoading) return <h1 className="text-center"><Loading /></h1>

  return (
    <MyStockBadge />
  )
}

export default PagesMyStocksIndex
