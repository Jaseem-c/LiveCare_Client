import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Avatar } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link,  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function HeaderSP() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
    Swal.fire({
      title: 'Logged out',
      icon: 'success',
    });
  };
  
  return (
    <div>
      <Navbar expand="lg" style={{ height: '70px' }}>
        <Container className='header'>
          <Navbar.Brand className='fw-bolder'>LiveCare</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Dropdown className='ms-auto'>
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                <Avatar
                  alt="Remy Sharp"
                  src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/service-dash' style={{ textDecoration: 'none', color: 'black' }}>Dashboard</Dropdown.Item>
                <Dropdown.Item as={Link} to='/serivce-profilee' style={{ textDecoration: 'none', color: 'black' }}>Profile</Dropdown.Item>
                <Dropdown.Item as={Link} to='/all-bookings' style={{ textDecoration: 'none', color: 'black' }}>Bookings</Dropdown.Item>
               <Dropdown.Item as={Link} to='/service-bookings' style={{ textDecoration: 'none', color: 'black' }}>Accepted Bookings</Dropdown.Item>
                <Dropdown.Item as={Link} to='/service-attendence' style={{ textDecoration: 'none', color: 'black' }}>Attendence</Dropdown.Item>
                <Dropdown.Item as={Link} to='/service-leave' style={{ textDecoration: 'none', color: 'black' }}>Leave</Dropdown.Item> 
                <Dropdown.Item as={Link} to='/service-rejectedbookings' style={{ textDecoration: 'none', color: 'black' }}>RejectedBookings</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default HeaderSP
