import React, { useState } from "react";
import "./mybookings.css";
import dayjs from "dayjs";
import Swal from "sweetalert2";

function BookSP() {
  const [booking, setBooking] = useState({
    typeOfCare: "",
    startingTime: "",
    endingTime: "",
    startDate: "",
    endDate: "",
    location: "",
  });
  const handleStartDateChange = (date) => {
    const formattedDate = dayjs(date).format("MM/DD/YYYY");
    setBooking({ ...booking, startDate: formattedDate });
  };
  const handleEndDateChange = (date) => {
    const formattedDate = dayjs(date).format("MM/DD/YYYY");
    setBooking({ ...booking, endDate: formattedDate });
  };

  const handleStartTimeChange = (time) => {
    if (time) {
      setBooking({ ...booking, startingTime: time });
    }
  };
  const handleEndTimeChange = (time) => {
    if (time) {
      setBooking({ ...booking, endingTime: time });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      typeOfCare,
      startingTime,
      endingTime,
      startDate,
      endDate,
      location,
    } = booking;

    if (
      !typeOfCare ||
      !startingTime ||
      !endingTime ||
      !startDate ||
      !endDate ||
      !location
    ) {
      Swal.fire({
        title: "Please fill the form",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Booking Completed",
        icon: "success",
      });

      setBooking({
        typeOfCare: "",
        startingTime: "",
        endingTime: "",
        startDate: "",
        endDate: "",
        location: "",
      });

      // Reset date input fields
      document.querySelectorAll(".date").forEach((input) => {
        input.value = "";
      });
    }
  };

  console.log(booking);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
      className="shadow1"
    >
      <div
        style={{
          width: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
        className="shadow p-3"
      >
        <form style={{ width: "300px" }}>
          <h4 className="mb-3 ms-4">Book Service Provider</h4>
          <div className="mb-3">
            <label htmlFor="">Type of care</label>
            <input
              type="text"
              className="form-control"
              value={booking.typeOfCare}
              onChange={(e) =>
                setBooking({ ...booking, typeOfCare: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">starting Time</label>
            <input
              type="time"
              className="form-control"
              value={booking.startingTime}
              onChange={(e) => handleStartTimeChange(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">ending Time</label>
            <input
              type="time"
              className="form-control"
              value={booking.endingTime}
              onChange={(e) => handleEndTimeChange(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">start Date</label>
            <input
              type="date"
              className="form-control date"
              onChange={(e) => handleStartDateChange(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">end Date</label>
            <input
              type="date"
              className="form-control date"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleEndDateChange(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Location</label>
            <input
              type="text"
              className="form-control"
              value={booking.location}
              onChange={(e) =>
                setBooking({ ...booking, location: e.target.value })
              }
            />
          </div>
          <div>
            <button
              className="btn btn-outline-primary ms-5 w-75 px-3"
              onClick={(e) => handleSubmit(e)}
            >
              BOOK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookSP;

