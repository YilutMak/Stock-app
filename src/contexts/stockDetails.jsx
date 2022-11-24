import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'
import { renderErrors } from './_ultils'
// import { useNavigate } from 'react-router-dom'

const StockDetailContext = createContext()

// ! PROPS FOR EXPANDING DETAILS
const initialexpandedDetails = {
  stockSymbol: null,
  expanded: false,
  stockDetailWidth: 0,
  stockBadgesMargin: 0,
  displayStock: null
}

// ! INITIAL DATA FETCH
const initialStockDetails = {
  stockSummary: null,
  isLoading: true,
  summaryError: null,
  dayChartData: null,
  dayChartError: null,
  dayChartLoading: null,
  monthChartData: null,
  monthChartError: null,
  monthChartLoading: null,
  yearChartData: null,
  yearChartError: null,
  yearChartLoading: null
}

// ! ONLY USED FOR 1 DAY LINE ONLY (BADGE PRESS)
const initialBadgeChartData = {
  badgeDataQuote: null,
  badgeDataSpark: null
}

// ! USED FOR MONTH/YEAR (LINE ONLY)
const initialLineChartDataState = {
  lineDataQuote: null,
  lineDataSpark: null
}

// ! USED FOR DAY/MONTH/YEAR (CANDLE ONLY)
const initialCandleChartDataState = {
  candleDataQuote: null,
  candleDataSpark: null
}

// ! CHART TYPE SELECTION
const initialChartType = {
  type: 'line'
}

// ! CHART DURATION SELECTION
const initialChartDuration = {
  duration: 'day'
}

export function StockDetailProvider({ children }) {
  // EXPAND DETAILS STATE
  const [expandedDetailsState, setExpandedDetailState] = useState(initialexpandedDetails)
  // DATA FETCH STATE
  const [stockDetailsState, setStockDetailsState] = useState(initialStockDetails)
  // LINE DAY DATA STATE (BADGE PRESSED)
  const [badgeChartDataState, setBadgeChartDataState] = useState(initialBadgeChartData)
  // LINE MONTH/YEAR DATA STATE
  const [lineChartDataState, setLineChartDataState] = useState(initialLineChartDataState)
  // CANDLE DAY/MONTH/YEAR DATA STATE
  const [candleChartDataState, setCandleChartDataState] = useState(initialCandleChartDataState)
  // CHART TYPE SELECTION
  const [chartTypeState, setChartTypeState] = useState(initialChartType)
  // CHART DURATION SELECTION
  const [chartDurationState, setChartDurationState] = useState(initialChartDuration)

  // EXPAND DETAILS FUNCTION
  const expandStockDetails = async (data, DataQuote, DataSpark) => {
    setExpandedDetailState({
      stockSymbol: data,
      expanded: true,
      stockDetailWidth: '40%',
      stockBadgesMargin: '40%',
      displayStock: data.toUpperCase()

    })
    setBadgeChartDataState({
      badgeDataQuote: DataQuote,
      badgeDataSpark: DataSpark
    })
    setChartTypeState({
      type: 'line'
    })
    setChartDurationState({
      duration: 'day'
    })
    setLineChartDataState(initialLineChartDataState)
    setCandleChartDataState(initialCandleChartDataState)
  }

  // ! CLOSE DETAILS FUNCTION
  const closeStockDetails = () => {
    setExpandedDetailState(initialexpandedDetails)
  }

  // ! DATA FETCH WHEN BADGE PRESSED FUNCTION
  const retrieveStockDetails = async (data) => {
    setStockDetailsState(await produce(initialexpandedDetails, async (draft) => {
      const upperCaseSymbol = data.toUpperCase()
      const symbol = `${upperCaseSymbol}`
      // ! STEP 1 | GET STOCK SUMMARY
      try {
        const respSummary = await axios({
          method: 'GET',
          url: `${process.env.API_URL}/api/stock/summary`,
          params: { symbol, region: 'US' }
        })
        draft.stockSummary = respSummary.data
        // console.log(respSummary.data)
        // ! STEP 2 | GET STOCK DAY DATA
        try {
          const respDay = await axios({
            method: 'GET',
            url: `${process.env.API_URL}/api/stock/chartv3`,
            params: { interval: '5m', symbol, range: '1d' }
          })
          draft.dayChartData = respDay.data.chart
        // console.log(respSummary.data)
        } catch (err) {
          draft.dayChartError = err.response.data
          renderErrors(err)
        } finally {
          draft.dayChartLoading = false
        }
        // ! STEP 3 | GET STOCK MONTH DATA
        try {
          const respMonth = await axios({
            method: 'GET',
            url: `${process.env.API_URL}/api/stock/chartv3`,
            params: { interval: '1d', symbol, range: '1mo' }
          })
          draft.monthChartData = respMonth.data.chart
        // console.log(respSummary.data)
        } catch (err) {
          draft.monthChartError = err.response.data
          renderErrors(err)
        } finally {
          draft.monthChartLoading = false
        }
        // ! STEP 4 | GET STOCK YEAR DATA
        try {
          const respYear = await axios({
            method: 'GET',
            url: `${process.env.API_URL}/api/stock/chartv3`,
            params: { interval: '1d', symbol, range: '1y' }
          })
          draft.yearChartData = respYear.data.chart
        // console.log(respSummary.data)
        } catch (err) {
          draft.yearChartError = err.response.data
          renderErrors(err)
        } finally {
          draft.yearChartLoading = false
        }
      // ! STEP 5 | COMPLETE SUMMARY
      } catch (err) {
        draft.summaryError = err.response.data
        renderErrors(err)
      } finally {
        draft.isLoading = false
      }
    }))
  }

  // ! VIEW DAY CHART FUNCTION
  const viewDayChart = (dataQuote, dataSpark) => {
    setChartDurationState({ duration: 'day' })
    setCandleChartDataState({
      candleDataQuote: dataQuote,
      candleDataSpark: dataSpark
    })
  }

  // ! VIEW MONTH CHART FUNCTION
  const viewMonthChart = (dataQuote, dataSpark) => {
    setChartDurationState({ duration: 'month' })
    setLineChartDataState({
      lineDataQuote: dataQuote,
      lineDataSpark: dataSpark
    })
    setCandleChartDataState({
      candleDataQuote: dataQuote,
      candleDataSpark: dataSpark
    })
  }

  // ! VIEW YEAR CHART FUNCTION
  const viewYearChart = (dataQuote, dataSpark) => {
    setChartDurationState({ duration: 'year' })
    setLineChartDataState({
      lineDataQuote: dataQuote,
      lineDataSpark: dataSpark
    })
    setCandleChartDataState({
      candleDataQuote: dataQuote,
      candleDataSpark: dataSpark
    })
  }

  // ! VIEW LINE CHART FUNCTION
  const viewLineChart = () => {
    setChartTypeState({ type: 'line' })
  }

  // ! VIEW CANDLE CHART FUNCTION
  const viewCandleChart = () => {
    setChartTypeState({ type: 'candle' })
  }

  const contextData = {
    expandDetails: expandedDetailsState,
    stockDetails: stockDetailsState,
    chartType: chartTypeState,
    chartDuration: chartDurationState,
    badgeData: badgeChartDataState,
    lineChartData: lineChartDataState,
    candleChartData: candleChartDataState,
    expandStockDetails,
    closeStockDetails,
    retrieveStockDetails,
    viewDayChart,
    viewMonthChart,
    viewYearChart,
    viewLineChart,
    viewCandleChart
  }

  return <StockDetailContext.Provider value={contextData}>{children}</StockDetailContext.Provider>
}

export function useStockDetails() {
  return useContext(StockDetailContext)
}
