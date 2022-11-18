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

      <div className="row m-1" style={{ width: '100%', height: '100px' }}>{
        finance.finance.result[0].quotes.map((stock) => (

          stock.regularMarketChangePercent > 0 ? (
            <div className="col-4 p-1">
              <div className="d-flex  `" style={{ height: '100px', border: '4px solid black', background: 'green', borderRadius: '10px' }}>
                <div style={{ height: '100%', width: '30%' }}>
                  stock chart
                </div>
                <div className="m-1">
                  <div className=""><b className="p-0">{stock.symbol}</b></div>
                  <div className="">{stock.regularMarketPrice}</div>
                  <div className=""> {`${stock.regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-4 p-1">
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'red', borderRadius: '10px' }}>
                <div style={{ height: '100%', width: '30%' }}>
                  stock chart
                </div>
                <div className="m-1">
                  <div className=""><b className="p-0">{stock.symbol}</b></div>
                  <div className="">{stock.regularMarketPrice}</div>
                  <div className=""> {`${stock.regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
              </div>
            </div>
          )

        ))
      }
      </div>

  )
}

export default PagesStocksIndex
