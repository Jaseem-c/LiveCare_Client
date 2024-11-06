import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { addEmergencyApi, getEmergencyApi } from "../../Services/allApi";
import Swal from "sweetalert2";
import axios from "axios";
import baseurl from "../../Services/baseurl";

function AddEmergency() {
  const [listEmergency, setListEmergency] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [addemergency, setEmergency] = useState({
    emergency_support: "",
    location: "",
    phonenumber: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setEmergency({
      emergency_support: "",
      location: "",
      phonenumber: "",
    });
    setShowTable(true);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setShowTable(false);
  };

  const setInputs = (e) => {
    const { value, name } = e.target;
    setEmergency({ ...addemergency, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { emergency_support, location, phonenumber } = addemergency;

    if (!emergency_support || !location || !phonenumber) {
      alert("Please fill all data");
    } else {
      const reqBody = new FormData();
      reqBody.append("emergency_support", emergency_support);
      reqBody.append("location", location);
      reqBody.append("phonenumber", phonenumber);

      const result = await addEmergencyApi(reqBody);
      console.log(result);

      if (result.status === 200) {
        Swal.fire({
          title: "Emergency Contact Number Added!",
          icon: "success",
        });

        setEmergency({
          emergency_support: "",
          location: "",
          phonenumber: "",
        });

        handleCloseModal();
      } else {
        alert(result.response.data.message);
        handleCloseModal();
      }
    }
  };

  const getEmergency = async () => {
    try {
      const result = await axios.get(`${baseurl}/emergency/allEmergency`);
      setListEmergency(result.data.getAllEmergency);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmergency();
  }, []);

  return (
    <Container>
      <div style={{ height: "500px" }} className="mt-5">
        <h2 className="text-center mt-3" style={{ color: "#B08968" }}>
          Emergency Contact Numbers
        </h2>
        <div className="text-center mt-5 p-5">
          <Button
            style={{
              backgroundColor: "#B08968",
              color: "white",
              width: "50%",
              height: "50px",
            }}
            onClick={handleShowModal}
          >
            <h4>Add Emergency Contact Numbers </h4>
          </Button>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "#B08968" }}>
                Emergency Contact Numbers
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FloatingLabel
                controlId="floatingInput"
                label="Service"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  onChange={(e) => setInputs(e)}
                  name={"emergency_support"}
                  value={addemergency.emergency_support}
                  placeholder=""
                />
              </FloatingLabel>
              <FloatingLabel controlId="" label="Location">
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => setInputs(e)}
                  name={"location"}
                  value={addemergency.location}
                />
              </FloatingLabel>
              <FloatingLabel className="mt-3" controlId="" label="Phone Number">
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => setInputs(e)}
                  name={"phonenumber"}
                  value={addemergency.phonenumber}
                />
              </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "red", color: "white" }}
                variant="secondary"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                onClick={(e) => handleAdd(e)}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {showTable && (
          <div>
            <Table className="text-center" bordered>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Service</th>
                  <th>Location</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {listEmergency.length > 0
                  ? listEmergency?.map((i,index) => (
                      <tr>
                        <td>{index+1}</td>
                        <td>{i.emergency_support}</td>
                        <td>{i.location}</td>
                        <td>{i.phonenumber}</td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </Table>
            <Stack spacing={2} className="text-center mt-3">
              <Pagination style={{ color: "#B08968" }} />
            </Stack>
          </div>
        )}
      </div>
    </Container>
  );
}

export default AddEmergency;
