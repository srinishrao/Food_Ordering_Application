import React from 'react'
import {Routes, Route} from "react-router-dom"

import BuyerLogin from '../pages/Login/BuyerLogin'
import BuyerSignUp from '../pages/Signup/BuyerSignUp'
import OwnerLogin from '../pages/Login/OwnerLogin'
import OwnerSignUp from '../pages/Signup/OwnerSignUp'
import OwnerHome from '../pages/Home/OwnerHome'
import Order from '../pages/Order'
import BuyerHome from '../pages/Home/BuyerHome'
import ViewRestaurant from '../components/ViewRestaurant'
import BuyerOrders from '../pages/BuyerOrders'

const Routers = () => {
  return (
    <Routes>
        <Route path='/Buyerlogin' element={<BuyerLogin />} />
        <Route path='/Buyersignup' element={<BuyerSignUp />} />
        <Route path='/Ownerlogin' element={<OwnerLogin />} />
        <Route path='/Ownersignup' element={<OwnerSignUp />} />
        <Route path='/OwnerHome' element={<OwnerHome />} />  
        <Route path='/Orders' element={<Order />} />
        <Route path='/home' element={<BuyerHome />} />
        <Route path='restaurant/:restaurantID' element={<ViewRestaurant />} />
        <Route path='/BuyerOrders' element={<BuyerOrders />} />
    </Routes>
  )
}

export default Routers