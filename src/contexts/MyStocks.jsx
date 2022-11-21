import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'

import { renderErrors } from './_ultils'

const MyStockContext = createContext()

const initialIndex = {
  dataStocks: null,
  dataQuote: null,
  dataSpark: null,
  errorStocks: null,
  errorQuote: null,
  errorSpark: null,
  stocksIsLoading: true,
  quotesIsLoading: true,
  sparkIsLoading: true
}

export function MyStocksProvider({ children }) {
  const [indexState, setIndexState] = useState(initialIndex)

  const getMyStocks = async () => {
    setIndexState(initialIndex)
    setIndexState(await produce(initialIndex, async (draft) => {
      // ! STEP 1 | GET STOCKS
      try {
        const resp = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/my/stocks'
        })
        draft.dataStocks = resp.data.stocks

        // ! GENERATE SYMBOLS LIST
        const myStocksList = resp.data.stocks.map((stock) => stock.symbol)
        const symbols = myStocksList.join(',')

        // ! STEP 2 | GET QUOTE
        try {
          const respQuote = await axios({
            method: 'GET',
            url: 'http://localhost:3000/api/stock/quotes',
            params: { symbols, region: 'US' }
          })
          draft.dataQuote = respQuote.data.quoteResponse.result
        } catch (err) {
          draft.errorQuote = err.response.data
          renderErrors(err)
        } finally {
          draft.quotesIsLoading = false
        }

        // ! STEP 3 | GET SPARK
        try {
          const respSpark = await axios({
            method: 'GET',
            url: 'http://localhost:3000/api/stock/spark',
            params: { symbols, interval: '60m', range: '1d' }
          })
          draft.dataSpark = respSpark.data
        } catch (err) {
          draft.errorSpark = err
          renderErrors(err)
        } finally {
          draft.sparkIsLoading = false
        }
      } catch (err) {
        draft.errorStocks = err.response.data
        renderErrors(err)
      } finally {
        draft.stocksIsLoading = false
      }
    }))
  }

  const createMyStock = async (ticker) => {
    console.log('create stock request sent, symbol:', ticker)
    try {
      const resp = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/my/stocks',
        data: { symbol: `${ticker}` }
      })
      console.log(resp)
    } catch (err) {
      renderErrors(err)
    }
  }

  const deleteMyStock = async (data) => {
    console.log(data.id)
    setIndexState(await produce(indexState, async (draft) => {
      try {
        await axios({
          method: 'DELETE',
          url: `http://localhost:3000/api/my/stock/${data.id}`
        })
      } catch (err) {
        renderErrors(err)
      }

      try {
        const resp = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/my/stocks'
        })
        draft.dataStocks = resp.data.stocks
      } catch (err) {
        draft.errorStocks = err.response.data
        renderErrors(err)
      }
    }))
  }

  const contextData = {
    index: indexState,
    getMyStocks,
    createMyStock,
    deleteMyStock
  }

  return <MyStockContext.Provider value={contextData}>{children}</MyStockContext.Provider>
}

export function useMyStocks() {
  return useContext(MyStockContext)
}