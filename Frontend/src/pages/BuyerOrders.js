import React , {useState, useEffect} from 'react'
import axios from 'axios'

const BuyerOrders = () => {
    const userID = sessionStorage.getItem('userID')
    const [newOrders, setNewOrders] = useState([])
    //let [restaurantID, setRestaurantID] = useState(0)
    const [restaurant, setRestaurant] = useState({})
    let restaurantID;

    const getOrdersByUserId = () => {
        try {
        axios.get(`http://localhost:8080/api/users/buyer/newOrder/${userID}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then((response) => {
            setNewOrders(response.data)
            console.log(response.data)
            })
        } catch (err) {
            console.log("Error on Getting Restaurant Orders")
        }
    }

  useEffect(() => {
    getOrdersByUserId()
  },[])

  const getRestaurantById = () => {
    try {
      axios.get(`http://localhost:8080/api/users/restaurants/restaurant/${restaurantID}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': '*',
        }
    }).then( (response) => {
        //console.log(response.data)
        setRestaurant(response.data)
        })
    } catch (err) {
        console.log("Error on Getting Restaurant Info")
    }
  }
  
  return (
    <div>
        <h1 className='order_heading'>New Orders</h1>
      
        {newOrders && newOrders.map((order, key) => {
          restaurantID = order.restaurantID;
            if(order.orderStatus !== "Delivered") {
            return (
              <div key={key} onClick={() => console.log(restaurant)}>
                <div className='order' key={key} >   
                    <div>{async () => {getRestaurantById()}}</div>
                   
                    {/*<img src={restaurant.restaurantImage} alt="restaurantImage" /> */}
                    <div className='d-flex justify-content-between align-content-center'>
                      <div className='name d-flex'>
                          <h2 className='firstname'>Restaurant Name</h2>
                      </div>
                      <h2 className='order_price'  onClick={() => console.log(restaurant)}>${order.totalPrice}</h2>
                      <h2 className={order.orderStatus == "New" ? 'status_new' : 
                          order.orderStatus == "Preparing" ? 'status_preparing' : 
                          order.orderStatus == 'Ready' ? 'status_ready' : 
                          order.orderStatus == 'Delivered' ? 'status_delivered' : 'status_canceled'} >
                          {order.orderStatus}
                      </h2>
                    </div>
                    {order.orderItems && order.orderItems.map((orderItem, key) => {
                        return (
                        <div key={key} className='item d-flex align-items-center'>
                            <h5 className='item_quantity'>{orderItem.quantity}</h5>
                            <p className='item_name'>{orderItem.itemName}</p>
                            <p className='item_price'>${ orderItem.quantity * orderItem.itemPrice }</p>
                        </div>
                        )
                    })}
                </div>
              </div>
            )
            }
        })}

      <h1 className='order_heading'>Past Orders</h1>
      
      {newOrders && newOrders.map((order, key) => {
        if(order.orderStatus === "Delivered") {
          return (
            <div className='order' key={key}>
                <div className='d-flex justify-content-between align-content-center'>
                  
                  <h2 className='order_price'>${order.totalPrice}</h2>
                  <h2 className={order.orderStatus == "New" ? 'status_new' : 
                    order.orderStatus == "Preparing" ? 'status_preparing' : 
                    order.orderStatus == 'Ready' ? 'status_ready' : 
                    order.orderStatus == 'Delivered' ? 'status_delivered' : 'status_canceled'} >
                    {order.orderStatus}
                  </h2>
                </div>
                  {order.orderItems && order.orderItems.map((orderItem, key) => {
                    return (
                      <div key={key} className='item d-flex align-items-center'>
                        <h5 className='item_quantity'>{orderItem.quantity}</h5>
                        <p className='item_name'>{orderItem.itemName}</p>
                        <p className='item_price'>${ orderItem.quantity * orderItem.itemPrice }</p>
                      </div>
                    )
                  })}
                </div>
          )
        }
      })}
    </div>   
  )
}

export default BuyerOrders