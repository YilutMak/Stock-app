import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'

import { renderErrors } from './_ultils'

const StocksContext = createContext()

// const initialIndex = { data: [], error: null, loading: true }
const initialRecommendations = {
  dataRecommendStocks: null,
  dataSpark: null,
  errorRecommendations: null,
  errorSpark: null,
  recommendIsLoading: true,
  SparkIsLoading: true
}
const initialGraphs = { graphs: null, graphError: null, graphLoading: true }
const initialQuotes = { quotes: null, quoteError: null, quoteLoading: true }

export function StocksProvider({ children }) {
// const [indexState] = useState(initialIndex)
  const [recommendationsState, setRecommendationsState] = useState(initialRecommendations)
  const [graphsState, setGraphsState] = useState(initialGraphs)
  const [quotesState, setQuotesState] = useState(initialQuotes)

  const getStockRecommendations = async (symbol) => {
    setRecommendationsState(initialRecommendations)
    setRecommendationsState(await produce(initialRecommendations, async (draft) => {
      // ! STEP 1 | GET RECOMMENEDED STOCKS
      try {
        const resp = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/stock/recomendations',
          params: { symbol }
        })
        draft.dataRecommendStocks = resp.data
        // console.log('stock recommendations:', resp.data.finance.result[0].quotes[0].symbol)

        // ! GENERATE SYMBOLS LIST
        const myStocksList = resp.data.finance.result[0].quotes.map((stock) => stock.symbol)
        const symbols = myStocksList.join(',')

        // ! STEP 2 | GET SPARK DATA
        try {
          const respRecommendSpark = await axios({
            method: 'GET',
            url: 'http://localhost:3000/api/stock/spark',
            params: { symbols, interval: '60m', range: '1d' }
          })
          draft.dataSpark = respRecommendSpark.data
        } catch (err) {
          draft.errorSpark = err.response.data
          renderErrors(err)
        } finally {
          draft.SparkIsLoading = false
        }

      // ! STEP 3 | COMPLETE RECOMMENEDED
      } catch (err) {
        draft.errorRecommendations = err.response.data
        renderErrors(err)
      } finally {
        draft.recommendIsLoading = false
      }
    }))
  }

  const getStockSpark = async (tickers) => {
    const symbols = tickers.join()
    setGraphsState(initialGraphs)
    setGraphsState(await produce(initialGraphs, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/stock/spark',
          params: { symbols, interval: '60m', range: '1d' }
        })
        draft.graphs = resp.data
      } catch (err) {
        draft.error = err.response.data
        renderErrors(err)
      } finally {
        draft.graphLoading = false
      }
    }))
  }

  const getStockQuote = async (tickers) => {
    const symbols = tickers.join()
    setQuotesState(initialGraphs)
    setQuotesState(await produce(initialGraphs, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/stock/quote',
          params: { symbols, region: 'US' }
        })
        draft.quotes = resp.data
        console.log('stock quotes:', resp.data)
      } catch (err) {
        draft.error = err.response.data
        renderErrors(err)
      } finally {
        draft.graphLoading = false
      }
    }))
  }

  const contextData = {
    stockRecomendations: recommendationsState,
    stockGraphs: graphsState,
    stockQuote: quotesState,
    getStockRecommendations,
    getStockSpark,
    getStockQuote
  }

  return <StocksContext.Provider value={contextData}>{children}</StocksContext.Provider>
}

export function useStocks() {
  return useContext(StocksContext)
}
