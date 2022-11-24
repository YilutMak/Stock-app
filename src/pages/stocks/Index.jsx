import React, { useEffect } from 'react'

import { useStocks } from '@/contexts/stocks'
import { useSearch } from '@/contexts/search'
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
      queryDataQuote,
      queryDataSpark,
      queryQuoteIsLoading,
      querySparkIsLoading,
      queryErrorQuote,
      queryErrorSpark
    },
    input: { searchStage }
  } = useSearch()

  const haveStocks = stockList?.length > 0
  const recommendationsLoading = recommendIsLoading || SparkIsLoading
  const error = errorRecommendations || errorSpark || queryErrorQuote || queryErrorSpark
  const queryData = queryDataQuote || queryDataSpark
  const queryLoading = queryQuoteIsLoading || querySparkIsLoading

  useEffect(() => {
    if (haveStocks) {
      // console.log('stockList:', stockList)
    }

    console.log('stockList:', stockList)
    getStockRecommendations(query || 'SPY')
    getStocksList()
  }, [])

  const searching = () => {
    // console.log('queryLoading:', queryLoading)
    if (searchStage === 1) {
      return (
        <div id="SearchForStuff" className="d-flex justify-content-end">
          <div className="row w-100 m-1">Search your stock!</div>
        </div>
      )
    }

    if (searchStage === 2 && !queryData) {
      return <Loading />
    }
    if (searchStage === 3 && queryData) {
      console.log('queryData:', queryData)
      return <QueryStockBadge />
    }

    return (<div />)
  }

  const stockRecomendations = () => (recommendationsLoading ? <Loading /> : <RecommendedStockBadge />)

  if (error) return <h1 className="text-center">{error.data}</h1>

  return (
    <div className="d-flex position-relative w-100 m-1">
      <div style={{ height: '150px' }}>
        <div style={{ height: '120px' }}>
          {searching()}

        </div>
        <div id="recommend">
          <h4>Stock Recommendations</h4>
        </div>
        {stockRecomendations()}
      </div>
    </div>
  )
}

export default PagesStocksIndex
