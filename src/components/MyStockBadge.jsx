import React from 'react'
import { VictoryLine } from 'victory'

import { useMyStocks } from '@/contexts/MyStocks'
import { useStockDetails } from '@/contexts/stockDetails'

import Loading from '@/components/Loading'

function MyStockBadge() {
  const {
    index: {
      dataQuote,
      dataSpark,
      // errorStocks,
      // errorQuote,
      // errorSpark,
      // stocksIsLoading,
      // quotesIsLoading,
      sparkIsLoading
    },
    myStocks: {
      stockList
    }
  } = useMyStocks()

  const {
    deleteMyStock
  } = useMyStocks()

  const {
    expandStockDetails
    // closeStockDetails
  } = useStockDetails()

  const haveOneStock = stockList?.length === 1
  // const moreThanOneStock = stockList?.length > 1
  // console.log('dataStocks', dataStocks)
  // console.log('dataQuote', dataQuote)
  // console.log('dataSpark', dataSpark)

  const expandDetailsBar = (ticker, data1, data2) => {
    expandStockDetails(ticker, data1, data2)
  }

  const deleteStockFromList = (e, data) => {
    e.stopPropagation()
    deleteMyStock(data)
  }

  const data = stockList || dataQuote || dataSpark

  if (!data) return <Loading />

  if (haveOneStock) {
    return (
      <div className="d-flex position-relative w-100 m-1" style={{ height: '100%' }}>
        <div className="row m-1" style={{}}>{

          dataQuote[0].regularMarketChangePercent > 0 ? (
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[0].shortName} onClick={() => expandDetailsBar(stockList[0].symbol, dataQuote[0], dataSpark[stockList[0].symbol])}>
              <div id="greenStockBadge" className="d-flex" style={{ }}>
                <div className="ml-2" style={{}}>
                  {sparkIsLoading
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
                        data={dataSpark[stockList[0].symbol].timestamp.map((time, u) => ({ x: dataSpark[stockList[0].symbol].timestamp[u], y: dataSpark[stockList[0].symbol].close[u] }))}
                      />
                    ) }
                </div>
                <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
                  <div className=""><b>{dataQuote[0].symbol}</b></div>
                  <div className="">{dataQuote[0].regularMarketPrice.toFixed(2)}</div>
                  <div className="">{`${dataQuote[0].regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
                <button id="addButtons" type="button" className="mt-2 p-0" style={{ }} onClick={(e) => deleteStockFromList(e, stockList[0])}><div id="close" /></button>
              </div>
            </div>
          ) : (
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[0].shortName} onClick={() => expandDetailsBar(stockList[0].symbol, dataQuote[0], dataSpark[stockList[0].symbol])}>
              <div id="redStockBadge" className="d-flex" style={{}}>
                <div className="ml-2" style={{}}>
                  {sparkIsLoading
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
                        data={dataSpark[stockList[0].symbol].timestamp.map((time, u) => ({ x: dataSpark[stockList[0].symbol].timestamp[u], y: dataSpark[stockList[0].symbol].close[u] }))}
                      />
                    ) }
                </div>
                <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
                  <div className=""><b>{dataQuote[0].symbol}</b></div>
                  <div className="">{dataQuote[0].regularMarketPrice.toFixed(2)}</div>
                  <div className=""> {`${dataQuote[0].regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
                <button id="addButtons" type="button" className="mt-2 p-0" style={{ }} onClick={(e) => deleteStockFromList(e, stockList[0])}><div id="close" /></button>
              </div>
            </div>
          )
      }
        </div>
      </div>

    )
  }

  return (
    <div className="d-flex position-relative w-100 m-1" style={{ height: '100%' }}>

      <div className="row m-1" style={{}}>{
        stockList.map((stock, i) => (
          dataQuote[i].regularMarketChangePercent > 0 ? (
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[i].shortName} onClick={() => expandDetailsBar(stock.symbol, dataQuote[i], dataSpark[stock.symbol])}>
              <div id="greenStockBadge" className="d-flex" style={{ }}>
                <div className="ml-2" style={{}}>
                  {sparkIsLoading
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
                  <div className=""><b>{dataQuote[i].symbol}</b></div>
                  <div className="">{dataQuote[i].regularMarketPrice.toFixed(2)}</div>
                  <div className="">{`${dataQuote[i].regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
                <button id="addButtons" type="button" className="mt-2 p-0" style={{}} onClick={(e) => deleteStockFromList(e, stockList[i])}><div id="close" /></button>
              </div>
            </div>
          ) : (
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[i].shortName} onClick={() => expandDetailsBar(stock.symbol, dataQuote[i], dataSpark[stock.symbol])}>
              <div id="redStockBadge" className="d-flex" style={{ }}>
                <div className="ml-2" style={{}}>
                  {sparkIsLoading
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
                  <div className=""><b>{dataQuote[i].symbol}</b></div>
                  <div className="">{dataQuote[i].regularMarketPrice.toFixed(2)}</div>
                  <div className=""> {`${dataQuote[i].regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
                <button id="addButtons" type="button" className="mt-2 p-0" style={{}} onClick={(e) => deleteStockFromList(e, stockList[i])}><div id="add" /></button>
              </div>
            </div>
          )
        ))
      }
      </div>

    </div>
  )
}

export default MyStockBadge
