import React from "react";
import Header from "../Header/Header";
import "./userhome.css";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../Common/Footer/Footer";
import Blog from "../Blog/Blog";
import ChatBox from "../Chat/ChatBox";

function UserHome() {
  return (
    <>
      <Header />
      <ChatBox/>
      <div className="home d-flex justify-content-center align-items-center">
        <Container fluid>
          <Row>
            <Col md={6}>
              <h1 className="ms-5 text-light">
                Expert care for the <br /> Elderly
              </h1>
              <div className="mt-2 ms-5">
                <h6 className="text-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto sunt alias earum fugit molestiae minus odit
                  quibusdam{" "}
                </h6>
              </div>
              <button className="btn btn-primary ms-5 mt-3">
                GET IN TOUCH
              </button>
              
            </Col>
            <Col md={6}></Col>
          </Row>
        </Container>
      </div>

      <div className="services my-5">
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
      <Blog/>
      <Footer/>
    </>
  );
}

export default UserHome;
