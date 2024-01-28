import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import logo from '../images/grubhub-logo.png'

import "../styles/footer.css"

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row className='d-flex justify-content-between align-items-center'>
          <Col lg="3" md="4" sm="6" >
            <div className='logo footer__logo text-start'>
              <img src={logo} alt="logo" />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae
               neque illo delectus commodi magnam explicabo. 
              </p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className='footer__title'>Delivery Time</h5>
            <ListGroup className='delivery__time-list'>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Monday - Saturday</span>
                <p>11:00am - 10:00pm</p>
              </ListGroupItem>

              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Sunday</span>
                <p>Closed</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className='footer__title'>Contact</h5>
            <ListGroup className='delivery__time-list'>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <p>Location: 3456 Kett ct, Fairborn, Ohio, 45324</p>
              </ListGroupItem>

              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Phone: 1234567890</span>
              </ListGroupItem>

              <ListGroupItem className='delivery__time-item 
              border-0 ps-0'>
                <span>Email: srk@gmail.com</span>
              </ListGroupItem>
            </ListGroup>
          </Col>


        </Row>
      </Container>
    </footer>
  )
}

export default Footer