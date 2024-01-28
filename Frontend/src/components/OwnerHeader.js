import React, {useState, useRef, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap';
import logo from '../images/grubhub-logo.png'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import '../styles/header.css'

const Header = (props) => {
    const itemRef = useRef();

    const [displayed, setDisplay] = useState(false)
    const [show, setShow] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    
    const [sectionName, setSectionName] = useState('')
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemImage, setItemImage] = useState('');

    const userID = props.user.userID;
    const useremail = props.user.email;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantImage, setRestaurantImage] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/useremail/${useremail}`)
        .then((response) => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
            setPhoneNumber(response.data.phoneNumber)
            setProfileImage(response.data.profileImage)
            setRestaurantName(response.data.restaurantName)
            //setRestaurantImage(response.data.restaurantID.restaurantID.restaurantImage)
            //setCuisine(response.data.restaurantID.restaurantID.cuisine)
        })
        .then(() => {
            
        })
    }, [])
    
    const navigate = useNavigate();

    const displayUser = () => {
        setDisplay(current => !current)
    }
    const signOut = () => {
        navigate('/Ownerlogin')
    }

    const addItem = async (e) => {
        e.preventDefault();
        const addedItem = {
            "itemName": itemName,
            "itemDescription": itemDescription,
            "itemPrice": itemPrice,
            "itemImage": itemImage,
            "sectionName": sectionName,
            "restaurantID": props.user.restaurantID
        }
        
        try {
          await axios.post("http://localhost:8080/api/users/section/item/addItem", addedItem , {
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:3000',
              }
          }).then(async (response) => {
              console.log(response.data)
          })
        } catch (err) {
          console.log("Error on adding Item")
        }
    
        setShow(false);
        window.location.reload();
    }

    const updateProfile = async (e) => {
        e.preventDefault();

        const user = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phoneNumber": phoneNumber,
            "restaurantName": restaurantName,
            "restaurantImage": restaurantImage,
            "profileImage": profileImage,
            "cuisine": cuisine
        }

        try {
            await axios.put(`http://localhost:8080/api/users/ownerProfile/${userID}`, user , {
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
        setShow(false)
        setShowProfile(false)
    }

  return (
    <header className='header d-flex align-items-center justify-content-between'>
        <div className='logo'>
            <img src={logo} alt="logo" />
        </div>
    
        <div className='menu d-flex align-items-center justify-content-between gap-5' >
            <button className='header__button' onClick={()=>setShow(true)}>Add Item</button>
            <a href='/Orders'>Orders</a>
        </div>

        <div className='nav_right d-flex align-items-center gap-4'>
            <span className='user' onClick={displayUser}>
                <i className="ri-user-3-line"></i>           
            </span>
        </div>
        
        <div className={displayed ? "user_info" : "user_none" }> 
            <p className='user_name'>Hi, {firstName}</p>
            <p className='user_profile' onClick={() => setShowProfile(true)}>Your Profile</p>
            <p className='sign_out' onClick={signOut}>Sign out</p>
        </div>
    
        <Modal className="setModal143" show={show} onHide={handleClose} centered={show}>
            <Modal.Header className="item2">
            <Modal.Title >Add Item</Modal.Title>
            </Modal.Header>
            <Modal.Body className="item3">
            <div className="form-group">
                Item Name <input type="text" id="sectionName" className="form-control" 
                onChange={(e) => setItemName(e.target.value)}  ref={itemRef} required />
            
                Item Description <input type="text" id="itemDescription" className="form-control" 
                onChange={(e) => setItemDescription(e.target.value)}  ref={itemRef} required />
            
                Item Price <input type="text" id="itemPrice" className="form-control" 
                onChange={(e) => setItemPrice(e.target.value)}  ref={itemRef} required />
            
                Item Image <input type="text" id="itemImage" className="form-control" 
                onChange={(e) => setItemImage(e.target.value)}  ref={itemRef} required />
            
                Section Name <input type="text" id="sectionName" className="form-control" 
                onChange={(e) => setSectionName(e.target.value)}  ref={itemRef} required />
            </div>
            </Modal.Body>
            <Modal.Footer className="item2">
            <Button variant="primary" className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                <span className="s-btn-copy" onClick={addItem}>Save</span>
            </Button>
            <Button variant="secondary" onClick={handleClose} className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                <span className="s-btn-copy">Close</span>
            </Button>
            </Modal.Footer>
        </Modal>

        <Modal className="profileContainer modal-lg" show={showProfile} onHide={handleClose} centered={showProfile}>
            <Modal.Header className="item2">
            <Modal.Title >Your Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className=" d-flex justify-content-between">
            <div>
                <div className='profile__image'>
                    Restaurant Image <input type="url" id="restaurantImage" className="form-control" 
                    onChange={(e) => setRestaurantImage(e.target.value)}  placeholder={restaurantImage} />

                    <img src={restaurantImage} alt="No RestaurantPicture" className='profile__images'></img>
                </div>
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
            
                Restaurant Name <input type="text" id="restaurantName" className="form-control" 
                onChange={(e) => setRestaurantName(e.target.value)}  placeholder={restaurantName} />

                Cuisine <input type="text" id="cuisine" className="form-control" 
                onChange={(e) => setCuisine(e.target.value)}  placeholder={cuisine} />
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
  )
}

export default Header

