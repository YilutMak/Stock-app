import React, { } from 'react'
import { useStockDetails } from '@/contexts/stockDetails'
import { VictoryCandlestick, VictoryTheme, VictoryChart, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory'
import moment from 'moment'
import Loading from '@/components/Loading'

function CandleDay() {
  const {
    candleChartData: {
      candleDataQuote,
      candleDataSpark
    },
    chartDuration: { duration }
    // stockDetails: {
    //   isLoading
    // }
  } = useStockDetails()

  const chartdata = () => {
    if (duration === 'day') {
      return (
        candleDataSpark.result[0].timestamp.map((time, u) => ({ x: moment((candleDataSpark.result[0].timestamp[u] - 3600) * 1000).format('hh:mm'), open: candleDataSpark.result[0].indicators.quote[0].open[u], close: candleDataSpark.result[0].indicators.quote[0].close[u], high: candleDataSpark.result[0].indicators.quote[0].high[u], low: candleDataSpark.result[0].indicators.quote[0].low[u] }))
      )
    }
    if (duration === 'month') {
      return (
        candleDataSpark.result[0].timestamp.map((time, u) => ({ x: moment((candleDataSpark.result[0].timestamp[u] - 3600) * 1000).format('DD'), open: candleDataSpark.result[0].indicators.quote[0].open[u], close: candleDataSpark.result[0].indicators.quote[0].close[u], high: candleDataSpark.result[0].indicators.quote[0].high[u], low: candleDataSpark.result[0].indicators.quote[0].low[u] }))
      )
    }
    if (duration === 'year') {
      return (
        candleDataSpark.result[0].timestamp.map((time, u) => ({ x: moment((candleDataSpark.result[0].timestamp[u] - 3600) * 1000).format('MMM D'), open: candleDataSpark.result[0].indicators.quote[0].open[u], close: candleDataSpark.result[0].indicators.quote[0].close[u], high: candleDataSpark.result[0].indicators.quote[0].high[u], low: candleDataSpark.result[0].indicators.quote[0].low[u] }))
      )
    }
    return { open: 0, close: 0, high: 0, low: 0 }
  }

  const maxDomain = () => {
    if (duration === 'day') {
      return (
        { y: (candleDataQuote.regularMarketDayHigh) }
      )
    }
    if (duration === 'month') {
      return (
        { y: (candleDataQuote.regularMarketDayHigh * 1.2) }
      )
    }
    if (duration === 'year') {
      return (
        { y: (candleDataQuote.fiftyTwoWeekHigh * 1.2) }
      )
    }
    return { x: 0, y: 0 }
  }

  if (!candleDataQuote || !candleDataSpark) {
    return <Loading />
  }

  console.log('candleDataQuote:', candleDataQuote, duration)
  console.log('candleDataSpark:', candleDataSpark, duration)

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      maxDomain={maxDomain()}
      containerComponent={(
        <VictoryVoronoiContainer
          labels={({ datum }) => `Open:${datum.open.toFixed(2)}\nClose:${datum.close.toFixed(2)}\nHigh:${datum.high.toFixed(2)}\n Low:${datum.low.toFixed(2)}`}
          mouseFollowTooltips
          voronoiDimension="x"
          labelComponent={(
            <VictoryTooltip
              centerOffset={{ x: 70 }}
            />
            )}
        />

        )}
    >
      <VictoryCandlestick
        candleColors={{ positive: '#AAFF00', negative: '#C41E3A' }}
        data={chartdata()}
      />
      <VictoryAxis crossAxis fixLabelOverlap />
      <VictoryAxis dependentAxis />
    </VictoryChart>
  )
}

export default CandleDay

// {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
