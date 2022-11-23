import React, { useEffect } from 'react'
import { useStockDetails } from '@/contexts/stockDetails'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import { LineChart, Line } from 'recharts'
// import moment from 'moment'
import Loading from '@/components/Loading'
import BadgeChart from '@/charts/BadgeChart'
import CandleChart from '@/charts/CandleChart'
import LineChart from '@/charts/LineChart'

// import Loading from '@/components/Loading'

function LayoutsStockDetails() {
  const {
    expandDetails: {
      stockDetailWidth,
      displayStock,
      stockSymbol,
      expanded
    },
    stockDetails: {
      stockSummary,
      isLoading,
      // summaryError,
      dayChartData,
      // dayChartError,
      // dayChartLoading,
      monthChartData,
      // monthChartError,
      // monthChartLoading,
      yearChartData
      // yearChartError,
      // yearChartLoading
    },
    badgeData: {
      badgeDataQuote
      // badgeDataSpark
    },
    // lineChartData: {
    //   lineDataQuote,
    //   lineDataSpark
    // },
    // candleChartData: {
    //   candleDataQuote,
    //   candleDataSpark
    // },
    chartType: { type },
    chartDuration: { duration },
    viewLineChart,
    viewCandleChart,
    viewDayChart,
    viewMonthChart,
    viewYearChart,
    retrieveStockDetails,
    closeStockDetails
  } = useStockDetails()

  useEffect(() => {
    if (displayStock) {
      retrieveStockDetails(stockSymbol)
      console.log('retrieving stock summary')
    }
  }, [stockSymbol])

  const stockInfo = () => {
    if (stockSummary.fundProfile) {
      return stockSummary.assetProfile.longBusinessSummary
    }
    if (stockSummary.summaryProfile) {
      return stockSummary.summaryProfile.longBusinessSummary
    }
    return '/'
  }

  const stockSector = () => {
    if (stockSummary.summaryProfile) {
      return stockSummary.summaryProfile.sector
    }
    return '/'
  }

  const stockIndustry = () => {
    if (stockSummary.summaryProfile) {
      return stockSummary.summaryProfile.industry
    }
    return '/'
  }

  const stockEmployees = () => {
    if (stockSummary.summaryProfile) {
      return stockSummary.summaryProfile.fullTimeEmployees
    }
    return '/'
  }

  const stockHeadquarter = () => {
    if (stockSummary.summaryProfile) {
      return stockSummary.summaryProfile.city
    }
    return '/'
  }

  const displayChartType = () => {
    console.log('chart:', type, duration)
    if (type === 'line' && duration === 'day') return <BadgeChart />
    if (type === 'line' && duration !== 'day') return <LineChart />
    if (type === 'candle') return <CandleChart />
    return <Loading />
  }

  if (!expanded) return <div />

  return (
    <div id="stockDetails" className="col-4" style={{ width: `${stockDetailWidth}` }}>
      <div className="row m-2">
        <div className="row">
          <h1 className="col">{displayStock}</h1>
          <div>
            <button type="button" className="col" style={{ width: '20px', height: '20px' }} onClick={closeStockDetails}>x</button>
          </div>
        </div>

        <div className="row">{badgeDataQuote.shortName}</div>
        <div className="row">{badgeDataQuote.regularMarketPrice.toFixed(2)}</div>
        <div className="row">${badgeDataQuote.regularMarketChange.toFixed(2)}({badgeDataQuote.regularMarketChangePercent.toFixed(2)}%)</div>

        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={() => viewLineChart()}>Line</Button>
          <Button variant="secondary" onClick={() => viewCandleChart()}>Candle</Button>
        </ButtonGroup>

        <div id="charts" className="row d-flex" style={{ width: '100%', height: '400px' }}>
          {displayChartType()}
        </div>

        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={() => viewDayChart(badgeDataQuote, dayChartData)}>Day</Button>
          <Button variant="secondary" onClick={() => viewMonthChart(badgeDataQuote, monthChartData)}>Month</Button>
          <Button variant="secondary" onClick={() => viewYearChart(badgeDataQuote, yearChartData)}>Year</Button>
        </ButtonGroup>

        <div className="m-2">
          <div className="row">
            <div className="col-4">
              <div className="row">sector</div>
              <div className="row">{isLoading ? (<Loading />) : stockSector()}</div>
            </div>
            <div className="col-4">
              <div className="row">Industry</div>
              <div className="row">{isLoading ? (<Loading />) : stockIndustry()}</div>
            </div>
            <div className="col-4">
              <div className="row">Employees</div>
              <div className="row">{isLoading ? (<Loading />) : stockEmployees()}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="row">Headquarter</div>
              <div className="row">{isLoading ? (<Loading />) : stockHeadquarter()}</div>
            </div>
            <div className="col-4"> </div>
            <div className="col-4"> </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="row">Market Cap</div>
              <div className="row">{badgeDataQuote.marketCap}</div>
            </div>
            <div className="col-4">
              <div className="row">Pe ratio</div>
              <div className="row">{badgeDataQuote.forwardPE}</div>
            </div>
            <div className="col-4"> </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="row">Average Volume</div>
              <div className="row">{badgeDataQuote.averageDailyVolume10Day}</div>
            </div>
            <div className="col-4"> </div>
            <div className="col-4"> </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="row">High today</div>
              <div className="row">{badgeDataQuote.regularMarketDayHigh}</div>
            </div>
            <div className="col-4">
              <div className="row">Low today</div>
              <div className="row">{badgeDataQuote.regularMarketDayLow}</div>
            </div>
            <div className="col-4">
              <div className="row">Open price</div>
              <div className="row">{badgeDataQuote.regularMarketOpen}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="row">volume</div>
              <div className="row">{badgeDataQuote.regularMarketVolume}</div>
            </div>
            <div className="col-4">
              <div className="row">52 Week high</div>
              <div className="row">{badgeDataQuote.fiftyTwoWeekHigh}</div>
            </div>
            <div className="col-4">
              <div className="row">52 Week low</div>
              <div className="row">{badgeDataQuote.fiftyTwoWeekLow}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-3">
        {isLoading ? (<Loading />) : stockInfo()}
      </div>
    </div>
  )
}

export default LayoutsStockDetails
