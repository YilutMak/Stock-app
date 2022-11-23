import React, { } from 'react'
import { useStockDetails } from '@/contexts/stockDetails'
import { VictoryCandlestick, VictoryTheme, VictoryChart, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory'
import moment from 'moment'
import Loading from '@/components/Loading'

function CandleDay() {
  const {
    chartData: {
      stockDataQuote
      // stockDataSpark
    },
    stockDetails: {
      dayChartData
      // dayChartLoading
    }
  } = useStockDetails()

  if (!dayChartData) return <Loading />

  if (dayChartData) { console.log('dayChartData', dayChartData.result[0]) }

  if (dayChartData) {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        maxDomain={{ y: stockDataQuote.regularMarketDayHigh }}
        containerComponent={(
          <VictoryVoronoiContainer
            mouseFollowTooltips
            voronoiDimension="x"
            labels={({ datum }) => `Open:${datum.open.toFixed(2)}\nClose:${datum.close.toFixed(2)}\nHigh:${datum.high.toFixed(2)}\n Low:${datum.low.toFixed(2)}`}
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
          data={dayChartData.result[0].timestamp.map((time, u) => ({ x: moment((dayChartData.result[0].timestamp[u] - 3600) * 1000).format('hh:mm'), open: dayChartData.result[0].indicators.quote[0].open[u], close: dayChartData.result[0].indicators.quote[0].close[u], high: dayChartData.result[0].indicators.quote[0].high[u], low: dayChartData.result[0].indicators.quote[0].low[u] }))}
        />
        <VictoryAxis crossAxis fixLabelOverlap />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    )
  }
}

export default CandleDay

// {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
