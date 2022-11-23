import React, { useEffect } from 'react'

import { useStocks } from '@/contexts/stocks'
import { useSearch } from '@/contexts/search'
import { useAuth } from '@/contexts/Auth'
import { useMyStocks } from '@/contexts/MyStocks'

import Loading from '@/components/Loading'
import QueryStockBadge from '@/components/QueryStockBadge'
import RecommendedStockBadge from '@/components/RecommendedStockBadge'

function PagesStocksIndex() {
//  const navigate = useNavigate()

  const {
    stockRecomendations: {
      // dataRecommendStocks: finance,
      // dataSpark,
      errorRecommendations,
      errorSpark,
      recommendIsLoading,
      SparkIsLoading
    },
    getStockRecommendations
  } = useStocks()

  const {
    myStocks: {
      stockList
      // errorList,
      // ListIsLoading
    },
    getStocksList
  } = useMyStocks()

  const {
    search: {
      query,
      // queryDataQuote,
      // queryDataSpark,
      queryQuoteIsLoading,
      // querySparkIsLoading,
      queryErrorQuote,
      queryErrorSpark
    }
  } = useSearch()

  const {
    show: {
      data
    }
  } = useAuth()

  useEffect(() => {
    if (stockList) {
      console.log('stockList:', stockList)
      console.log('recommend input:', stockList[stockList.length - 1].symbol)
    }
    getStockRecommendations(stockList ? stockList[stockList.length - 1].symbol : 'SPY')

    if (data) {
      getStocksList()
    }
  }, [])

  console.log('showState:', data)

  const error = errorRecommendations || errorSpark || queryErrorQuote || queryErrorSpark

  if (error) return <h1 className="text-center">{error.data}</h1>
  if (recommendIsLoading || SparkIsLoading) return <h1 className="text-center"><Loading /></h1>

  if (query) {
    return (
      <div className="d-flex position-relative w-100 m-1">
        <div style={{ height: '150px' }}>
          <div style={{ height: '150px' }}>
            {queryQuoteIsLoading ? <Loading /> : <QueryStockBadge />}
          </div>
          <RecommendedStockBadge />
        </div>
      </div>
    )
  }
  return (
    <div className="d-flex position-relative w-100 m-1">
      <div style={{ height: '150px' }}>
        <div style={{ height: '150px' }}>
          <div className="row w-100 m-1">Search your stock!</div>
        </div>
        <RecommendedStockBadge />
      </div>
    </div>
  )
}

export default PagesStocksIndex
