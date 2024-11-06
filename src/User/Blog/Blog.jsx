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
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  const handleGetBlogs = async () => {
    try {
      const response = await getAllBlogs();
      if (response.status >= 200 && response.status <= 300) {
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
      <h1 className="text-center my-5">BLOGS</h1>

      <div className="container">
        <div className="row">
          {blogs.length > 0 ? (
            blogs.slice(0, 4).map((item) => (
              <div className="col-lg-3 p-3" key={item._id}>
                <MDBCard>
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image hover-overlay"
                  >
                    <MDBCardImage
                      src={item?.image}
                      fluid
                      alt="..."
                      style={{ height: "200px", width: "100%" }}
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
                    <MDBCardTitle>Title: {item?.title}</MDBCardTitle>
                    <MDBCardTitle>Date: {item?.date}</MDBCardTitle>
                    <MDBCardText>{item?.description}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))
          ) : (
            <h1 className="text-center mt-4 text-danger">No Blogs Available</h1>
          )}

          <div className="text-center">
            <Link>
              <p>
                <Link to={"/user-blog"}>View More....</Link>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
