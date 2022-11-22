import React from 'react'
import { VictoryLine } from 'victory'

import { useMyStocks } from '@/contexts/MyStocks'

import Loading from '@/components/Loading'

function RecommendedStockBadge() {
  const {
    index: {
      dataStocks,
      dataQuote,
      dataSpark,
      errorStocks,
      errorQuote,
      errorSpark,
      stocksIsLoading,
      quotesIsLoading,
      sparkIsLoading
    },
    getMyStocks
  } = useMyStocks()

  const {
    deleteMyStock
  } = useMyStocks()

  const handleSidebarOpen = () => {
    function openSidebar() {
      document.getElementById('stockDetails').style.width = '33%'
      document.getElementById('stockBadges').style.marginRight = '33%'
    }
    openSidebar()
  }

  const deleteStock = (ticker) => {
    deleteMyStock(ticker)
    console.log('delete ticker:', ticker)
  }

  return (
    <div className="d-flex position-relative w-100 m-1">
      <div style={{ height: '150px' }}>
        <div className="row m-1" style={{}}>{
        dataStocks.map((stock, i) => (
          dataQuote[i].regularMarketChangePercent > 0 ? (
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[i].shortName} onClick={handleSidebarOpen}>
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'green', borderRadius: '10px' }}>
                <div className="ml-2" style={{}}>
                  <div id={stock.symbol} />
                  {sparkIsLoading
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
                  <div className=""><b>{dataQuote[i].symbol}</b></div>
                  <div className="">{dataQuote[i].regularMarketPrice.toFixed(2)}</div>
                  <div className="">{`${dataQuote[i].regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={() => deleteStock(dataStocks[i])}>x</button>
              </div>
            </div>
          ) : (
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[i].shortName} onClick={handleSidebarOpen}>
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'red', borderRadius: '10px' }}>
                <div className="ml-2" style={{}}>
                  <div id={stock.symbol} />
                  {sparkIsLoading
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
                  <div className=""><b>{dataQuote[i].symbol}</b></div>
                  <div className="">{dataQuote[i].regularMarketPrice.toFixed(2)}</div>
                  <div className=""> {`${dataQuote[i].regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={() => deleteStock(dataStocks[i])}>x</button>
              </div>
            </div>
          )
        ))
      }
        </div>
      </div>
    </div>
  )
}

export default RecommendedStockBadge
