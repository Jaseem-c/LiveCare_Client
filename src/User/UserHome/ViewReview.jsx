import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardSubTitle,
    MDBCardText,
    MDBCardLink
  } from 'mdb-react-ui-kit';
import { viewreviewApi } from '../../Services/allApi';

function ViewReview() {

    const [viewfeedback,setViewfeedback] = useState([])

    const viewreview = async()=>{
        const result = await viewreviewApi()
        console.log(result.data);
        setViewfeedback(result.data)
    }

    useEffect(()=>{
        viewreview()
    },[])
  return (
    <>
    <h1 className='text-center'>Reviews</h1>
   {viewfeedback?.length>0?
   viewfeedback.map((item)=>(<MDBCard>
    <MDBCardBody>
      <MDBCardSubTitle>Username</MDBCardSubTitle>
      <MDBCardText>
        review
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>))
    
    : null
    }
    </>
  )
}

export default ViewReview