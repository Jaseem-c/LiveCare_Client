import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AcceptedLeave() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor :'#B08968',
          color: theme.palette.common.white,
          width: '50px', // Adjust the width here
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
  return (
    <div>
      <TableContainer component={Paper} >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow >
          <StyledTableCell> Sl.No</StyledTableCell>
            <StyledTableCell>Service Provider</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell>End Date</StyledTableCell>
            <StyledTableCell>Reason</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
               1
              </StyledTableCell>
              <StyledTableCell className='text-align-center'>Arya</StyledTableCell>
             <StyledTableCell className='text-align-center'>12/04/2024</StyledTableCell>
              <StyledTableCell className='text-align-center'>18/04/2024</StyledTableCell>
              <StyledTableCell className='text-align-center'>fhvdsjvhjdsvjhdfjhgdsfhgds</StyledTableCell>
              <StyledTableCell className='text-align-center'>Pending</StyledTableCell>
            </StyledTableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default AcceptedLeave
