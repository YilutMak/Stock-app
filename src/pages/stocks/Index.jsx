import React, { useEffect } from 'react'
// import moment from 'moment'
// import Skeleton from 'react-loading-skeleton'
// import { useNavigate } from 'react-router-dom'

import { useStocks } from '@/contexts/stocks'

function PagesStocksIndex() {
//  const navigate = useNavigate()
  const { show: { data: finance }, getStockRecommendations } = useStocks()

  useEffect(() => {
    getStockRecommendations('TSLA')
  }, [])

  if (!finance) return <h1 className="text-center">recomendations loading</h1>

  return (
    console.log('recomendations:', finance.finance.result[0].quotes),

      <div className="row m-1" style={{ width: '100%' }}>{
        finance.finance.result[0].quotes.map((stock) => (
          stock.regularMarketChangePercent > 0 ? (
            <div className="col m-2" style={{ width: '30%', height: '100px', border: 'solid black', background: 'green' }}>
              <div className="row"><b className="p-0">{stock.symbol}</b></div>
              <div className="row">{stock.regularMarketPrice}</div>
              <div className="row"> {`${stock.regularMarketChangePercent.toFixed(2)}%`}</div>
            </div>
          ) : (
            <div className="col m-2" style={{ width: '30%', height: '100px', border: 'solid black', background: 'red' }}>
              <div className="row"><b className="p-0">{stock.symbol}</b></div>
              <div className="row">{stock.regularMarketPrice}</div>
              <div className="row"> {`${stock.regularMarketChangePercent.toFixed(2)}%`}</div>
            </div>
          )

        ))
      }
      </div>

  )
}

export default PagesStocksIndex
