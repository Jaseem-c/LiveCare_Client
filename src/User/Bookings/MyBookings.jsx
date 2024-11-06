import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Container, Col, Row } from "react-bootstrap";
import "./mybookings.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Payment from "./Payment";
import Swal from "sweetalert2";
import { getUnpaidbillsApi } from "../../Services/allApi";
import axios from "axios";
import baseurl from "../../Services/baseurl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MyBookings() {
  const [total, setTotal] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = (item, amount) => {
    const id = { id: item };
    setTotal(amount);

    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const token = sessionStorage.getItem("token");
  const [unpaid, setUnpaid] = useState([]);

  const getUnpaidbills = async () => {
    try {
      // Add authorization header
      const result = await axios.get(
        `${baseurl}/maternalcare/primarybooking/billunpaid/view`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(result.data);
      setUnpaid(result?.data?.bill);
    } catch (error) {
      console.error("Error fetching unpaid bills:", error);
    }
  };

  useEffect(() => {
    getUnpaidbills();
  }, []);
  return (
    <>
      <Header />
      <Container style={{ marginTop: "50px" }}>
        <Row>
          <h1 className="text-center mb-5">Booking Details</h1>
          {unpaid.length > 0
            ? unpaid.map((i) => (
                <Col
                  md={4}
                  className=""
                  style={{ width: "400px", height: "400px" }}
                >
                  <div
                    style={{ height: "380px" }}
                    className="div2 text-center mb-5 "
                  >
                    <div className="mt-5 text-light p-2">
                      <p>Name : {i?.userName.toUpperCase()}</p>
                      <p>Working Hours : {i?.workinghours}</p>
                      <p>Start Date : {i?.startDate}</p>
                      <p>Starting Time : {i?.startingTime.slice(0, 6)}</p>
                      <p>Rate : {i?.rate}</p>
                      <p>Total : {i?.amountPaid}</p>
                      <p>Action : Approved</p>
                      <Payment item={i} />
                    </div>
                  </div>
                </Col>
              ))
            : null}
        </Row>
      </Container>
    </>
  );
}

export default MyBookings;
