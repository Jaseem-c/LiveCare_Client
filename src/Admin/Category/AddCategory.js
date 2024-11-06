import { Container } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function AddCategory() {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);






    

  return (
    <Container  >
<div style={{height:"500px"}} className='mt-5' >

<h2 className='text-center mt-3' style={{color:"#B08968"}} >Categories</h2>
<div className='text-center mt-5 p-5' > 

<Button style={{backgroundColor:"#B08968",color:"white",width:"50%",height:"50px"}}  onClick={handleShow}>
       <h4>Add Category </h4> 
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"#B08968"}}  >Add Category and Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel
        controlId="floatingInput"
        label="Category"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="" />
      </FloatingLabel>
      <FloatingLabel controlId="" label="Sub Category">
        <Form.Control type="text" placeholder="" />
      </FloatingLabel>



        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor:"red",color:"white"}} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{backgroundColor:"green",color:"white"}} onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <div>
      <Table className='text-center'  bordered  >
      <thead>
        <tr>
          <th>Sl.No</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td></td>
          <td></td>
          <td><i  style={{color:"red"}}  class="fa-solid fa-trash"></i></td>
        </tr>
      
      </tbody>
    </Table>
    <Stack spacing={2} className="text-center mt-3">
        <Pagination
         
         
        
          style={{ color: "#B08968" }}
        />
        </Stack>



      </div>
</div>



    </Container>
  )
}

export default AddCategory
