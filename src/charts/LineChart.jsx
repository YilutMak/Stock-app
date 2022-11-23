import React, { } from 'react'
import { useStockDetails } from '@/contexts/stockDetails'
import { VictoryCursorContainer, VictoryLine, VictoryTheme, VictoryChart, VictoryAxis } from 'victory'
import moment from 'moment'
import Loading from '@/components/Loading'

function LineDay() {
  const {
    lineChartData: {
      lineDataQuote,
      lineDataSpark
    },
    chartDuration: { duration }
    // stockDetails: {
    //   isLoading
    // }
  } = useStockDetails()

  const chartdata = () => {
    if (duration === 'month') {
      return (
        lineDataSpark.result[0].timestamp.map((time, u) => ({ x: moment((lineDataSpark.result[0].timestamp[u] - 3600) * 1000).format('DD'), y: lineDataSpark.result[0].indicators.quote[0].close[u] }))
      )
    }
    if (duration === 'year') {
      return (
        lineDataSpark.result[0].timestamp.map((time, u) => ({ x: moment((lineDataSpark.result[0].timestamp[u] - 3600) * 1000).format('MMM D'), y: lineDataSpark.result[0].indicators.quote[0].close[u] }))
      )
    }
    return { x: 0, y: 0 }
  }

  const maxDomain = () => {
    if (duration === 'month') {
      return (
        { y: (lineDataQuote.regularMarketDayHigh * 1.4) }
      )
    }
    if (duration === 'year') {
      return (
        { y: (lineDataQuote.fiftyTwoWeekHigh * 1.4) }
      )
    }
    return { x: 0, y: 0 }
  }

  console.log('lineDataQuote:', lineDataQuote)
  console.log('lineDataSpark:', lineDataSpark)

  if (!lineDataQuote || !lineDataSpark) {
    return <Loading />
  }

  return (
    <VictoryChart
      fixLabelOverlap
      domainPadding={25}
      theme={VictoryTheme.material}
      maxDomain={maxDomain()}
      containerComponent={(
        <VictoryCursorContainer
          cursorDimension="x"
          cursorLabel={({ datum }) => `Price:${datum.y.toFixed(2)}`}
        />
        )}
    >
      <VictoryLine
        style={{
          data: { stroke: '#c43a31' },
          parent: { border: '1px solid #ccc' },

          labels: { padding: -20 }
        }}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        data={chartdata()}
      />
      <VictoryAxis crossAxis fixLabelOverlap />
      <VictoryAxis dependentAxis crossAxis fixLabelOverlap />
    </VictoryChart>
  )
}

export default LineDay
