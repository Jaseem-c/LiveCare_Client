import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../Services/allApi";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import Header from "../Header/Header";

function UserBlog() {
  const [blogs, setBlogs] = useState([]);

  const handleGetBlogs = async () => {
    try {
      const response = await getAllBlogs();
      if (response.status >= 200 && response.status <= 300) {
        console.log(response.data.allBlogs);
        setBlogs(response?.data?.allBlogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetBlogs();
  }, []);

  return (
    <>
      <Header />
      <h1 className="text-center mt-3">All Blogs</h1>

      <div className="container">
        <div className="row">
          {blogs.length > 0 ? (
            blogs.map((item) => (
              <div className="col-lg-3 p-3">
                <MDBCard className="shadow">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image hover-overlay"
                  >
                    <MDBCardImage
                      src={item?.image}
                      fluid
                      alt="..."
                      style={{ height: "300px", width: "100%" }}
                    />
                    <a>
                      <div
                        className="mask"
                        style={{
                          backgroundColor: "rgba(251, 251, 251, 0.15)",
                        }}
                      ></div>
                    </a>
                  </MDBRipple>
                  <MDBCardBody>
                    <MDBCardTitle className="text-center fs-3">
                      {item?.title}
                    </MDBCardTitle>
                    <MDBCardTitle>{item?.date}</MDBCardTitle>
                    <MDBCardText>{item?.description}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))
          ) : (
            <h1 className="text-center mt-4 text-danger">No Blogs Available</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default UserBlog;
