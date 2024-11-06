import { Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { getServiceProvidersApi } from "../../Services/allApi";
import axios from "axios";
import Swal from "sweetalert2";
import baseurl from "../../Services/baseurl";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

function ServiceApproval() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#B08968",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const [certificate, setCertificate] = useState("");
  const [staticModal, setStaticModal] = useState(false);

  const toggleOpen = (item) => {
    setCertificate(item);
    setStaticModal(!staticModal);
  };

  const [mail, setMail] = useState({
    email: "",
  });

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // state
  const [spList, setSpList] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const getServiceProviders = async () => {
    const result = await getServiceProvidersApi();
    setSpList(result?.data?.allServiceproviders);
  };

  useEffect(() => {
    getServiceProviders();
  }, []);

  const handleResponse = async (item) => {
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
            `${baseurl}/approve/serviceProvider`,
            item
          );

          if (response?.status >= 200 && response?.status <= 300) {
            Swal.fire({
              title: "Approved",
              text: "Service Provider Approved.",
              icon: "success",
            });
            getServiceProviders();
          } else {
            Swal.fire({
              title: "Not Approved",
              text: "Service Provider Not Approved.",
              icon: "warning",
            });
          }
        } catch (error) {
          if (error.response.status === 401) {
            Swal.fire({
              title: "Error",
              text: "The user with same mail is approved already so Reject It",
              icon: "error",
            });
            
          } 
          else {
            Swal.fire({
              title: "Oops",
              text: "Something went Wrong",
              icon: "error",
            });
          }
          console.error("Error rejecting service provider:", error);
        }
      }
    });
  };

  const handleDelete = (emailuser) => {
    const email = { email: emailuser }; // Create an object with email property

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
          const response = await axios.delete(
            `http://localhost:5000/reject/serviceProvider/request`,
            { data: email } // Use 'data' option to pass the payload
          );

          if (response?.status >= 200 && response?.status <= 300) {
            Swal.fire({
              title: "Rejected",
              text: "Service Provider Rejected.",
              icon: "success",
            });
            console.log(response);
            getServiceProviders();
          } else {
            Swal.fire({
              title: "Not Rejected",
              text: "Service Provider Not Rejected.",
              icon: "warning",
            });
          }
        } catch (error) {
          if (error.response.status === 401) {
            Swal.fire({
              title: "Error",
              text: "The email Is alredy Approved So Reject it",
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Oops",
              text: "Something went Wrong",
              icon: "error",
            });
            console.log(error);
            
          }
          console.error("Error rejecting service provider:", error);
        }
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  console.log(spList);

  return (
    <Container
      className="m-5 mx-2"
      style={{ margin: "auto", maxWidth: "100%", overflowX: "auto" }}
    >
      <h2 className="text-center">Service Providers Request List</h2>
      {spList.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell> Sl.No</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>E-mail</StyledTableCell>
                  <StyledTableCell>Service</StyledTableCell>
                  <StyledTableCell>Specialization</StyledTableCell>
                  <StyledTableCell>Qualification</StyledTableCell>
                  <StyledTableCell>Rate</StyledTableCell>
                  <StyledTableCell>Certificate</StyledTableCell>
                  <StyledTableCell className="text-align-right">
                    Action
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {spList
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((i, index) => (
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell className="text-align-center">
                        {i?.username}
                      </StyledTableCell>
                      <StyledTableCell className="text-align-center">
                        {i?.email}
                      </StyledTableCell>
                      <StyledTableCell className="text-align-center">
                        {i?.service}
                      </StyledTableCell>
                      <StyledTableCell className="text-align-center">
                        {i?.specialization}
                      </StyledTableCell>
                      <StyledTableCell className="text-align-center">
                        {i?.qualification}
                      </StyledTableCell>
                      <StyledTableCell className="text-align-center">
                        {i?.rate}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          style={{ color: "black" }}
                          onClick={() => toggleOpen(i?.experience_crt)}
                        >
                          View
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div>
                          {" "}
                          <Stack direction="row" spacing={2}>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleResponse(i)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(i?.email)}
                            >
                              Reject
                            </Button>
                          </Stack>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} className="text-center mt-3">
            <Pagination
              count={Math.ceil(spList.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
              style={{ color: "#B08968" }}
            />
          </Stack>
          <MDBModal
            staticBackdrop
            tabIndex="-1"
            open={staticModal}
            setOpen={setStaticModal}
          >
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Certificate</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleOpen}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <img src={certificate} alt="" style={{height:"100%",width:"100%"}}  />
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={toggleOpen}>
                    Close
                  </MDBBtn>
                  <MDBBtn onClick={toggleOpen} >Ok</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
      ) : (
        <>
          {" "}
          <h3 className="text-center text-danger">
            No Request Available!!!
          </h3>{" "}
        </>
      )}
    </Container>
  );
}

export default ServiceApproval;
