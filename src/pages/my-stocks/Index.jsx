import React, { useEffect, useRef } from 'react'
import Loading from '@/components/Loading'
import PagesStockDetails from '@/layouts/stockDetail'
// import moment from 'moment'
// import Skeleton from 'react-loading-skeleton'
// import { useNavigate } from 'react-router-dom'

import { useMyStocks } from '@/contexts/MyStocks'
// import { useStocks } from '@/contexts/stocks'

function PagesMyStocksIndex() {
  const ref = useRef(null)
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

  useEffect(() => {
    getMyStocks()
  }, [])

  const deleteStock = (ticker) => {
    deleteMyStock(ticker)
    console.log('delete ticker:', ticker)
  }

  const handleClick = () => {
    const el = document.getElementById('stockDetails')
    console.log(el)
    function openNav() {
      document.getElementById('mySidebar').style.width = '250px'
      document.getElementById('main').style.marginLeft = '250px'
    }

    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    function closeNav() {
      document.getElementById('mySidebar').style.width = '0'
      document.getElementById('main').style.marginLeft = '0'
    }
  }

  const error = errorStocks || errorQuote || errorSpark

  if (error) return <h1 className="text-center">{error.data.message}</h1>
  if (stocksIsLoading || quotesIsLoading || sparkIsLoading) return <h1 className="text-center"><Loading /></h1>

  console.log('data Stock:', dataStocks)
  console.log('data Quote:', dataQuote)
  console.log('data Spark:', dataSpark)

  return (
    <>
      <div className="row m-1" style={{ width: '100%', height: '100px' }}>{
        dataStocks.map((stock, i) => (

          dataQuote[i].regularMarketChangePercent > 0 ? (
            <div className="col-4 p-1" style={{ maxWidth: '300px' }} key={dataQuote[i].shortName} onClick={handleClick}>
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'green', borderRadius: '10px' }}>
                <div className="ml-2" style={{}}>
                  <div id={stock.symbol} />
                  {sparkIsLoading ? <Loading /> : 'chart' }
                </div>
                <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
                  <div className=""><b>{dataQuote[i].symbol}</b></div>
                  <div className="">{dataQuote[i].regularMarketPrice}</div>
                  <div className="">{`${dataQuote[i].regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={() => deleteStock(dataStocks[i])}>x</button>
              </div>
            </div>
          ) : (
            <div className="col-4 p-1" style={{ maxWidth: '300px' }} key={dataQuote[i].shortName}>
              <div className="d-flex" style={{ height: '100px', border: '4px solid black', background: 'red', borderRadius: '10px' }}>
                <div className="ml-2" style={{}}>
                  <div id={stock.symbol} />
                  {sparkIsLoading ? <Loading /> : 'chart' }
                </div>
                <div className="" style={{ marginLeft: '17px', marginTop: '7px' }}>
                  <div className=""><b>{dataQuote[i].symbol}</b></div>
                  <div className="">{dataQuote[i].regularMarketPrice}</div>
                  <div className=""> {`${dataQuote[i].regularMarketChangePercent.toFixed(2)}%`}</div>
                </div>
                <button type="button" className="mt-2" style={{ marginLeft: '15px', height: '30px', width: '30px', borderRadius: '15px' }} onClick={() => deleteStock(dataStocks[i])}>x</button>
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

export default PagesMyStocksIndex
