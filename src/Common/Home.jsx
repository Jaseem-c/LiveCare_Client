import React from "react";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import './home.css'
import Footer from "./Footer/Footer";
import HomeHeader from "./HomeHeader/HomeHeader";

function Header() {
 

  return (
    <>
     <HomeHeader/>
      {/* hero */}
      <div className="chome d-flex justify-content-center align-items-center">
       
          {/* <Row>
            <Col md={12} className="text-light d-flex justify-content-center align-items-center flex-column">
              <h1 className="mt-5 text-dark">
                Expert care for the Elderly
              </h1>
              <div className="mt-2 ">
                <h6 className="text-secondary">
                Comprehensive digital platform connecting seniors with personalized care and support services.
                </h6>
              </div>
              <button className="btn btn-primary ms-5 mt-3">
                GET IN TOUCH
              </button>
            </Col>
            <Col md={6}></Col>
          </Row>
        */}
      </div>
      {/* about us */}
      <div className="d-flex justify-content-center align-items-center my-5">
        <Container>
          <h1 className="text-dark text-center mb-5">ABOUT US</h1>
          <Row>
            <Col md={6} >
              <img
                style={{ width: "100%", height: "400px" }}
                src="https://papayacare.com/wp-content/uploads/2023/09/Caring-for-the-Elderly-6-Things-to-Remember.jpg"
                alt=""
                className="rounded"
              />
            </Col>
            <Col
              md={6}
             className="p-5"
            >
              <p style={{textAlign:"justify"}} className="text-dark">
              <span style={{ fontWeight: 'bold' }}>LiveCare</span> is a comprehensive digital platform that connects seniors with professional service providers, offering personalized care services such as therapy, medical consultations, and in-home assistance. It includes three key modules: Applicants can easily browse and book services, Admins manage approvals, payments, and platform operations, while Workers, like caretakers and doctors, deliver specialized support. With its user-friendly interface, LIVE CARE ensures seamless access to tailored care, empowering seniors to manage their health and well-being, while fostering trust and improving quality of life for both seniors and their families.
              </p>
              <button className="btn btn-primary  mt-3">
                GET IN TOUCH
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="services my-5 ">
        <Container>
          <h1 className="mt-3 text-center text-dark mb-5">SERVICES</h1>

          <Row>
            <Col md={4}>
              <div className="therapy Card shadow flex-column rounded">
                <h3 className="mt-3">Therapy</h3>
                <i class="fa-solid fa-person-cane fa-2x mb-3"></i>
              </div>
            </Col>
            <Col md={4}>
              <div className="Card shadow therapy ms-5 flex-column rounded">
                <h3>One day Checkup</h3>
                <i class="fa-solid fa-calendar-day fa-2x mt-1"></i>
              </div>
            </Col>
            <Col md={4}>
              <div className="Card shadow therapy ms-5 flex-column rounded">
                <h3>Virtual Assistance</h3>
                <i class="fa-solid fa-user-doctor fa-2x"></i>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <div className="therapy Card shadow flex-column rounded">
                <h3 className="mt-3">Day Care</h3>
                <i class="fas fa-home fa-2x"></i>
              </div>
            </Col>
            <Col md={4}>
              <div className="Card shadow therapy ms-5 flex-column rounded">
                <h3>Appoinments</h3>
                <i class="fa-regular fa-calendar-check fa-2x"></i>
              </div>
            </Col>
            <Col md={4}>
              <div className="Card shadow therapy ms-5 flex-column rounded">
                <h3>Ambulance</h3>
                <i class="fa-solid fa-truck-medical fa-2x"></i>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <div className="therapy Card shadow flex-column rounded">
                <h3 className="mt-3">Night Care</h3>
                <i class="fas fa-bed fa-2x"></i>
              </div>
            </Col>
            <Col md={4}>
              <div className="Card shadow therapy ms-5 flex-column rounded">
                <h3>Emergency</h3>
                <i class="fas fa-exclamation-triangle fa-2x"></i>
              </div>
            </Col>
            <Col md={4}>
              <div className="Card shadow therapy ms-5 flex-column rounded">
                <h3>Treatment</h3>
                <i class="fas fa-medkit fa-2x"></i>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
{/* contact us */}
      <div className="container-fluid p-0">
      <h1 className="text-dark text-center my-5">CONTACT US</h1>
       <Container>
          <Row className="g-0 my-5">
            <Col xs={12} md={6} lg={6} className="p-3 p-md-5">
          <h2>Get In Touch</h2>
          <input type="text" name="" id="" placeholder='name' className='form-control bg-body-tertiary rounded mt-4' />
          <input type="text" name="" id="" placeholder='email' className='form-control bg-body-tertiary rounded mt-3' />
          <textarea name="" id="" placeholder='message' className='form-control bg-body-tertiary rounded mt-3'></textarea>
          <button className='btn btn-primary rounded-5 px-5 py-2 text-light mt-3 ' >Send Message</button>
            </Col>
            <Col xs={12} md={6} lg={6} className="p-5">
              <img src="https://www.indiaisus.com/images/uploadedimages/thumbs/0000161_elderly-care.jpeg" alt="" width="100%" height="300px" />
            </Col>
          </Row>
       </Container>
      </div>

      {/* footer */}
      <Footer/>

     
    </>
  );
}

export default Header;
