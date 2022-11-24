import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'

import { toast } from 'react-toastify'
import { renderErrors } from './_ultils'

const MyStockContext = createContext()

const initialIndex = {
  dataQuote: null,
  dataSpark: null,
  errorStocks: null,
  errorQuote: null,
  errorSpark: null,
  stocksIsLoading: true,
  quotesIsLoading: true,
  sparkIsLoading: true
}

const initStocklist = {
  stockList: null,
  errorList: null,
  ListIsLoading: true
}

export function MyStocksProvider({ children }) {
  const [indexState, setIndexState] = useState(initialIndex)
  const [stocklistState, setStocklistState] = useState(initStocklist)

  const getMyStocks = async (data) => {
    setIndexState(initialIndex)

    // console.log('Recommended ticker:', data)

    // ! GENERATE SYMBOLS LIST
    const myStocksList = data.map((stock) => stock.symbol)
    const symbols = myStocksList.join(',')

    setIndexState(await produce(initialIndex, async (draft) => {
      // ! STEP 2 | GET QUOTE
      try {
        const respQuote = await axios({
          method: 'GET',
          url: `${process.env.API_URL}/api/stock/quotes`,
          params: { symbols, region: 'US' }
        })
        draft.dataQuote = respQuote.data.quoteResponse.result

        // ! STEP 3 | GET SPARK
        try {
          const respSpark = await axios({
            method: 'GET',
            url: `${process.env.API_URL}/api/stock/spark`,
            params: { symbols, interval: '30m', range: '1d' }
          })
          draft.dataSpark = respSpark.data
        } catch (err) {
          draft.errorSpark = err
          renderErrors(err)
        } finally {
          draft.sparkIsLoading = false
        }
      } catch (err) {
        draft.errorQuote = err.response.data
        renderErrors(err)
      } finally {
        draft.quotesIsLoading = false
      }
    }))
  }

  const getStocksList = async () => {
    setStocklistState(await produce(initStocklist, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: `${process.env.API_URL}/api/my/stocks`
        })
        draft.stockList = resp.data.stocks
        // console.log(resp.data)
        if (resp.data.stocks.length > 0) {
          // console.log('getting my stock list information')
          getMyStocks(resp.data.stocks)
        }
      } catch (err) {
        draft.errorList = err.response.data
        // renderErrors(err)
      } finally {
        draft.ListIsLoading = false
      }
    }))
  }

  const createMyStock = async (ticker) => {
    // console.log('create stock request sent, symbol:', ticker)
    try {
      const resp = await axios({
        method: 'POST',
        url: `${process.env.API_URL}/api/my/stocks`,
        data: { symbol: `${ticker}` }
      })
      // console.log(resp)
    } catch (err) {
      // console.log(err)
      renderErrors('err:', err)
    }
    toast('Stock added successfully!')
    getStocksList()
  }

  const deleteMyStock = async (data) => {
    // console.log(data.id)
    try {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3000/api/my/stock/${data.id}`
      })
    } catch (err) {
      renderErrors(err)
    }
    // console.log(stocklistState.stockList)
    setStocklistState(await produce(stocklistState, async (draft) => {
      const stockDeleted = draft.stockList.filter((stock) => stock.id !== data.id)
      draft.stockList = stockDeleted
      // console.log(stockDeleted)
    }))
  }

  const contextData = {
    index: indexState,
    myStocks: stocklistState,
    getMyStocks,
    createMyStock,
    deleteMyStock,
    getStocksList
  }

  return <MyStockContext.Provider value={contextData}>{children}</MyStockContext.Provider>
}

export function useMyStocks() {
  return useContext(MyStockContext)
}
