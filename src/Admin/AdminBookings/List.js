import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { getBookingAdminApi } from "../../Services/allApi";
import { Container } from "react-bootstrap";
import axios from "axios";
import baseurl from "../../Services/baseurl";
import Swal from "sweetalert2";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function List({ search }) {
  const [bookingList, setBookingList] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getBookings = async () => {
    try {
      const result = await getBookingAdminApi();
      setBookingList(result?.data?.acceptedBookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleResponse = async (item) => {
    try {
      const id = { id: item };
      const response = await axios.post(
        `${baseurl}/maternalcare/admin/primarybooking/accept`,
        id
      );
      if (response.status >= 200 && response.status <= 300) {
        Swal.fire({
          title: "Approved",
          text: "Booking Approved Succesfuly",
          icon: "success",
        });
        console.log(response);
        getBookings();
      }
    } catch (error) {
      Swal.fire({
        title: "Not Approved",
        text: "Booking Not Approved",
        icon: "warning",
      });
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="scroll2">
        <Table
          striped
          hover
          className="ms-5"
          style={{ width: "90%", border: "3px #9C6644 solid" }}
        >
          <thead>
            <tr className="text-center">
              <th>
                <h5>Sl.No</h5>
              </th>
              <th>
                <h5>User Name</h5>
              </th>
              <th>
                <h5>Service Provider</h5>
              </th>
              <th>
                <h5>Start Date</h5>
              </th>
              <th>
                <h5>End Date</h5>
              </th>
              <th>
                <h5>Action</h5>
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {bookingList
              .filter((item) =>
                search ? item.service.toLowerCase().includes(search.toLowerCase()) : true
              )
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.userName}</td>
                  <td>{item.service}</td>
                  <td>{formatDate(item.startDate)}</td>
                  <td>{formatDate(item.endDate)}</td>
                  <td>
                    <div className="ms-5">
                      <Stack direction="row" spacing={2}>
                        {item?.adminStatus === "approved" ? (
                          <h6 className="text-success">Approved</h6>
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleResponse(item?._id)}
                          >
                            Confirm
                          </Button>
                        )}
                      </Stack>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Stack spacing={2} className="text-center mt-3">
          <Pagination
            count={Math.ceil(bookingList.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            style={{ color: "#B08968" }}
          />
        </Stack>
      </div>
    </Container>
  );
}

export default List;
