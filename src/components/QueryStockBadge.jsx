import React from 'react'
import { VictoryLine } from 'victory'
import { toast } from 'react-toastify'

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

  // console.log('queryDataQuote:', queryDataQuote)
  // console.log('queryDataSpark:', queryDataSpark)

  return (
    <div className="col-1 p-1 m-1" style={{ minWidth: '270px', maxWidth: '270px' }} key={queryDataQuote[0].symbol} onClick={() => expandStockDetails(queryDataQuote[0].symbol, queryDataQuote[0], queryDataSpark[queryDataQuote[0].symbol])}>{
      queryDataQuote[0].regularMarketChangePercent > 0 ? (
        <div id="greenStockBadge" className="d-flex" style={{}}>
          <div className="ml-2" style={{}}>
            <div id={queryDataQuote[0].symbol} />
            {querySparkIsLoading
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
                  data={queryDataSpark[queryDataQuote[0].symbol].timestamp.map((time, u) => ({ x: queryDataSpark[queryDataQuote[0].symbol].timestamp[u], y: queryDataSpark[queryDataQuote[0].symbol].close[u] }))}
                />
              ) }
          </div>
          <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
            <div className=""><b>{queryDataQuote[0].symbol}</b></div>
            <div className="">{queryDataQuote[0].regularMarketPrice.toFixed(2)}</div>
            <div className=""> {`${queryDataQuote[0].regularMarketChangePercent.toFixed(2)}%`}</div>
          </div>
          <button id="addButtons" type="button" className="mt-2 p-0" style={{ }} onClick={(e) => addStock(e, queryDataQuote[0].symbol)}><div id="add" /></button>
        </div>
      ) : (
        <div id="redStockBadge" className="d-flex" style={{ }}>
          <div className="ml-2" style={{}}>
            <div id={queryDataQuote[0].symbol} />
            {querySparkIsLoading
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
                  data={queryDataSpark[queryDataQuote[0].symbol].timestamp.map((time, u) => ({ x: queryDataSpark[queryDataQuote[0].symbol].timestamp[u], y: queryDataSpark[queryDataQuote[0].symbol].close[u] }))}
                />
              ) }
          </div>
          <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
            <div className=""><b>{queryDataQuote[0].symbol}</b></div>
            <div className="">{queryDataQuote[0].regularMarketPrice.toFixed(2)}</div>
            <div className=""> {`${queryDataQuote[0].regularMarketChangePercent.toFixed(2)}%`}</div>
          </div>
          <button id="addButtons" type="button" className="mt-2 p-0" style={{ }} onClick={(e) => addStock(e, queryDataQuote[0].symbol)}><div id="add" /></button>
        </div>
      )
    }
    </div>
  )
}

export default QueryStockBadge
