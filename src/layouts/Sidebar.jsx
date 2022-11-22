import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { useAuth } from '@/contexts/Auth'

function LayoutsSidebar() {
  // const { show: { data: currentUser }, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div style={{ height: '100%', width: '50px' }}>
      <div style={{ height: '50px', width: '50px', background: 'gray' }} onClick={() => navigate('/my/stocks')}> stocks </div>
      <div style={{ height: '50px', width: '50px', background: 'black' }} onClick={() => navigate('/stocks')}> search </div>
      <div style={{ height: '100%', width: '50px', background: 'blue' }} onClick={() => navigate('/stocks')} />
    </div>
  )
}

export default LayoutsSidebar
