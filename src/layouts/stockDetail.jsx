import React from 'react'
import { useStockDetails } from '@/contexts/stockDetails'
// import { LineChart, Line } from 'recharts'
import { VictoryLine, VictoryTheme, VictoryChart } from 'victory'
import moment from 'moment'

// import Loading from '@/components/Loading'

function LayoutsStockDetails() {
  const {
    expandDetails: {
      stockDetailWidth,
      displayStock,
      stockDataQuote,
      stockDataSpark
    },
    closeStockDetails
  } = useStockDetails()

  // const DayStockData = () => {
  //  stockDataSpark.timestamp.map((time, u) => ({ x: stockDataSpark.timestamp[u], y: stockDataSpark.close[u] }))
  //  console.log('daystockdata:', stockDataSpark.timestamp.map((time, u) => ({ x: stockDataSpark.timestamp[u], y: stockDataSpark.close[u] })))
  // }

  const stockdata = displayStock || stockDataQuote || stockDataSpark

  if (!stockdata) return null

  console.log('moment 1:', moment(new Date(stockDataSpark.timestamp[0])).format('MMMM DD YYYY HH:MM:SS'))
  console.log('moment 2:', moment(new Date(stockDataSpark.timestamp[1])).format('MMMM DD YYYY HH:MM:SS'))
  console.log('moment 3:', moment(new Date(stockDataSpark.timestamp[2])).format('MMMM DD YYYY HH:MM:SS'))

  return (
    <div id="stockDetails" className="col-4" style={{ width: `${stockDetailWidth}` }}>
      <div className="row m-2">
        <div className="row">
          <h1 className="col">{displayStock}</h1>
          <button type="button" className="col" style={{ width: '15px', height: '15px' }} onClick={closeStockDetails}>x</button>
        </div>
        <div className="row">{stockDataQuote.shortName}</div>
        <div className="row">{stockDataQuote.regularMarketPrice.toFixed(2)}</div>
        <div className="row">${stockDataQuote.regularMarketChange.toFixed(2)}({stockDataQuote.regularMarketChangePercent.toFixed(2)}%)</div>

        <div className="row" style={{ width: '100%', height: '400px' }}>
          <VictoryChart
            theme={VictoryTheme.material}
            maxDomain={{ y: stockDataQuote.regularMarketDayHigh }}
          >
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' }
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
              data={stockDataSpark.timestamp.map((time, u) => ({ x: stockDataSpark.timestamp[u], y: stockDataSpark.close[u] }))}
            />
          </VictoryChart>
        </div>

        <div className="m-2">
          <div className="row">
            <div className="col-4">
              <div className="row">CEO</div>
              <div className="row">d</div>
            </div>
            <div className="col-4">
              <div className="row">Employees</div>
              <div className="row">d</div>
            </div>
            <div className="col-4">
              <div className="row">Headquarters</div>
              <div className="row">d</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="row">Founded</div>
              <div className="row">d</div>
            </div>
            <div className="col-4"> </div>
            <div className="col-4"> </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="row">Market Cap</div>
              <div className="row">{stockDataQuote.marketCap}</div>
            </div>
            <div className="col-4">
              <div className="row">Pe ratio</div>
              <div className="row">{stockDataQuote.forwardPE}</div>
            </div>
            <div className="col-4"> </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="row">Average Volume</div>
              <div className="row">{stockDataQuote.averageDailyVolume10Day}</div>
            </div>
            <div className="col-4"> </div>
            <div className="col-4"> </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="row">High today</div>
              <div className="row">{stockDataQuote.regularMarketDayHigh}</div>
            </div>
            <div className="col-4">
              <div className="row">Low today</div>
              <div className="row">{stockDataQuote.regularMarketDayLow}</div>
            </div>
            <div className="col-4">
              <div className="row">Open price</div>
              <div className="row">{stockDataQuote.regularMarketOpen}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="row">volume</div>
              <div className="row">{stockDataQuote.regularMarketVolume}</div>
            </div>
            <div className="col-4">
              <div className="row">52 Week high</div>
              <div className="row">{stockDataQuote.fiftyTwoWeekHigh}</div>
            </div>
            <div className="col-4">
              <div className="row">52 Week low</div>
              <div className="row">{stockDataQuote.fiftyTwoWeekLow}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LayoutsStockDetails

// myStock
// queryStock
// recommendedStock
