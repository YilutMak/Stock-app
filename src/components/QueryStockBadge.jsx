import React from 'react'
import { VictoryLine } from 'victory'

import { useSearch } from '@/contexts/search'
import { useMyStocks } from '@/contexts/MyStocks'
import { useStockDetails } from '@/contexts/stockDetails'

import Loading from '@/components/Loading'

function QueryStockBadge() {
  const {
    search: {
      // query,
      queryDataQuote,
      queryDataSpark,
      // queryQuoteIsLoading,
      querySparkIsLoading
      // queryErrorQuote,
      // queryErrorSpark
    }
  } = useSearch()

  const {
    createMyStock
  } = useMyStocks()

  const {
    expandStockDetails
  } = useStockDetails()

  const addStock = (ticker) => {
    console.log('ticker:', ticker)
    createMyStock(ticker)
  }

  console.log('queryDataQuote:', queryDataQuote)
  console.log('queryDataSpark:', queryDataSpark)

  return (
    <div className="col-1 p-1 m-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={queryDataQuote[0].symbol} onClick={() => expandStockDetails(queryDataQuote[0].symbol, queryDataQuote[0], queryDataSpark[queryDataQuote[0].symbol])}>{
      queryDataQuote[0].regularMarketChangePercent > 0 ? (
        <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'green', borderRadius: '10px' }}>
          <div className="ml-2" style={{}}>
            <div id={queryDataQuote[0].symbol} />
            {querySparkIsLoading
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
                  data={queryDataSpark[queryDataQuote[0].symbol].timestamp.map((time, u) => ({ x: queryDataSpark[queryDataQuote[0].symbol].timestamp[u], y: queryDataSpark[queryDataQuote[0].symbol].close[u] }))}
                />
              ) }
          </div>
          <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
            <div className=""><b>{queryDataQuote[0].symbol}</b></div>
            <div className="">{queryDataQuote[0].regularMarketPrice.toFixed(2)}</div>
            <div className=""> {`${queryDataQuote[0].regularMarketChangePercent.toFixed(2)}%`}</div>
          </div>
          <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={() => addStock(queryDataQuote[0].symbol)}>+</button>
        </div>
      ) : (
        <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'red', borderRadius: '10px' }}>
          <div className="ml-2" style={{}}>
            <div id={queryDataQuote[0].symbol} />
            {querySparkIsLoading
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
                  data={queryDataSpark[queryDataQuote[0].symbol].timestamp.map((time, u) => ({ x: queryDataSpark[queryDataQuote[0].symbol].timestamp[u], y: queryDataSpark[queryDataQuote[0].symbol].close[u] }))}
                />
              ) }
          </div>
          <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
            <div className=""><b>{queryDataQuote[0].symbol}</b></div>
            <div className="">{queryDataQuote[0].regularMarketPrice.toFixed(2)}</div>
            <div className=""> {`${queryDataQuote[0].regularMarketChangePercent.toFixed(2)}%`}</div>
          </div>
          <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={() => addStock(queryDataQuote[0].symbol)}>+</button>
        </div>
      )
    }
    </div>
  )
}

export default QueryStockBadge
