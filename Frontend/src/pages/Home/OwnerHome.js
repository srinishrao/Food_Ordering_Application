import React, {useRef, useState, useEffect} from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/OwnerHeader'
import PageTitle from '../../components/PageTitle'
import ProductCard from '../../components/ProductCard'
import axios from "axios";
import { Container, Row, Col } from 'reactstrap'
import { Modal, Button } from 'react-bootstrap';
import "../../styles/ownerhome.css"

const OwnerHome = () => {
  const sectionRef = useRef();

  const [section, setSection] = useState('ALL');
  const [sectionID, setSectionID] = useState(0)
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [sectionName, setSectionName] = useState('ALL');
  const [showSectionItems, setShowSectionItems] = useState(false);
  const [data, setData] = useState([])
  const [sectionItems, setSectionItems] = useState([])

  /*
  const firstName = sessionStorage.getItem('firstName')
  const lastName = sessionStorage.getItem('lastName')
  const email = sessionStorage.getItem('email')
  const phoneNumber = sessionStorage.getItem('phoneNumber')
  const restaurantName = sessionStorage.getItem('restaurantName')
  const cuisine = sessionStorage.getItem('cuisine')
  const profileImage = sessionStorage.getItem('profileImage')
  const restaurantImage = sessionStorage.getItem('restaurantImage')
  const restaurantID = sessionStorage.getItem('restaurantID')
  //console.log(firstName + ' ' + lastName + ' ' + email + ' ' + phoneNumber + ' ' + restaurantName + ' ' + cuisine  + ' ' + profileImage + ' ' + restaurantImage + ' ' + restaurantID)
*/

  const user = {
    "userID": sessionStorage.getItem('userID'),
    "firstName": sessionStorage.getItem('firstName'),
    "lastName": sessionStorage.getItem('lastName'),
    "email": sessionStorage.getItem('email'),
    "phoneNumber": sessionStorage.getItem('phoneNumber'),
    "restaurantName": sessionStorage.getItem('restaurantName'),
    "restaurantImage": sessionStorage.getItem('restaurantImage'),
    "profileImage": sessionStorage.getItem('profileImage'),
    "cuisine": sessionStorage.getItem('cuisine'),
    "restaurantID": sessionStorage.getItem('restaurantID'),
    "userType": sessionStorage.getItem('userType')
  }
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/users/sections")
          .then((response) => {
              setData(response.data)
          })
          .catch((err) => console.log(err));
  },[])

  const getAllItems = () => {
    if(sectionName === 'ALL') {
      axios.get("http://localhost:8080/api/users/section/items")
          .then((response) => {
            setSectionItems(response.data)
            //console.log(response.data)
          })
    }
  } 
  useEffect(() => {
    getAllItems()
  },[sectionName])

  const addSection = async (e) => {
    //e.preventDefault();
    setShow(true);
    const SectionName = sectionName;
    let addedSection = {}
    if(sectionName !== ''){
      addedSection = {
        "sectionName": SectionName,
        "restaurantID": user.restaurantID
      }
    }

    try {
      await axios.post("http://localhost:8080/api/users/sections/addSection", addedSection , {
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
          }
      }).then(async (response) => {
          //setShowSectionName(response.data.sectionName)
      })
    } catch (err) {
      console.log("Error on adding Section")
    }

    setShow(false);
    window.location.reload();
  }

  const handleClose = () => {
    setShow(false)
    setShowUpdate(false)
  }

  const getSectionItems = async (item) => {
    console.log(item.sectionID)
    setSection(item.sectionName)
    setShowSectionItems(true)
    setSectionID(item.sectionID)
    
    const sectionItems = {
      "sectionID": sectionID
    }
    
    try {
      await axios.get(`http://localhost:8080/api/users/section/${item.sectionID}`, sectionItems, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          }
      }).then(async (response) => {
          setSectionItems(response.data)
        }) 
    } catch (err) {
        console.log("Error on Getting section Items")
      }
  }

  const updateSection = async () => {
    setShowUpdate(true)
    let sectionUpdate = {}
    if(sectionName !== ''){
      sectionUpdate = {
        "sectionName": sectionName
      }
    }
    try {
      await axios.put(`http://localhost:8080/api/users/sections/${sectionID}`, sectionUpdate, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          }
      }).then(async (response) => {
          console.log(response.data)
        }) 
    } catch (err) {
        console.log("Error on Updating Section")
      }

    setShowUpdate(false)
    window.location.reload();
  }
  
  const deleteSection = () => {
    let sectionDelete = {
      "sectionID": sectionID
    }

    axios.delete(`http://localhost:8080/api/users/sections/${sectionID}`, sectionDelete, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    }).then((response) => {
        console.log(response.data);
      });
      window.location.reload();
  }

  return (
    <PageTitle title="Home">
          <Header user={user}/>

          <section>
            <Container>
              <Row>
                <Col lg='12' className='popular text-center'>
                  <h2>Popular Foods</h2>
                </Col>

                <Col lg='12'>
                  <div className='food__category d-flex align-items-center justify-content-center gap-4'>
                    <button className={`all__btn ${section === 'ALL' ? 'foodBtnActive' : ''}`}
                      onClick={()=>{
                        setSection('ALL');
                        setShowSectionItems(false)
                        getAllItems()
                      }}>All</button>

                    {data && data.map((item, key) => {
                      if(item.restaurantID.restaurantID == user.restaurantID){
                        return (
                          <button className={`d-flex align-items-center gap-2 ${section === item.sectionName ? 'foodBtnActive' : ''}`} 
                          key={key} onClick={() => getSectionItems(item)}>{item.sectionName}</button>
                        )
                      }
                    })}
                  
                    <button className={`d-flex align-items-center gap-2 ${'add__section'}` }
                    onClick={()=>setShow(true)}>Add Section</button>
                  </div>
                </Col>
                <Col lg='12'>
                    <div className={'d-flex align-items-center justify-content-end gap-4'}>
                        <button className={`${showSectionItems ? 'update__button' : 'alter__buttons'}`}
                          onClick={()=>setShowUpdate(true)}>Update Section</button>
                        <button className={`${showSectionItems ? 'delete__button' : 'alter__buttons'}`}
                          onClick={deleteSection}>Delete Section</button>
                    </div>
                </Col>
                                  
                {sectionItems && sectionItems.map((item) => {
                  if(item.restaurantID.restaurantID == user.restaurantID){
                    return (
                      <Col lg='3' md='4' sm='6' xs='6' key={item.itemID} className='mt-5'>
                        <ProductCard item={item} />
                      </Col>
                    )
                  }  
                })}
                
              </Row>
              <Modal className="setModal143" show={show} onHide={handleClose} centered={show}>
                <Modal.Header className="item2">
                  <Modal.Title >Add Section</Modal.Title>
                </Modal.Header>
                <Modal.Body className="item3">
                  <div className="form-group">
                    Section Name <input type="text" id="sectionName" className="form-control" 
                    onChange={(e) => setSectionName(e.target.value)} ref={sectionRef} required />
                  </div>
                </Modal.Body>
                <Modal.Footer className="item2">
                  <Button variant="primary" className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                    <span className="s-btn-copy" onClick={addSection}>Save</span>
                  </Button>
                  <Button variant="secondary" onClick={handleClose} className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                    <span className="s-btn-copy">Close</span>
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal className="setModal143" show={showUpdate} onHide={handleClose} centered={showUpdate}>
                <Modal.Header className="item2">
                  <Modal.Title >Update Section</Modal.Title>
                </Modal.Header>
                <Modal.Body className="item3">
                  <div className="form-group">
                    Section Name <input type="text" id="sectionName" className="form-control" 
                    onChange={(e) => setSectionName(e.target.value)} ref={sectionRef} required />
                  </div>
                </Modal.Body>
                <Modal.Footer className="item2">
                  <Button variant="primary" className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                    <span className="s-btn-copy" onClick={updateSection}>Save</span>
                  </Button>
                  <Button variant="secondary" onClick={handleClose} className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                    <span className="s-btn-copy">Close</span>
                  </Button>
                </Modal.Footer>
              </Modal>
            </Container>
          </section>

          <Footer />
    </PageTitle>
  )
}

export default OwnerHome