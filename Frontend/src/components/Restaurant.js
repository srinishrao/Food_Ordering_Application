import React, { useState } from 'react'
import '../styles/restaurant.css'
import ViewRestaurant from './ViewRestaurant'
import { Link } from 'react-router-dom'

const Restaurant = (props) => {
    const [showRestaurant, setShowRestaurant] = useState(false)
    const [restaurantID, setRestaurantID] = useState(0)
    const displayRestaurant = () => {
        //console.log(props.restaurant.restaurantID)
        setShowRestaurant(true)
        setRestaurantID(props.restaurant.restaurantID)
    }
  return (
    <div className='restaurant_container d-flex ' onClick={()=> displayRestaurant()}>
    <Link to={`/restaurant/${props.restaurant.restaurantID}`} className="restaurant_link">
        <div >
            <img src={props.restaurant.restaurantImage} alt="restaurant-img" className='restaurant_img'/>
        </div>

        <div className='restaurant_content '>
            <div>
                <h3 className='rest_name'>{props.restaurant.restaurantName}</h3>
                <p className='rest_cuisine'>{props.restaurant.cuisine}</p>
            </div>
        </div></Link>
    </div>

  )
}

export default Restaurant