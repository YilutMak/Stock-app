import React from 'react'
import { VictoryLine } from 'victory'

import { useStocks } from '@/contexts/stocks'
import { useMyStocks } from '@/contexts/MyStocks'

import Loading from '@/components/Loading'

function RecommendedStockBadge() {
  const {
    stockRecomendations: {
      dataRecommendStocks: finance,
      dataSpark,
      // errorRecommendations,
      // errorSpark,
      recommendIsLoading
      // SparkIsLoading
    }
  } = useStocks()

  const {
    createMyStock
  } = useMyStocks()

  const handleSidebarOpen = () => {
    function openSidebar() {
      document.getElementById('stockDetails').style.width = '33%'
      document.getElementById('stockBadges').style.marginRight = '33%'
    }
    openSidebar()
  }

  const addStock = (ticker) => {
    console.log('ticker:', ticker)
    createMyStock(ticker)
  }

  return (
    <div className="row m-1" style={{}}>{
          finance.finance.result[0].quotes.map((stock) => (
            stock.regularMarketChangePercent > 0 ? (
              <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={stock.shortName} onClick={handleSidebarOpen}>
                <div className="" style={{ height: '100px', border: '4px solid black', background: 'green', borderRadius: '10px' }}>
                  <div className="ml-2" style={{}}>
                    <div id={stock.symbol} />
                    {recommendIsLoading
                      ? <Loading />
                      : (
                        <VictoryLine
                          style={{
                            data: { stroke: '#000000', strokeWidth: 6 },
                            parent: {}
                          }}
                          data={dataSpark[stock.symbol].timestamp.map((time, u) => ({ x: dataSpark[stock.symbol].timestamp[u], y: dataSpark[stock.symbol].close[u] }))}
                        />
                      ) }
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
              <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={stock.shortName} onClick={handleSidebarOpen}>
                <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'red', borderRadius: '10px' }}>
                  <div className="ml-2" style={{}}>
                    <div id={stock.symbol} />
                    {recommendIsLoading
                      ? <Loading />
                      : (
                        <VictoryLine
                          style={{
                            data: { stroke: '#000000', strokeWidth: 6 },
                            parent: {}
                          }}
                          data={dataSpark[stock.symbol].timestamp.map((time, u) => ({ x: dataSpark[stock.symbol].timestamp[u], y: dataSpark[stock.symbol].close[u] }))}
                        />
                      ) }
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
  )
}

export default RecommendedStockBadge
