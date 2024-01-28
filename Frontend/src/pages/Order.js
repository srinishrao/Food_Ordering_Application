import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import '../styles/order.css'

const Order = () => {

  const restaurantID = sessionStorage.getItem('restaurantID')
  const [show, setShow] = useState(false)

  const [newOrders, setNewOrders] = useState([])
  const [orderID, setOrderID] = useState(0)
  const [orderStatus, setOrderStatus] = useState('')

  const getOrdersByRestaurantId = async () => {
    try {
      await axios.get(`http://localhost:8080/api/users/owner/order/${restaurantID}`,  {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          }
      }).then(async (response) => {
          setNewOrders(response.data)
          console.log(response.data)
        })
    } catch (err) {
        console.log("Error on Getting Restaurant Orders")
      }
  }

  useEffect(() => {
    getOrdersByRestaurantId()
  },[])

  const updateOrder = async () => {
    const orderUpdate = {
      "orderStatus": orderStatus
    }
    try {
      await axios.put(`http://localhost:8080/api/users/owner/updateOrder/${orderID}`, orderUpdate, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          }
      }).then(async (response) => {
          console.log(response.data)
        }) 
    } catch (err) {
        console.log("Error on Updating Order")
      }
    setShow(false)
    window.location.reload();
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div>
      <h1 className='order_heading'>New Orders</h1>
      
      {newOrders && newOrders.map((order, key) => {
        if(order.orderStatus !== "Delivered") {
          return (
            <div className='order' key={key} onClick={() => {setShow(true); setOrderID(order.orderID)}}>
                <div className='d-flex justify-content-between align-content-center'>
                  <div className='name d-flex'>
                    <h2 className='firstname'>{order.firstName}</h2>
                    <h2 className='lastname'>{order.lastName}</h2>
                  </div>
                  <h2 className='order_price'>${order.totalPrice}</h2>
                  <h2 className={order.orderStatus == "New" ? 'status_new' : 
                    order.orderStatus == "Preparing" ? 'status_preparing' : 
                    order.orderStatus == 'Ready' ? 'status_ready' : 
                    order.orderStatus == 'Delivered' ? 'status_delivered' : 'status_canceled'} >
                    {order.orderStatus}
                  </h2>
                </div>
                <div>
                  <p className='address'>{order.address}</p>
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

      <h1 className='order_heading'>Past Orders</h1>
      
      {newOrders && newOrders.map((order, key) => {
        if(order.orderStatus === "Delivered") {
          return (
            <div className='order' key={key}>
                <div className='d-flex justify-content-between align-content-center'>
                  <div className='name d-flex'>
                    <h2 className='firstname'>{order.firstName}</h2>
                    <h2 className='lastname'>{order.lastName}</h2>
                  </div>
                  <h2 className='order_price'>${order.totalPrice}</h2>
                  <h2 className={order.orderStatus == "New" ? 'status_new' : 
                    order.orderStatus == "Preparing" ? 'status_preparing' : 
                    order.orderStatus == 'Ready' ? 'status_ready' : 
                    order.orderStatus == 'Delivered' ? 'status_delivered' : 'status_canceled'} >
                    {order.orderStatus}
                  </h2>
                </div>
                <div>
                  <p className='address'>{order.address}</p>
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

      <Modal className="setModal143" show={show} onHide={handleClose} centered={show}>
                <Modal.Header className="item2">
                  <Modal.Title >Update Order</Modal.Title>
                </Modal.Header>
                <Modal.Body className="item3">
                  <div className="form-group">
                    Order Status <input type="text" id="orderStatus" className="form-control" 
                    onChange={(e) => setOrderStatus(e.target.value)} required />
                  </div>
                </Modal.Body>
                <Modal.Footer className="item2">
                  <Button variant="primary" className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                    <span className="s-btn-copy" onClick={updateOrder}>Update</span>
                  </Button>
                  <Button variant="secondary" onClick={handleClose} className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                    <span className="s-btn-copy">Close</span>
                  </Button>
                </Modal.Footer>
              </Modal>
    </div>
  )
}

export default Order