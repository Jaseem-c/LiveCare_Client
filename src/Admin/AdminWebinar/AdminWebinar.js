import React, { useEffect, useState } from "react";
import WebinarAside from "./WebinarAside";
import Form from "react-bootstrap/Form";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import { addWebApi, getAllWebsApi } from "../../Services/allApi";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";

function AdminWebinar() {
  const [addWeb, setAddWeb] = useState({
    title: "",
    date: null,
    time: null,
    description: "",
    image: null,
    topics: "",
    speaker: "",
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

  const handleWebFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddWeb({ ...addWeb, image: file });
    }
  };

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("MM/DD/YYYY");
    setAddWeb({ ...addWeb, date: formattedDate });
  };
  const handleTimeChange = (time) => {
    if (time) {
      setAddWeb({ ...addWeb, time: time });
    }
  };

  const header = {
    "Content-Type": "multipart/form-data",
  };

  const handleAddWeb = async (e) => {
    e.preventDefault();

    const { title, date, description, image, time, topics, speaker } = addWeb;
    if (
      !title ||
      !date ||
      !description ||
      !image ||
      !time ||
      !topics ||
      !speaker
    ) {
      Swal.fire({
        title: "Fill the Webinar Form",
        icon: "warning",
      });
    } else {
      try {
        const response = await addWebApi(addWeb, header);
        if (response.status >= 200 && response.status <= 300) {
          console.log(response);
          setAddWeb({
            title: "",
            date: null,
            description: "",
            image: null,
            time: null,
            topics: "",
            speaker: "",
          });
          document.getElementById("formFile").value = null;
          document.getElementById("image").value = null;
          document.getElementById("time").value = null;
          Swal.fire({
            title: "Webinar  Added",
            icon: "success",
          });
          getWebs();
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Webinar Not Added Not Added",
          icon: "warning",
        });
      }
    }
  };

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
            `http://localhost:5000/webinar/delete-webinar`,
            { data: id } // Use 'data' option to pass the payload
          );

          if (response?.status >= 200 && response?.status <= 300) {
            Swal.fire({
              title: "Deleted",
              text: "Webinar Deleted.",
              icon: "success",
            });
            console.log(response);
            getWebs();
          } else {
            Swal.fire({
              title: "Not Deleted",
              text: "Webinar Not Deleted",
              icon: "warning",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Oops",
            text: "Something went Wrong",
            icon: "error",
          });
          console.error("Error in Deleting Webinar:", error);
        }
      }
    });
  };

  console.log(addWeb);

  const [showTable, setShowTable] = useState(true);

  //list Webinar
  const [listWeb, setListWeb] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getWebs = async () => {
    try {
      const result = await getAllWebsApi();
      setListWeb(result?.data?.allWebinar);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWebs();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex" }}>
        <WebinarAside></WebinarAside>
        <Container className=" p-5 text-center" style={{}}>
          <Accordion
            defaultActiveKey={null}
            className="ms-5"
            onSelect={() => setShowTable(!showTable)}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Add Webinars</Accordion.Header>
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
                    Add webinars
                  </h3>
                  <Form style={{ width: "90%" }}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control
                        value={addWeb.title}
                        type="text"
                        placeholder="title"
                        onChange={(e) =>
                          setAddWeb({ ...addWeb, title: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control
                        value={addWeb.topics}
                        type="text"
                        className="mt-3"
                        placeholder="topics"
                        onChange={(e) =>
                          setAddWeb({ ...addWeb, topics: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control
                        value={addWeb.speaker}
                        className="mt-3"
                        type="text"
                        placeholder="speaker"
                        onChange={(e) =>
                          setAddWeb({ ...addWeb, speaker: e.target.value })
                        }
                      />
                    </Form.Group>
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
                    <div className="mb-3">
                      <input
                        id="time"
                        type="time"
                        className="form-control"
                        onChange={(e) => handleTimeChange(e.target.value)}
                      />
                    </div>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        value={addWeb.description}
                        as="textarea"
                        rows={3}
                        className="mt-3"
                        placeholder="Description"
                        onChange={(e) =>
                          setAddWeb({ ...addWeb, description: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Control
                        type="file"
                        onChange={handleWebFileChange}
                      />
                      {fileError && <p className="text-danger">{fileError}</p>}
                    </Form.Group>
                    <div className="my-2 text-center">
                      <button
                        className="btn btn "
                        style={{ backgroundColor: "#B08968", color: "white" }}
                        onClick={handleAddWeb}
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
                Listing Webinars
              </h2>

              <Table
                striped
                bordered
                className="mt-2 "
                style={{ border: "3px solid #9C6644", width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Topics</th>
                    <th>Speakers</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listWeb
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((i, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{i?.title}</td>
                        <td>{i?.date}</td>
                        <td>{i?.time}</td>
                        <td>{i?.topics}</td>
                        <td>{i?.speaker}</td>
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
                              alt="....noimgae found"
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
                  count={Math.ceil(listWeb.length / itemsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  style={{ color: "#B08968" }}
                />
              </Stack>
            </>
          )}
        </Container>
      </div>
    </LocalizationProvider>
  );
}

export default AdminWebinar;
