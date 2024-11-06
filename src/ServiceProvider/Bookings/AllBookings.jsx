import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import baseurl from "../../Services/baseurl";
import {
  MDBCard,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardBody,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const token = sessionStorage.getItem("token");
  const [id, setId] = useState({ id: "" });

  const getBookings = async () => {
    try {
      const result = await axios.get(`${baseurl}/bookings/user-bookings`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (result.status >= 200 && result.status <= 300) {
        console.log(result?.data?.userBookings);
        setBookings(result?.data?.userBookings);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log("NoData");
    }
  };
  useEffect(() => {
    getBookings();
  }, []);

  const handleAccept = async (item) => {
    const email = { id: item };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve It",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${baseurl}/userBooking/serviceProvider/accept`,
            email
          );

          if (response?.status >= 200 && response?.status <= 300) {
            Swal.fire({
              title: "Approved",
              text: "Booking Approved",
              icon: "success",
            });
            getBookings();
          } else {
            Swal.fire({
              title: "Not Approved",
              text: "Booking Not Approved",
              icon: "warning",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Oops",
            text: "Something went Wrong",
            icon: "error",
          });
         
          console.error(error);
        }
      }
    });
  };

  const handleDelete = (item) => {
    // Create an object with email property
    const email = { id: item };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject IT ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setId({ id: item });
          console.log(id);
          const response = await axios.post(
            `${baseurl}/userBooking/serviceProvider/reject`,
            email
          );

          if (response?.status >= 200 && response?.status <= 300) {
            Swal.fire({
              title: "Rejected",
              text: "Booking Rejected",
              icon: "success",
            });
            getBookings();
            console.log(response);
          } else {
            Swal.fire({
              title: "Not Rejected",
              text: "Booking not Rejected",
              icon: "warning",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Oops",
            text: "Something went Wrong",
            icon: "error",
          });

          console.error(error);
        }
      }
    });
  };

  return (
    <div>
      <Container>
        <h1 className="text-center mt-5">Bookings</h1>
        <Row>
          {bookings.length > 0 ? (
            bookings.map((i) => (
              <Col lg={4} className="mb-2">
                {" "}
                <MDBCard>
                  <MDBCardHeader className="bg-balck">
                    <b>Name: </b>
                    {i?.userName.toUpperCase()}
                  </MDBCardHeader>
                  <MDBListGroup flush>
                    <MDBListGroupItem>
                      <b>Email: </b>
                      {i?.userEmail}
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <b>Care Type: </b>
                      {i?.typeOfCare}
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <b>Location: </b>
                      {i?.location}
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <b>Start Date: </b>
                      {i?.startDate.slice(0, 10)}
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <b>End Date: </b>
                      {i?.endDate.slice(0, 10)}
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <b>Start Time: </b>
                      {i?.startingTime}
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <b>End Time: </b>
                      {i?.endingTime}
                    </MDBListGroupItem>
                  </MDBListGroup>
                  <MDBCardBody>
                    {i?.serviceProviderStatus === "pending" ? (
                      <div
                        className="d-flex "
                        style={{ justifyContent: "space-between" }}
                      >
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(i?._id)}
                        >
                          Reject
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => handleAccept(i?._id)}
                        >
                          Accept
                        </button>
                      </div>
                    ) : (
                      <MDBListGroupItem>
                        <b>Waiting For Admin Confermation</b>
                      </MDBListGroupItem>
                    )}
                  </MDBCardBody>
                </MDBCard>
              </Col>
            ))
          ) : (
            <h2 className="text-center mt-5">No Bookings Found</h2>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default AllBookings;
