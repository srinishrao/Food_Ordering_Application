import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import logo from '../images/grubhub-logo.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Col, Row } from 'reactstrap'
import '../styles/restaurant.css'
import '../styles/productCard.css'
import {ListGroupItem} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { getDate } from 'date-fns';
import { current } from '@reduxjs/toolkit';

const ViewRestaurant = () => {
  const { restaurantID } = useParams()
  //console.log(restaurantID)
  const [restaurant, setRestaurant] = useState([])
  const [sections, setSections] = useState([])
  const [sectionName, setSectionName] = useState('')
  const [sectionItems, setSectionItems] = useState([])
  const [sectionID, setSectionID] = useState(0)
  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantImage, setRestaurantImage] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [cartItems, setCartItems] = useState([])

  const [displayed, setDisplayed] = useState(false)
  const [showProfile, setShowProfile] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [show, setShow] = useState(false)
  
  const userID = sessionStorage.getItem('userID');
  const useremail = sessionStorage.getItem('email');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [address, setAddress] = useState('')

  const placeOrder = async () => {
    const orderItems = cartItems.map(({itemID, itemPrice, quantity, itemName}) => 
      ({itemID, itemPrice, quantity, itemName})
    )

    const order = {
        "restaurantID": restaurantID,
        "userID": userID,
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "orderStatus": "New",
        "totalPrice": getCartTotal(),
        "creationTime": new Date().toLocaleString(),
        "modifiedTime": new Date().toLocaleString(),
        "orderItems": orderItems
    }
    console.log(order)

    try {
      await axios.post("http://localhost:8080/api/users/order/createOrder", order , {
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
          }
      }).then(async (response) => {
          console.log(response.data)
      })
    } catch (err) {
      console.log("Error on Placing Order")
    }
    setShow(current => !current)
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/useremail/${useremail}`)
    .then((response) => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setPhoneNumber(response.data.phoneNumber)
        setProfileImage(response.data.profileImage)
        setAddress(response.data.address)
    })
  }, [])

  const handleInputChange = (e) => {
      const searchWord = e.target.value;
      setSearchText(searchWord)
  }

  const showCart = () => {
    setShow(current => !current)
  }

  const displayUser = () => {
      setDisplayed(current => !current)
  }

  const navigate = useNavigate();
  const signOut = () => {
      navigate('/Buyerlogin')
  }

  const updateProfile = async (e) => {
    e.preventDefault();
    const user = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber,
        "profileImage": profileImage, 
        "address": address
    }

    try {
        await axios.put(`http://localhost:8080/api/users/buyerProfile/${userID}`, user , {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(async (response) => {
            console.log(response.data)
        })
      } catch (err) {
        console.log("Error on Updating Profile")
      }
    setShowProfile(false);
  }

  const handleClose = () => {
    setShowProfile(false) 
  }

  useEffect( () => {
      axios.get(`http://localhost:8080/api/users/restaurants/restaurant/${restaurantID}`, {
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
          }
      }).then((response) => {
          setRestaurant(response.data);
          setRestaurantName(response.data[0].restaurantID.restaurantName)
          setRestaurantImage(response.data[0].restaurantID.restaurantImage)
          setCuisine(response.data[0].restaurantID.cuisine)
      })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8080/api/users/sections")
          .then((response) => {
              setSections(response.data)
              //console.log(response.data)
          })
          .catch((err) => console.log(err));
  },[])

  useEffect(() => {
    axios.get("http://localhost:8080/api/users/section/items")
        .then((response) => {
          setSectionItems(response.data)
          //console.log(response.data)
        })
        .catch((err) => console.log(err));
  },[])
/*
  const addToCart = (item) => {
    //setNewItem(item)
    setCartItems(cartItems => [
        ...cartItems,
        item
    ])
  }*/

  const addToCart = (item) => {
    //console.log(item)
    //console.log(cartItems)
    const cartCopy = cartItems.slice();
    //console.log(cartCopy)
    const index = cartCopy.findIndex((product) => item.itemID === product.itemID);
    //console.log(index)
    if (index === -1) {
      //console.log("inside if")
      cartCopy.push({ ...item, quantity: 1 });
    } else {
      //console.log("inside else")
      const pr = cartCopy[index];
      cartCopy[index] = { ...pr, quantity: pr.quantity + 1 };
    }
    setCartItems(cartCopy);
  };

  const incrementCount = (item) => {
    /*setQuantity(quantity => quantity + 1)*/
    console.log(item)
    const cartCopy = cartItems.slice();

    const index = cartCopy.findIndex((product) => item.itemID === product.itemID);

    const pr = cartCopy[index];
    cartCopy[index] = { ...pr, quantity: pr.quantity + 1 };

    setCartItems(cartCopy);
  }

  const decrementCount = (item) => {
    const cartCopy = cartItems.slice();

    const index = cartCopy.findIndex((product) => item.itemID === product.itemID);

    const pr = cartCopy[index];
    cartCopy[index] = { ...pr, quantity: pr.quantity - 1 };

    setCartItems(cartCopy);
  }
  
  const removeFromCart = (item) => {
    const cartCopy = cartItems.filter((product) => item.itemID !== product.itemID);
    setCartItems(cartCopy);
  }

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, product) => total + product.itemPrice * product.quantity,
      0
    );
  };

  const getCartCount = () => {
    // return cart.length;
    return cartItems.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <div>
      <div>
      <header className='header d-flex align-items-center justify-content-between'>
          <div className='logo'>
              <img src={logo} alt="logo" />
              {/*<h5 className='text-center'>Grubhub</h5>*/}
          </div>

          <div className='nav_right d-flex align-items-center gap-5'>
              <span onClick={showCart} className='cart__icon'>
                <i className="ri-shopping-basket-line"></i>
                <span className='cart__badge'>{getCartCount()}</span>
              </span>
              <span className='user' onClick={displayUser}>
                  <i className="ri-user-3-line"></i>           
              </span>
          </div>
        
          <div className={show ? 'show_cart': 'no_cart'}>
          <div className='cart_item_list'>
            <span className='cart__close' onClick={() => setShow(false)}><i className="ri-close-line"></i></span>
            {cartItems && cartItems.map((item, key) => {
                return (
                    <ListGroupItem key={key} className="border-0 cart__item">
                        <div className="cart__item-info d-flex gap-2">
                            <img src={item.itemImage} alt="product-img" />

                            <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
                            <div>
                                <h6 className="cart__product-title">{item.itemName}</h6>
                                <p className=" d-flex align-items-center gap-5 cart__product-price">
                                {item.quantity}x <span>${item.quantity * item.itemPrice}</span>
                                </p>
                                <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
                                <span className="increase__btn" onClick={() => incrementCount(item)}>
                                    <i className="ri-add-line"></i>
                                </span>
                                <span className="quantity">{item.quantity}</span>
                                <span className="decrease__btn" onClick={() => decrementCount(item)}>
                                    <i className="ri-subtract-line"></i>
                                </span>
                                </div>
                            </div>

                            <span className="delete__btn" onClick={() => {removeFromCart(item)}}>
                                <i className="ri-delete-bin-line"></i>
                            </span>
                            </div>
                        </div>
                    </ListGroupItem>
                )
            })}
            </div>
            <div className='cart__bottom d-flex align-items-center'>
              <h6>Total : <span>${getCartTotal()}</span> </h6>
              <button onClick={() => {
                console.log(cartItems)
                placeOrder()
              }}>Checkout</button>
            </div>
            
            
          </div>
          
          <div className={displayed ? "user_info" : "user_none" }> 
              <p className='user_name'>Hi, {firstName}</p>
              <p className='user_profile' onClick={() => setShowProfile(true)}>Your Profile</p>
              <p className='sign_out' onClick={signOut}>Sign out</p>
          </div>

      
          <Modal className="profileContainer modal-lg" show={showProfile} onHide={handleClose} centered={showProfile}>
              <Modal.Header className="item2">
              <Modal.Title >Your Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body className=" d-flex justify-content-between">
              <div>
                  <div>
                      Profile Image <input type="url" id="profileImage" className="form-control" 
                      onChange={(e) => setProfileImage(e.target.value)}  placeholder={profileImage} />

                      <img src={profileImage} alt='No ProfileImage' className='profile__images'></img>
                  </div>
              </div>
              <div className='profile__text'>
                  First Name <input type="text" id="firstName" className="form-control" 
                  onChange={(e) => setFirstName(e.target.value)}  placeholder={firstName} />
              
                  Last Name <input type="text" id="lastName" className="form-control" 
                  onChange={(e) => setLastName(e.target.value)}  placeholder={lastName} />
              
                  Email <input type="email" id="email" className="form-control" 
                  onChange={(e) => setEmail(e.target.value)}  placeholder={email} />
              
                  Phone Number <input type="tel" id="phoneNumber" className="form-control" 
                  onChange={(e) => setPhoneNumber(e.target.value)} placeholder={phoneNumber} />

                  Address <input type="text" id="address" className="form-control" 
                  onChange={(e) => setAddress(e.target.value)} placeholder={address} />
              </div>
              </Modal.Body>
              <Modal.Footer className="item2">
              <Button variant="primary" className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                  <span className="s-btn-copy" onClick={updateProfile}>Update</span>
              </Button>
              <Button variant="secondary" onClick={handleClose} className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                  <span className="s-btn-copy">Close</span>
              </Button>
              </Modal.Footer>
          </Modal>
      </header>
    </div>
      <section className='rest_section'> 
          <Row>
            <Col lg='6' className='d-flex justify-content-end  mt-5 m-auto'>
              <img src={restaurantImage} alt='restaurant-image' className='rest_img' />
            </Col>
            <Col lg='6' className='rest_name d-flex flex-column align-items-start justify-content-start  mt-5 m-auto'>
              <h1>{restaurantName}</h1>
              <h5>{cuisine}</h5>
            </Col>
          </Row>

        {sections && sections.map((section) => {
          if(section.restaurantID.restaurantID == restaurantID) {
            return (
              <Row key={section.sectionID}>          
                <Col lg='12' className='section_name d-flex justify-content-center  mt-5 m-auto'>
                  <h1>{section.sectionName}</h1>
                </Col>  
                
                {sectionItems && sectionItems.map((item) => {
                  if(item.restaurantID.restaurantID == restaurantID) {
                    if(item.sectionID.sectionID == section.sectionID) {
                      return (
                        <Col lg='3' md='4' sm='6' xs='6' key={item.itemID} className='mt-5'>
                          <div className='product__item' onClick={()=> {
                              //console.log(item.itemID)
                          }}>
                              <div className='product__img d-flex align-items-center justify-content-center'>
                                  <img src={item.itemImage} alt="product-img" className='w-50 h-50'/>
                              </div>
                  
                              <div className='product__content'>
                                  <h5 className='d-flex align-items-center justify-content-center'>{item.itemName}</h5>
                                  <div className='price__cart d-flex justify-content-between align-items-center '>
                                      <p className='product__price'>${item.itemPrice}</p>
                                      <button onClick={()=> addToCart(item)} className='addToCart__btn'>Add to Cart</button>
                                  </div>
                              </div>
                          </div>
                        </Col>
                      )
                    }
                  }
                  }  
                )}
              </Row>
            )
          }
          })
        }
      </section>
    </div>
  )
}

export default ViewRestaurant