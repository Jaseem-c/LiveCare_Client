import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Avatar } from "@mui/material";
import "./Headre.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ChatBox from "../Chat/ChatBox";
import logo from '../../Images/Logo.png'

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    Swal.fire({
      title: "Logged out",
      icon: "success",
    });
  };

  return (
    <>
      <Navbar expand="lg" style={{ height: "70px" }}>
        <Container className="header">
          <Link to={"/user-home"}>
            {" "}
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
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Dropdown className="ms-auto">
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                <Avatar
                  alt="Remy Sharp"
                  src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to="/user-home"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Home
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to="/user-profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to="/user-bookings"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  My Bookings
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to="/user-webinar"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Webinar
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to="/user-search"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Search Service provider
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to="/user-transaction"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Transaction History
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to="/user-emergency"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Emergency contact
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
