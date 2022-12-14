import React from 'react'
import { VictoryLine } from 'victory'
import { toast } from 'react-toastify'

import { useStocks } from '@/contexts/stocks'
import { useMyStocks } from '@/contexts/MyStocks'
import { useStockDetails } from '@/contexts/stockDetails'

import Loading from '@/components/Loading'

function RecommendedStockBadge() {
  const {
    stockRecomendations: {
      dataRecommendStocks: finance,
      dataSpark,
      dataQuote,
      // errorRecommendations,
      // errorSpark,
      // errorQuote,
      recommendIsLoading
      // SparkIsLoading,
      // quotesIsLoading
    }
  } = useStocks()

  const {
    myStocks: {
      stockList
    },
    createMyStock
  } = useMyStocks()

  const {
    expandStockDetails
  } = useStockDetails()

  const addStock = (e, ticker) => {
    e.stopPropagation()
    console.log('add stock, check my stock list:', stockList)
    const dupStock = stockList.filter((stock) => stock.symbol === ticker)
    if (dupStock.length > 0) {
      toast.error('Oops! This stock has already been added to your list')
    }
    console.log('ticker:', ticker)
    createMyStock(ticker)
  }

  return (
    <div className="row m-1" style={{}}>{
          finance.finance.result[0].quotes.map((stock, i) => (
            stock.regularMarketChangePercent > 0 ? (
              <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={stock.shortName} onClick={() => expandStockDetails(stock.symbol, dataQuote[i], dataSpark[stock.symbol])}>
                <div id="greenStockBadge" className="d-flex" style={{ }}>
                  <div className="ml-2" style={{}}>
                    {recommendIsLoading
                      ? <Loading />
                      : (
                        <VictoryLine
                          style={{
                            data: { stroke: '#74fb8b', strokeWidth: 6 },
                            parent: {}
                          }}
                          animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                          }}
                          data={dataSpark[stock.symbol].timestamp.map((time, u) => ({ x: dataSpark[stock.symbol].timestamp[u], y: dataSpark[stock.symbol].close[u] }))}
                        />
                      ) }
                  </div>
                  <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
                    <div className=""><b>{stock.symbol}</b></div>
                    <div className="">{stock.regularMarketPrice.toFixed(2)}</div>
                    <div className=""> {`${stock.regularMarketChangePercent.toFixed(2)}%`}</div>
                  </div>
                  <button id="addButtons" type="button" className="mt-2 p-0" style={{ }} onClick={(e) => addStock(e, stock.symbol)}><div id="add" /></button>
                </div>
              </div>
            ) : (
              <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={stock.shortName} onClick={() => expandStockDetails(stock.symbol, dataQuote[i], dataSpark[stock.symbol])}>
                <div id="redStockBadge" className="d-flex" style={{ }}>
                  <div className="ml-2" style={{}}>
                    {recommendIsLoading
                      ? <Loading />
                      : (
                        <VictoryLine
                          style={{
                            data: { stroke: '#fa5b5b', strokeWidth: 6 },
                            parent: {}
                          }}
                          animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                          }}
                          data={dataSpark[stock.symbol].timestamp.map((time, u) => ({ x: dataSpark[stock.symbol].timestamp[u], y: dataSpark[stock.symbol].close[u] }))}
                        />
                      ) }
                  </div>
                  <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
                    <div className=""><b>{stock.symbol}</b></div>
                    <div className="">{stock.regularMarketPrice.toFixed(2)}</div>
                    <div className=""> {`${stock.regularMarketChangePercent.toFixed(2)}%`}</div>
                  </div>
                  <button id="addButtons" type="button" className="mt-2 p-0" style={{ }} onClick={(e) => addStock(e, stock.symbol)}><div id="add" /></button>
                </div>
              </div>
            )
          ))
        }
    </div>
  )
}

export default RecommendedStockBadge
