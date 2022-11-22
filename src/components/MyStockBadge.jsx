import React from 'react'
import { VictoryLine } from 'victory'

import { useMyStocks } from '@/contexts/MyStocks'
import { useStockDetails } from '@/contexts/stockDetails'

import Loading from '@/components/Loading'

function MyStockBadge() {
  const {
    index: {
      dataStocks,
      dataQuote,
      dataSpark,
      // errorStocks,
      // errorQuote,
      // errorSpark,
      // stocksIsLoading,
      // quotesIsLoading,
      sparkIsLoading
    }
  } = useMyStocks()

  const {
    deleteMyStock
  } = useMyStocks()

  const {
    expandStockDetails
    // closeStockDetails
  } = useStockDetails()

  // console.log('dataStocks', dataStocks)
  // console.log('dataQuote', dataQuote)
  // console.log('dataSpark', dataSpark)

  return (
    <div className="d-flex position-relative w-100 m-1" style={{ height: '100%' }}>

      <div className="row m-1" style={{}}>{
        dataStocks.map((stock, i) => (
          dataQuote[i].regularMarketChangePercent > 0 ? (
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[i].shortName} onClick={() => expandStockDetails(stock.symbol, dataQuote[i], dataSpark[stock.symbol])}>
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
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={() => deleteMyStock(dataStocks[i])}>x</button>
              </div>
            </div>
          ) : (
            <div className="col-1 p-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={dataQuote[i].shortName} onClick={() => expandStockDetails(stock.symbol, 'myStock')}>
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
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={() => deleteMyStock(dataStocks[i])}>x</button>
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
