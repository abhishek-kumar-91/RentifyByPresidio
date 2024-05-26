import React from 'react'
import UserNavbar from "../components/UserNavbar"
import BuyerPropertyList from './BuyerPropertyList'

function Home() {
  return (
    <div>
    <UserNavbar />
      <BuyerPropertyList />
    </div>
  )
}

export default Home