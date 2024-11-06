import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import baseurl from "../../Services/baseurl";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Pagination, Stack } from "@mui/material";

function Emergency() {
  const [emergency, setEmergency] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    getEmergency();
  }, [page]);

  const getEmergency = async () => {
    try {
      const result = await axios.get(`${baseurl}/emergency/allEmergency`);
      setEmergency(result.data.getAllEmergency);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="lg-col-12 mt-5">
          <MDBTable hover>
            <MDBTableHead>
              <tr className="text-danger">
                <th className="text-danger" scope="col">
                  <h4>S.No</h4>
                </th>
                <th className="text-danger" scope="col">
                  <h4>Emergency</h4>
                </th>
                <th className="text-danger" scope="col">
                  <h4>Location</h4>
                </th>
                <th className="text-danger" scope="col">
                  <h4>Phone</h4>
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {emergency.length > 0 ? (
                emergency.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((i, index) => (
                  <tr key={index}>
                    <th scope="row">{(page - 1) * itemsPerPage + index + 1}</th>
                    <td>{i?.emergency_support}</td>
                    <td>{i?.location}</td>
                    <td>{i?.phonenumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-danger">
                    No Emergency Support Provided
                  </td>
                </tr>
              )}
            </MDBTableBody>
          </MDBTable>
          <div className="pagination">
            <Stack spacing={2} className="text-center mt-3">
              <Pagination
                count={Math.ceil(emergency.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                style={{ color: "#B08968" }}
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}

export default Emergency;
