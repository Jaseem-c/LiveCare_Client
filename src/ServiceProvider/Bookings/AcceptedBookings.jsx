import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllAcceptedBookings } from "../../Services/allApi";
import HeaderSP from "../Navbar/HeaderSP";

function AcceptedBookings() {
  const [accepted, setAccepted] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getAcceptedBookings = async () => {
    const result = await getAllAcceptedBookings();
    const formattedBookings = result.data.acceptedBookings.map((booking) => ({
      ...booking,
      startDate: formatDate(booking.startDate),
      endDate: formatDate(booking.endDate),
    }));
    setAccepted(formattedBookings);
  };

  useEffect(() => {
    getAcceptedBookings();
  }, []);
  console.log(accepted);

  return (
    <>
      <HeaderSP />
      <Container className="mt-5">
        <h1 className="text-center text-primary">Accepted Bookings</h1>
        <div className="row">
          {accepted?.length > 0 ? (
            accepted.map((item) => (
              <div className="col-lg-4">
                <div
                  className="card2  mt-5 text-center shadow p-2 "
                  style={{ width: "", backgroundColor: "" }}
                  key={item.id}
                >
                  <ul className="list-group list-group-light list-group-small">
                    <li className="list-group-item px-3">
                      Username : {item.userName}
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
                    <li className="list-group-item px-3">
                      Service Provider Status : {item.serviceProviderStatus} ✅
                    </li>
                    <li className="list-group-item px-3">
                      Admin Status :{" "}
                      {item?.adminStatus === "approved" ? "Accepted ✅" : "Decliend ❌"}
                    </li>
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center text-danger">
              No Accepted Booking Available
            </h1>
          )}
        </div>
      </Container>
    </>
  );
}

export default AcceptedBookings;
