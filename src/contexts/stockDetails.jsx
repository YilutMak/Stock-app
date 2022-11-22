import React, { useState, createContext, useContext } from 'react'
// import axios from 'axios'
// import produce from 'immer'
// import { useNavigate } from 'react-router-dom'
// import { renderErrors } from './_ultils'

// import { renderErrors } from './_ultils'

const StockDetailContext = createContext()

// const initialStockDetails = {
//   stockDetailData: null,
//   stockDetailIsLoading: true,
//   stockDetailError: null
// }

const initialexpandedDetails = {
  expanded: false,
  stockDetailWidth: 0,
  stockBadgesMargin: 0,
  displayStock: null,
  stockDataQuote: null,
  stockDataSpark: null
}

export function StockDetailProvider({ children }) {
  // const navigation = useNavigate()
  // const [stockDetailState, setStockDetailState] = useState(initialStockDetails)
  const [expandedDetailsState, setExpandedDetailState] = useState(initialexpandedDetails)

  // const getStockDetailStock = async (data) => {
  //   setStockDetailState(initialStockDetails)
  //   setStockDetailState(await produce(initialStockDetails, async (draft) => {
  //     draft.query = data.toUpperCase()
  //     const symbols = data.toUpperCase()
  //     // ! STEP 1 | GET QUOTE
  //     try {
  //       const respQuote = await axios({
  //         method: 'GET',
  //         url: 'http://localhost:3000/api/stock/quotes',
  //         params: { symbols, region: 'US' }
  //       })
  //       draft.queryDataQuote = respQuote.data.quoteResponse.result
  //
  //       // ! STEP 2 | GET SPARK
  //       try {
  //         const respSpark = await axios({
  //           method: 'GET',
  //           url: 'http://localhost:3000/api/stock/spark',
  //           params: { symbols, interval: '30m', range: '1d' }
  //         })
  //         draft.queryDataSpark = respSpark.data
  //       } catch (err) {
  //         draft.queryErrorSpark = err
  //         renderErrors(err)
  //       } finally {
  //         draft.querySparkIsLoading = false
  //       }
  //     } catch (err) {
  //       draft.queryErrorQuote = err.response.data
  //       renderErrors(err)
  //     } finally {
  //       draft.queryQuoteIsLoading = false
  //       navigation('/stocks')
  //     }
  //   }))
  // }

  const expandStockDetails = (data, DataQuote, DataSpark) => {
    setExpandedDetailState({
      expanded: true,
      stockDetailWidth: '40%',
      stockBadgesMargin: '40%',
      displayStock: data.toUpperCase(),
      stockDataQuote: DataQuote,
      stockDataSpark: DataSpark
    })
    console.log('Details expanded?', expandedDetailsState)
    console.log('DataQuote:', DataQuote)
    console.log('DataSpark:', DataSpark)
  }

  const closeStockDetails = () => {
    setExpandedDetailState(initialexpandedDetails)
    console.log('Details expanded?', expandedDetailsState)
  }

  const contextData = {
    // stockDetails: stockDetailState,
    expandDetails: expandedDetailsState,
    expandStockDetails,
    closeStockDetails
  }

  return <StockDetailContext.Provider value={contextData}>{children}</StockDetailContext.Provider>
}

export function useStockDetails() {
  return useContext(StockDetailContext)
}
