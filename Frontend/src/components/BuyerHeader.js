import React, {useState, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap';
import logo from '../images/grubhub-logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../styles/buyerhome.css'
import {ListGroupItem} from 'reactstrap'
import { Link } from 'react-router-dom'

const Header = (props) => {

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

  const [quantity, setQuantity] = useState(1)

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([])

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

  return (
    <div>
      <header className='header d-flex align-items-center justify-content-between'>
          <div className='logo'>
              <img src={logo} alt="logo"/>
          </div>
     
          <div className='search d-flex align-items-center justify-content-around'>     
              <input type="text" 
                  id="fsearch" 
                  name="fsearch"
                  value={searchText}
                  placeholder="Search for food...."
                  onChange={handleInputChange}
                  onKeyDown={props.displayRestaurants}
                  className='search_text'
              />
              { searchText.length == 0 ? 
              <span className='search_icon'><i className="ri-search-line"></i></span>
              : <span className='close_search' onClick={() => setSearchText('')}><i className="ri-close-line"></i></span> }
          </div>
  
          <div className='nav_right d-flex align-items-center gap-5'>
              <span onClick={showCart} className='cart__icon'>
                <i className="ri-shopping-basket-line"></i>
                <span className='cart__badge'>{0}</span>
              </span>
              <span className='user' onClick={displayUser}>
                  <i className="ri-user-3-line"></i>           
              </span>
          </div>
         
          <div className={show ? 'show_cart': 'no_cart'}>
            <span className='cart__close' onClick={() => setShow(false)}><i className="ri-close-line"></i></span>
            {cartItems && cartItems.map((item, key) => {
                return (
                    <ListGroupItem key={key} onClick={() => console.log(item)} className="border-0 cart__item">
                        <div className="cart__item-info d-flex gap-2">
                            <img src={item.itemImage} alt="product-img" />

                            <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
                            <div>
                                <h6 className="cart__product-title">{item.itemName}</h6>
                                <p className=" d-flex align-items-center gap-5 cart__product-price">
                                {quantity}x <span>${quantity * item.itemPrice}</span>
                                </p>
                                <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
                                <span className="increase__btn">
                                    <i className="ri-add-line"></i>
                                </span>
                                <span className="quantity">{quantity}</span>
                                <span className="decrease__btn" >
                                    <i className="ri-subtract-line"></i>
                                </span>
                                </div>
                            </div>

                            <span className="delete__btn" >
                                <i className="ri-delete-bin-line"></i>
                            </span>
                            </div>
                        </div>
                    </ListGroupItem>
                )
            })}
          </div>
          
          <div className={displayed ? "user_info" : "user_none" }> 
              <p className='user_name'>Hi, {firstName}</p>
              <p className='user_profile' onClick={() => setShowProfile(true)}>Your Profile</p>
              <p><Link to={`/Buyerorders`}  className='orders'>Orders</Link></p>
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
    )
}

export default Header