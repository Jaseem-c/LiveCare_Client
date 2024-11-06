import React, { useEffect, useState } from "react";
import BlogAside from "./BlogAside";
import Form from "react-bootstrap/Form";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { addBlogsApi, getAllBlogApi } from "../../Services/allApi";
import Swal from "sweetalert2";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

function AddBlog() {
  const [addBlog, setAddBlog] = useState({
    title: "",
    date: "",
    description: "",
    image: "",
  });
  const [fileError, setFileError] = useState("");

  const ProSpan = styled("span")({
    display: "inline-block",
    height: "1em",
    width: "1em",
    verticalAlign: "middle",
    marginLeft: "0.3em",
    marginBottom: "0.08em",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(https://mui.com/static/x/pro.svg)",
  });

  function Label({ componentName, valueType, isProOnly }) {
    const content = (
      <span>
        <strong>{componentName}</strong> for {valueType} editing
      </span>
    );

    if (isProOnly) {
      return (
        <Stack direction="row" spacing={0.5} component="span">
          <Tooltip title="Included on Pro package">
            <a
              href="https://mui.com/x/introduction/licensing/#pro-plan"
              aria-label="Included on Pro package"
            >
              <ProSpan />
            </a>
          </Tooltip>
          {content}
        </Stack>
      );
    }

    return content;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddBlog({ ...addBlog, image: file });
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("DD-MM-YYYY");
      setAddBlog({ ...addBlog, date: formattedDate });
    }
  };

  const header = {
    "Content-Type": "multipart/form-data",
  };

  const handleAddBlog = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const { title, date, description, image } = addBlog;
    if (!title || !date || !description || !image) {
      Swal.fire({
        title: "Fill the Blog Form",
        icon: "warning",
      });
    } else {
      try {
        const response = await addBlogsApi(addBlog, header);
        if (response.status >= 200 && response.status <= 300) {
          console.log(response);
          setAddBlog({
            title: "",
            date: null,
            description: "",
            image: null,
          });
          getBlogs();
          document.getElementById("formFile").value = "";
          document.getElementById("image").value = ""; // Clear file input
          Swal.fire({
            title: "Blog Added",
            icon: "success",
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Blog Not Added",
          icon: "warning",
        });
      }
    }
  };
  const [showTable, setShowTable] = useState(true);

  //list Blog

  const [listBlogs, setListBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const getBlogs = async () => {
    try {
      const result = await getAllBlogApi();
      setListBlogs(result?.data?.allBlogs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);

  const handleDelete = (itemid) => {
    const id = { id: itemid }; // Create an object with email property

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/blog/delete-blog`,
            { data: id } // Use 'data' option to pass the payload
          );

          if (response?.status >= 200 && response?.status <= 300) {
            Swal.fire({
              title: "Deleted",
              text: "Blog Deleted.",
              icon: "success",
            });
            console.log(response);
            getBlogs();
          } else {
            Swal.fire({
              title: "Not Deleted",
              text: "Blog Not Deleted",
              icon: "warning",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Oops",
            text: "Something went Wrong",
            icon: "error",
          });
          console.error("Error in Deleting:", error);
        }
      }
    });
  };

  console.log(addBlog);

  return (
    <div style={{ display: "flex" }}>
      <BlogAside></BlogAside>
      <Container className="p-5 text-center" style={{ width: "50%" }}>
        <Accordion
          defaultActiveKey={null}
          className="ms-5"
          onSelect={() => setShowTable(!showTable)}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Add Blogs</Accordion.Header>
            <Accordion.Body>
              <div
                className="d-flex flex-column align-items-center"
                style={{ border: "3px solid #B08968" }}
              >
                <h3
                  style={{
                    color: "#B08968",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  className="text-center"
                >
                  Add Blogs
                </h3>

                <Form style={{ width: "90%" }}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label></Form.Label>
                    <Form.Control
                      value={addBlog.title}
                      type="text"
                      placeholder="title"
                      onChange={(e) =>
                        setAddBlog({ ...addBlog, title: e.target.value })
                      }
                    />
                  </Form.Group>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="my-3">
                      <DemoContainer
                        components={[
                          "DatePicker",
                          "TimePicker",
                          "DateTimePicker",
                          "DateRangePicker",
                        ]}
                      >
                        <DemoItem>
                          <input
                            type="date"
                            className="rounded border border-2 p-2"
                            id="image"
                            onChange={(e) => handleDateChange(e.target.value)}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </div>
                  </LocalizationProvider>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      value={addBlog.description}
                      as="textarea"
                      rows={3}
                      placeholder="Description"
                      onChange={(e) =>
                        setAddBlog({ ...addBlog, description: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" onChange={handleFileChange} />
                    {fileError && <p className="text-danger">{fileError}</p>}
                  </Form.Group>

                  <div className="my-2 text-center">
                    <button
                      className="btn btn "
                      style={{ backgroundColor: "#B08968", color: "white" }}
                      onClick={handleAddBlog}
                    >
                      Add
                    </button>
                  </div>
                </Form>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {showTable && (
          <>
            <h2 className="my-5 text-center" style={{ color: "#9C6644" }}>
              {" "}
              Listing Blogs
            </h2>
            <Table
              striped
              bordered
              className="mt-2 "
              style={{ border: "3px solid #9C6644" }}
            >
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {listBlogs
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((i, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{i.title}</td>
                      <td>{i.date}</td>
                      <td
                        style={{
                          maxWidth: "300px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {i.description}
                      </td>
                      <td>
                        {i.image && (
                          <img
                            src={i?.image}
                            alt="...no img Found"
                            style={{
                              maxWidth: "100px",
                              height: "70px",
                              width: "90px",
                            }}
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="p-2 btn"
                          onClick={() => handleDelete(i?._id)}
                        >
                          <i
                            class="fa-sharp fa-solid fa-trash fa-lg  "
                            style={{ color: "red" }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Stack spacing={2} className="text-center mt-3">
              <Pagination
                count={Math.ceil(listBlogs.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                style={{ color: "#B08968" }}
              />
            </Stack>
          </>
        )}
      </Container>
    </div>
  );
}

export default AddBlog;
