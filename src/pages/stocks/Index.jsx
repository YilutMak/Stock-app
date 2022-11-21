import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'
// import moment from 'moment'
// import Skeleton from 'react-loading-skeleton'
// import { useNavigate } from 'react-router-dom'

import { useStocks } from '@/contexts/stocks'
import { useMyStocks } from '@/contexts/MyStocks'
import Loading from '@/components/Loading'
import PagesStockDetails from '@/layouts/stockDetail'

function PagesStocksIndex() {
//  const navigate = useNavigate()
  const {
    stockRecomendations: {
      dataRecommendStocks: finance,
      dataSpark,
      errorRecommendations,
      errorSpark,
      recommendIsLoading,
      SparkIsLoading
    },
    getStockRecommendations
  } = useStocks()

  const {
    createMyStock
  } = useMyStocks()

  useEffect(() => {
    getStockRecommendations('SPY')
  }, [])

  const createGraph = (ticker) => {
    // console.log(ticker)

    const options = {
      chart: {
        toolbar: {
          show: false
        },
        type: 'line'
      },
      series: [{
        name: 'sales',
        data: [1, 2, 3, 4]
      }],
      xaxis: {
        categories: [1, 2, 3, 4]
      }
    }

    console.log(`#${ticker}`)
    const chart = new ApexCharts(document.querySelector(`#${ticker}`), options)
    chart.render()
  }

  const addStock = (ticker) => {
    console.log('ticker:', ticker)
    createMyStock(ticker)
  }

  const error = errorRecommendations || errorSpark

  // console.log('errorRecommendations:', errorRecommendations)
  // console.log('errorSpark:', errorSpark)

  if (error) return <h1 className="text-center">{error.data}</h1>
  if (recommendIsLoading || SparkIsLoading) return <h1 className="text-center"><Loading /></h1>

  console.log('dataRecommendStocks:', finance)
  console.log('dataSpark:', dataSpark)

  return (
    <>
      <div className="row m-1" style={{ width: '100%', height: '100px' }}>{
        finance.finance.result[0].quotes.map((stock) => (

          stock.regularMarketChangePercent > 0 ? (
            <div className="col-4 p-1" style={{ maxWidth: '300px' }} key={stock.shortName}>
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'green', borderRadius: '10px' }}>
                <div className="ml-2" style={{}}>
                  <div id={stock.symbol} />
                  {recommendIsLoading ? <Loading /> : createGraph(stock.symbol) }
                </div>
                <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
                  <div className=""><b>{stock.symbol}</b></div>
                  <div className="">{stock.regularMarketPrice}</div>
                  <div className=""> {`${stock.regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={() => addStock(stock.symbol)}>+</button>
              </div>
            </div>
          ) : (
            <div className="col-4 p-1" style={{ maxWidth: '300px' }} key={stock.shortName}>
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'red', borderRadius: '10px' }}>
                <div className="ml-2" style={{}}>
                  <div id={stock.symbol} />
                  {recommendIsLoading ? <Loading /> : createGraph(stock.symbol) }
                </div>
                <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
                  <div className=""><b>{stock.symbol}</b></div>
                  <div className="">{stock.regularMarketPrice}</div>
                  <div className=""> {`${stock.regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={() => addStock(stock.symbol)}>+</button>
              </div>
            </div>
          )
        ))
      }
      </div>
      <PagesStockDetails />
    </>
  )
}

export default PagesStocksIndex
