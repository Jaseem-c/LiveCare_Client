import {   Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Pagination from "@mui/material/Pagination";
import UserAside from './UserAside';
import { getUsersApi } from '../../Services/allApi';

function UserList() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor :'#B08968',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      

      const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;
  const getUsers = async () => {
    try {
      const result = await getUsersApi();
      setUserList(result?.data?.allUsersList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers()   }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);}
  return (
    <div style={{ display: 'flex' }}>
    
    <UserAside></UserAside>
    <Container className='m-5'>
       <h4 className='text-center'>User List</h4>
       <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
          <StyledTableCell > Sl.No</StyledTableCell>

            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell >E-mail</StyledTableCell>
            <StyledTableCell >Phone Number</StyledTableCell>
            <StyledTableCell >Address</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {userList
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((i, index) => (
            <StyledTableRow>
              
            <StyledTableCell className='text-align-center'>{index + 1}</StyledTableCell>

            
              <StyledTableCell className='text-align-center'>{i?.username}</StyledTableCell>
              <StyledTableCell className='text-align-center'> {i?.email}  </StyledTableCell>
              <StyledTableCell className='text-align-center'>{i?.number}</StyledTableCell>
              <StyledTableCell className='text-align-center'>{i?.address} </StyledTableCell>
              

              
        
             </StyledTableRow>
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
    <Stack spacing={2} className="text-center mt-3">
          <Pagination
          count={Math.ceil(userList.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          style={{ color: "#B08968" }}
        />
        </Stack>
    </Container>
    </div>
  )
}

export default UserList
