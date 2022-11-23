import React, { } from 'react'
import { useStockDetails } from '@/contexts/stockDetails'
import { VictoryCursorContainer, VictoryLine, VictoryTheme, VictoryChart, VictoryAxis } from 'victory'
import moment from 'moment'
import Loading from '@/components/Loading'

function BadgeChart() {
  const {
    badgeData: {
      badgeDataQuote,
      badgeDataSpark
    }
  } = useStockDetails()

  if (!badgeDataSpark) {
    return <Loading />
  }

  console.log('badgeDataQuote:', badgeDataQuote)
  console.log('badgeDataSpark:', badgeDataSpark)

  if (badgeDataSpark) {
    return (
      <VictoryChart
        fixLabelOverlap
        theme={VictoryTheme.material}
        maxDomain={{ y: badgeDataQuote.regularMarketDayHigh }}
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
          data={badgeDataSpark.timestamp.map((time, u) => ({ x: moment((badgeDataSpark.timestamp[u] - 3600) * 1000).format('hh:mm'), y: badgeDataSpark.close[u] }))}
        />
        <VictoryAxis crossAxis fixLabelOverlap />
        <VictoryAxis dependentAxis crossAxis />
      </VictoryChart>
    )
  }
}

export default BadgeChart
