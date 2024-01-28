import React, {useState, useRef} from 'react'
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import "../styles/productCard.css"


const ProductCard = (props) => {
    const itemRef = useRef();
    //console.log(props.itemID)
    //const {itemID, itemName ,itemImage, itemPrice} = props.item;
    const [show, setShow] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemImage, setItemImage] = useState('');

    const updateItem = async () => {
        console.log(props.item.itemID);
        const itemUpdate = {
            "itemName": itemName,
            "itemPrice": itemPrice,
            "itemImage": itemImage
        }
        try {
            await axios.put(`http://localhost:8080/api/users/section/item/${props.item.itemID}`, itemUpdate, {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:3000',
                }
            }).then(async (response) => {
                console.log(response.data)
              }) 
        } catch (err) {
            console.log("Error on Updating Item")
        }
        setShow(false)
        window.location.reload();
    }
   
    const deleteItem = async () => {
        const itemDelete = {
            "itemID": props.item.itemID
        }
        try {
            await axios.delete(`http://localhost:8080/api/users/section/item/${props.item.itemID}`, itemDelete, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                }
            }).then((response) => {
                console.log(response.data);
            })
        } catch (err) {
            console.log("Error on Updating Item")
        }
        window.location.reload();
    }

    const handleClose = () => {
        setShow(false)
    }
        
  return (
    <div>
        <div className='product__item' onClick={()=> {
            setShow(true);
            console.log(props.item.itemID)
        }}>
            <div className='product__img d-flex align-items-center justify-content-center'>
                <img src={props.item.itemImage} alt="product-img" className='w-50 h-50'/>
            </div>

            <div className='product__content'>
                <div>
                    <h5 className='d-flex align-items-center justify-content-center'>{props.item.itemName}</h5>
                    <div className='price__cart d-flex justify-content-between align-items-center '>
                        <p className='product__price'>${props.item.itemPrice}</p>
                    </div>
                </div>
            </div>
        </div>

        <Modal className="setModal143" show={show} onHide={handleClose} centered={show}>
            <Modal.Header className="item2">
            <Modal.Title className='update_button'>Update Item</Modal.Title>
            </Modal.Header>
            <Modal.Body className="item3" >
            <div className="form-group" >
                Item Name <input type="text" id="sectionName" className="form-control" 
                onChange={(e) => setItemName(e.target.value)}  ref={itemRef} required />
            
                Item Price <input type="text" id="itemPrice" className="form-control" 
                onChange={(e) => setItemPrice(e.target.value)}  ref={itemRef} required />
            
                Item Image <input type="text" id="itemImage" className="form-control" 
                onChange={(e) => setItemImage(e.target.value)}  ref={itemRef} required />

            </div>
            </Modal.Body>
            <Modal.Footer className="item2">
            <Button variant="primary" className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                <span className="s-btn-copy" onClick={updateItem}>Save</span>
            </Button>
            <Button variant="secondary" onClick={handleClose} className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                <span className="s-btn-copy">Close</span>
            </Button>
            </Modal.Footer>
            <Modal.Header className='delete_button' onClick={deleteItem}>Delete Item</Modal.Header>
        </Modal>
    </div>
  )
}

export default ProductCard