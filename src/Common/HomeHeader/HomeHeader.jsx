import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Avatar } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import logo from '../../Images/Logo.png'
function HomeHeader() {
    const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/admin-login");
  };

  const handleUser = () => {
    navigate("/user-login");
  };
  return (
    <>
     <Navbar expand="lg" style={{ height: "70px", width: "100%" }}>
        <Container className="header">
        <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top "
            />{' '}
            <span style={{ fontWeight: 'bold' }}>LiveCare</span>
          </Navbar.Brand>
          {/* <Navbar.Brand className="fw-bolder">LiveCare</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Dropdown className="ms-auto">
            <Dropdown.Toggle variant="link" id="dropdown-basic">
              <Avatar
                alt="Remy Sharp"
                src="https://cdn-icons-png.flaticon.com/512/5509/5509584.png"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link
                to="/user-login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Dropdown.Item as="span">
                  <span
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={handleUser}
                  >
                    User
                  </span>
                </Dropdown.Item>
              </Link>
              <Link
                to="/admin-login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Dropdown.Item as="span">
                  <span
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={handleAdmin}
                  >
                    Admin
                  </span>
                </Dropdown.Item>
              </Link>
              
                <Dropdown.Item as="span">
                  <span
                    style={{ textDecoration: "none", color: "black" }}
                    
                  >
                    <Link to={'/service-login'} style={{color:'black'}}>Service Provider</Link>
                  </span>
                </Dropdown.Item>
              
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </>
  )
}

export default HomeHeader