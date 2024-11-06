import React, { useState } from "react";
import "./payment.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import axios from "axios";
import baseurl from "../../Services/baseurl";

function Payment({ item }) {
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(item.amountPaid);
  const [idd, setId] = useState({ id: item._id });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = sessionStorage.getItem("token");
  const handleCardNumberChange = (event) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (input.length <= 16) {
      // Limit to 16 characters
      setCardNumber(input);
    }
  };

  const handleExpiryChange = (event) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (input.length <= 4) {
      // Limit to 4 characters (MMYY format)
      setExpiry(input);
    }
  };

  const handleCvvChange = (event) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (input.length <= 3) {
      // Limit to 3 characters
      setCvv(input);
    }
  };

  const handleHolderNameChange = (event) => {
    const input = event.target.value;
    // Check if the input contains any invalid characters
    const isValidName = /^[a-zA-Z\s]*$/.test(input);
    if (!isValidName) {
      alert("Please enter a valid name containing only letters and spaces.");
      return;
    }
    setHolderName(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validations
    if (!cardNumber || !holderName || !expiry || !cvv) {
      Swal.fire({
        title: "Please fill in all fields.",
        icon: "warning",
      });
      return;
    }

    // Validate card number format (16 digits)
    if (cardNumber.length !== 16) {
      Swal.fire({
        title: "Please enter a valid 16-digit card number.",
        icon: "warning",
      });
      return;
    } else {
      try {
        const response = await axios.post(
          `${baseurl}/maternalcare/primarybooking/user/payment/view`,
          idd,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (response.status >= 200 && response.status <= 300) {
          console.log(response);
          Swal.fire({
            title: "Payment Complete",
            icon: "success",
          });
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Complete Payment
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="visa-card">
              <div className="logoContainer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="23"
                  height="23"
                  viewBox="0 0 48 48"
                  className="svgLogo"
                >
                  <path
                    fill="#ff9800"
                    d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                  ></path>
                  <path
                    fill="#d50000"
                    d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                  ></path>
                  <path
                    fill="#ff3d00"
                    d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                  ></path>
                </svg>
              </div>
              <div className="number-container">
                <label className="input-label" htmlFor="cardNumber">
                  CARD NUMBER
                </label>
                <input
                  className="inputstyle"
                  id="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  name="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </div>

              <div className="name-date-cvv-container">
                <div className="name-wrapper">
                  <label className="input-label" htmlFor="holderName">
                    CARD HOLDER
                  </label>
                  <input
                    className="inputstyle"
                    id="holderName"
                    placeholder="NAME"
                    type="text"
                    value={holderName}
                    onChange={handleHolderNameChange}
                  />
                </div>

                <div className="expiry-wrapper">
                  <label className="input-label" htmlFor="expiry">
                    VALID THRU
                  </label>
                  <input
                    className="inputstyle"
                    id="expiry"
                    placeholder="YYYY"
                    type="text"
                    value={expiry}
                    onChange={handleExpiryChange}
                  />
                </div>
                <div className="cvv-wrapper">
                  <label className="input-label" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    className="inputstyle"
                    placeholder="***"
                    maxLength="3"
                    id="cvv"
                    type="password"
                    value={cvv}
                    onChange={handleCvvChange}
                  />
                </div>
              </div>
            </div>
            <h3 className="ms-5 px-5 mt-3">Total Amount : {total}&#8377;</h3>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="btn w-75 me-5"
            onClick={handleSubmit}
          >
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Payment;
