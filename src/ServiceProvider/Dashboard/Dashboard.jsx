import React from 'react';
import HeaderSP from '../Navbar/HeaderSP';
import Carousel from 'react-bootstrap/Carousel';
import './dashboard.css';

function Dashboard() {
  return (
    <>
      <HeaderSP />
   
        <Carousel>
          <Carousel.Item >
            <img
              className="d-block w-100 "
              src="https://www.silverts.com/givingcare/wp-content/uploads/2022/05/young-nurse-helping-old-elderly-disable-man.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://home-nursing.care/assets/images/elderly-care-jaipur-meta.webp"
              alt="Second slide"
            />
           
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://etimg.etb2bimg.com/photo/98376669.cms"
              alt="Second slide"
            />
           
          </Carousel.Item>
        </Carousel>
      
    </>
  );
}

export default Dashboard;
