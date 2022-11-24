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

  const expandDetailsBar = (e, data1, data2) => {
    expandStockDetails(data1, data2)
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
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[0].shortName} onClick={(e) => expandDetailsBar(e, stockList[0].symbol, dataQuote[0], dataSpark[stockList[0].symbol])}>
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'green', borderRadius: '10px' }}>
                <div className="ml-2" style={{}}>
                  {sparkIsLoading
                    ? <Loading />
                    : (
                      <VictoryLine
                        style={{
                          data: { stroke: '#000000', strokeWidth: 6 },
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
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={(e) => deleteStockFromList(e, stockList[0])}>x</button>
              </div>
            </div>
          ) : (
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[0].shortName} onClick={(e) => expandDetailsBar(e, stockList[0].symbol, 'myStock')}>
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'red', borderRadius: '10px' }}>
                <div className="ml-2" style={{}}>
                  {sparkIsLoading
                    ? <Loading />
                    : (
                      <VictoryLine
                        style={{
                          data: { stroke: '#000000', strokeWidth: 6 },
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
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={(e) => deleteStockFromList(e, stockList[0])}>x</button>
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
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[i].shortName} onClick={(e) => expandDetailsBar(e, stock.symbol, dataQuote[i], dataSpark[stock.symbol])}>
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'green', borderRadius: '10px' }}>
                <div className="ml-2" style={{}}>
                  {sparkIsLoading
                    ? <Loading />
                    : (
                      <VictoryLine
                        style={{
                          data: { stroke: '#000000', strokeWidth: 6 },
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
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={(e) => deleteStockFromList(e, stockList[i])}>x</button>
              </div>
            </div>
          ) : (
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[i].shortName} onClick={(e) => expandDetailsBar(e, stock.symbol, 'myStock')}>
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'red', borderRadius: '10px' }}>
                <div className="ml-2" style={{}}>
                  {sparkIsLoading
                    ? <Loading />
                    : (
                      <VictoryLine
                        style={{
                          data: { stroke: '#000000', strokeWidth: 6 },
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
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={(e) => deleteStockFromList(e, stockList[i])}>x</button>
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
