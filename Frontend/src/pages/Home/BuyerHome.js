import React, {useState} from 'react'
import axios from 'axios';
import '../../styles/buyerhome.css'
import Header from '../../components/BuyerHeader';
import  Restaurant from '../../components/Restaurant.js';
import { Col } from 'reactstrap'

const BuyerHome = () => {
  const [restaurants, setRestaurants] = useState([])

  const displayRestaurants = async (e) => {
    if(e.key === "Enter") {
      const itemName = e.target.value;
      try {
        await axios.get(`http://localhost:8080/api/users/section/itemRestaurants/${itemName}`, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(async (response) => {
              setRestaurants(response.data)
              if(response.data.length == 0) {
                const cuisine = e.target.value;
                try {
                  await axios.get(`http://localhost:8080/restaurants/cuisine/${cuisine}`, {
                      headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                      }
                  }).then(async (response) => {
                        setRestaurants(response.data)
                    })
                } catch (err) {
                    console.log("Error on Displaying Restaurants based on Cuisine")
                }
              }
          })
      } catch (err) {
        console.log("Error on Displaying Restaurants based on ItemName")
      }
    }
  }

  return (
    <div>
      <Header displayRestaurants={displayRestaurants}/>
      <section className='rest__section mt-30'>
            {restaurants && restaurants.map((restaurant) => {
              return (
                <Col lg='3' md='4' sm='6' xs='6' key={restaurant.restaurantID} className='mt-5 mb-0'>
                  <Restaurant restaurant={restaurant} />
                </Col>
              )
              })
            }
      </section>
    </div>
    )
}

export default BuyerHome