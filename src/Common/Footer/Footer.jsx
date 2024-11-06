import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
  return (
    <>
     <div style={{width:'100%',height:'40vh',backgroundColor:'whitesmoke'}} className='mt-5'>
        <Container className='pt-5'>
            <Row className='ms-5'>
                <Col md={4}>
                    <h3>Services</h3>
                    <p>Therapy</p>
                    <p>Day care</p>
                    <p>Virtual Assistance</p>
                    <p>Ambulance</p>
                </Col>
                <Col md={4}>
                    <h3>Contact</h3>
                    <p><i className="fa fa-map-marker-alt mr-2"></i> 123 Street, New York, USA</p>
                            <p><i className="fa fa-phone-alt mr-2"></i> +012 345 67890</p>
                            <p><i className="fa fa-envelope mr-2"></i> info@example.com</p>
                            <div className="d-flex justify-content-start mt-4">
                                <a className="btn btn-outline-light btn-social mr-2" href="#"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-light btn-social mr-2 ms-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-light btn-social mr-2 ms-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-outline-light btn-social ms-2" href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                </Col>
                <Col md={4}>
                    <h3>News Teller</h3>
                    <div className='d-flex'>
                        <input type="text" className='form-control mt-3 w-75' placeholder='email'/>
                        <button className='btn btn-warning w-50 ms-3'>Submit</button>
                    </div>
                </Col>
            </Row>
        </Container>
    </div> 
    </>
  )
}

export default Footer
