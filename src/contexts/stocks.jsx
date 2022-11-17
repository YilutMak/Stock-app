import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'

import { renderErrors } from './_ultils'

const StocksContext = createContext()

const initialIndex = { data: [], error: null, loading: true }
const initialShow = { data: null, error: null, loading: true }

export function StocksProvider({ children }) {
  const [indexState] = useState(initialIndex)
  const [showState, setShowState] = useState(initialShow)

  const getStockRecommendations = async (symbol) => {
    setShowState(initialShow)
    setShowState(await produce(initialShow, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/stock/recomendations',
          params: { symbol }
        })
        draft.data = resp.data
      } catch (err) {
        draft.error = err.response.data
        renderErrors(err)
      } finally {
        draft.loading = false
      }
    }))
  }

  const contextData = {
    index: indexState,
    show: showState,
    getStockRecommendations
  }

  return <StocksContext.Provider value={contextData}>{children}</StocksContext.Provider>
}

export function useStocks() {
  return useContext(StocksContext)
}
