import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeaderSP from "../Navbar/HeaderSP";
import { getAllRejectedBookings } from "../../Services/allApi";

function RejectedBookings() {
  const [rejected, setRejected] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getRejectedBookings = async () => {
    const result = await getAllRejectedBookings();
    setRejected(
      result.data.rejectedBookings.map((booking) => ({
        ...booking,
        startDate: formatDate(booking.startDate),
        endDate: formatDate(booking.endDate),
      }))
    );
  };

  useEffect(() => {
    getRejectedBookings();
  }, []);

  return (
    <div>
      <HeaderSP />
      <Container className="mt-5">
        <h1 className="text-center text-primary">Rejected Bookings</h1>
        <div className="row">
          {rejected?.length > 0 ? (
            rejected.map((item) => (
              <div className="col-lg-4 col-md-12">
                <div
                  className="card2  mt-5 text-center shadow  "
                  style={{ width: "", backgroundColor: "" }}
                  key={item.id}
                >
                  <ul className="list-group list-group-light list-group-small">
                    <li className="list-group-item px-3">
                      Username: {item.userName.toUpperCase()}
                    </li>
                    <li className="list-group-item px-3">
                      Service Provider Name : {item.serviceProviderName}
                    </li>
                    <li className="list-group-item px-3">
                      Service : {item.services}
                    </li>
                    <li className="list-group-item px-3">
                      Type of Care : {item.typeOfCare}
                    </li>
                    <li className="list-group-item px-3">
                      Start Date : {item.startDate}
                    </li>
                    <li className="list-group-item px-3">
                      End Date : {item.endDate}
                    </li>
                    <li className="list-group-item px-3">
                      Starting Time : {item.startingTime}
                    </li>
                    <li className="list-group-item px-3">
                      Ending Time : {item.endingTime}
                    </li>
                    <li className="list-group-item px-3">
                      Location : {item.location}
                    </li>
                    <li className="list-group-item px-3">Rate : {item.rate}</li>
                    <li className="list-group-item px-3 mb-2">
                      Service Provider Status : {item.serviceProviderStatus} ❌
                    </li>
                   
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center text-danger">
              No Rejected Bookings Available
            </h1>
          )}
        </div>
      </Container>
    </div>
  );
}

export default RejectedBookings;
