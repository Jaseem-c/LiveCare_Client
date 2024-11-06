import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Button, Container } from "@mui/material";
import UserAside from "./UserAside";
import { useEffect, useState } from "react";
import { getApprovedServiceProvidersApi } from "../../Services/allApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SingleView from "./SingleView";



function ServiceProviderList() {
  const navigate = useNavigate()
  const location = useLocation()

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#B08968",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [approveList, setApproveList] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const getApproveServiceProviders = async () => {
    try {
      const result = await getApprovedServiceProvidersApi();
      setApproveList(result?.data?.allApprovedServiceproviders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApproveServiceProviders();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleView = (serviceProvider) => {
    navigate(`/serviceProvider-profile`,{
      state:serviceProvider
    })
  };

  return (
    <div style={{ display: "flex" }}>
      <UserAside />
      <Container
        className="m-5 mx-2"
        style={{ margin: "auto", maxWidth: "100%", overflowX: "auto" }}
      >
        <h3 className="text-center">Service Providers</h3>
        <TableContainer
          component={Paper}
          style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl.No</StyledTableCell>

                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>E-mail</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>Service</StyledTableCell>
                <StyledTableCell>Specialization</StyledTableCell>
                <StyledTableCell>Qualification</StyledTableCell>
                <StyledTableCell>Rate</StyledTableCell>
                <StyledTableCell>Profile</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {approveList
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((i, index) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {" "}
                      {index + 1}
                    </StyledTableCell>

                    <StyledTableCell className="text-align-center">
                      {i?.username}
                    </StyledTableCell>
                    <StyledTableCell className="text-align-center">
                      {i?.email}
                    </StyledTableCell>
                    <StyledTableCell className="text-align-center">
                      {i?.mobile}
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
                        onClick={() => handleView(i)}
                      >
                        View
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} className="text-center mt-3">
          <Pagination
            count={Math.ceil(approveList.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            style={{ color: "#B08968" }}
          />
        </Stack>
      </Container>
    </div>
  );
}

export default ServiceProviderList;
