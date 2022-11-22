import React from 'react'
// import { useMyStocks } from '@/contexts/MyStocks'

function LayoutsStockDetails() {
  // const {
  //   index: {
  //     dataStocks,
  //     dataQuote,
  //     dataSpark
  //   }
  // } = useMyStocks()

  const handleSidebarClose = () => {
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    function closeSidebar() {
      document.getElementById('stockDetails').style.width = '0'
      document.getElementById('stockBadges').style.marginRight = '0'
    }

    closeSidebar()
  }
  return (
    <div id="stockDetails" className="col-4" style={{}}>
      stock details
      <button type="button" onClick={handleSidebarClose}>x</button>
    </div>
  )
}

export default LayoutsStockDetails
