import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'
import { useNavigate } from 'react-router-dom'
import { renderErrors } from './_ultils'

// import { renderErrors } from './_ultils'

const StockContext = createContext()

const initialSearch = {
  query: null,
  queryDataQuote: null,
  queryDataSpark: null,
  queryQuoteIsLoading: true,
  querySparkIsLoading: true,
  queryErrorQuote: null,
  queryErrorSpark: null
}

export function SearchProvider({ children }) {
  const navigation = useNavigate()
  const [searchState, setSearchState] = useState(initialSearch)

  const searchStock = async (data) => {
    setSearchState(initialSearch)
    setSearchState(await produce(initialSearch, async (draft) => {
      draft.query = data.toUpperCase()
      const symbols = data.toUpperCase()
      // ! STEP 1 | GET QUOTE
      try {
        const respQuote = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/stock/quotes',
          params: { symbols, region: 'US' }
        })
        draft.queryDataQuote = respQuote.data.quoteResponse.result

        // ! STEP 2 | GET SPARK
        try {
          const respSpark = await axios({
            method: 'GET',
            url: 'http://localhost:3000/api/stock/spark',
            params: { symbols, interval: '30m', range: '1d' }
          })
          draft.queryDataSpark = respSpark.data
        } catch (err) {
          draft.queryErrorSpark = err
          renderErrors(err)
        } finally {
          draft.querySparkIsLoading = false
        }
      } catch (err) {
        draft.queryErrorQuote = err.response.data
        renderErrors(err)
      } finally {
        draft.queryQuoteIsLoading = false
        navigation('/stocks')
      }
    }))
  }

  const contextData = {
    search: searchState,
    searchStock
  }

  return <StockContext.Provider value={contextData}>{children}</StockContext.Provider>
}

export function useSearch() {
  return useContext(StockContext)
}
