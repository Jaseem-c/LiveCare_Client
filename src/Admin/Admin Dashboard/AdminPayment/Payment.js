import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Payment.css';
import { getPaymentApi } from '../../../Services/allApi';


export default function Payment() {
    const [payment, setPayment] = useState([]);
  
  
    const getPayment = async () => {
    try {
      const result = await getPaymentApi();
      setPayment(result?.data?.transactionsaDetails);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPayment();
  }, []);
    return (
        <div>
            <h4 className='text-center m-4' style={{ color: "#9C6644" }}> Service Provider Payment history</h4>
            <TableContainer component={Paper} className="payment-table p-2  "  >
                <Table aria-label="simple table "className='scroll' >
                    <TableHead>
                        <TableRow>
                            <TableCell>Client</TableCell>
                            <TableCell >Date</TableCell>
                            <TableCell >Cash</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    {payment?.map((i) => (
        <TableRow >
          <TableCell component="th" scope="row">
          {i.from_Name}
          </TableCell>
          <TableCell>{i.Date}</TableCell>
          <TableCell>{i.amount}</TableCell>
        </TableRow>
      ))}
                        
                       
                           

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
