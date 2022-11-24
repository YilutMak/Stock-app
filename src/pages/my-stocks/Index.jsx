import React, { useEffect } from 'react'
import Loading from '@/components/Loading'
import MyStockBadge from '@/components/MyStockBadge'

import { useMyStocks } from '@/contexts/MyStocks'

function PagesMyStocksIndex() {
  const {
    index: {
      dataQuote,
      dataSpark,
      errorQuote,
      errorSpark
      // stocksIsLoading,
      // quotesIsLoading,
      // sparkIsLoading
    },
    myStocks: {
      stockList,
      // errorList,
      ListIsLoading
    },
    // getMyStocks,
    getStocksList
  } = useMyStocks()

  const error = errorQuote || errorSpark
  // const loading = stocksIsLoading || quotesIsLoading || sparkIsLoading
  const data = dataQuote || dataSpark
  const moreThanOneStock = stockList?.length > 0

  useEffect(() => {
    getStocksList()
  }, [])

  if (stockList) console.log('stockList:', stockList)

  if (error) return <h1 className="text-center">{error.data.message}</h1>

  if (!moreThanOneStock && !ListIsLoading) {
    return (
      <div className="d-flex justify-content-center" style={{ width: '100%', height: '300px' }}>
        <div id="empty" />
      </div>

    )
  }

  if (moreThanOneStock && !data) return <h1 className="text-center"><Loading /></h1>

  return (
    <MyStockBadge />
  )
}

export default PagesMyStocksIndex
