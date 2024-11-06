import React, { useState } from "react";
import HeaderSP from "../Navbar/HeaderSP";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Swal from "sweetalert2";
import axios from "axios";
import baseurl from "../../Services/baseurl";

function Attendence() {
  const [attendence, setAttendence] = useState({
    date: "",
    time_in: "",
    time_out: "",
    working_hours: "",
    present: true,
  });

  const token = sessionStorage.getItem("token");

  const handlePresent = async (e) => {
    e.preventDefault();

    const { date, time_in, time_out, working_hours } = attendence;

    if (!date || !time_in || !time_out || !working_hours) {
      Swal.fire({
        title: "fill the Form",
        icon: "warning",
      });
    } else {
      try {
        const response = await axios.post(
          `${baseurl}/serviceProvider/attendence`,
          attendence,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (response.status >= 200 && response.status <= 300) {
          console.log(response);

          setAttendence({
            date: "",
            time_in: "",
            time_out: "",
            working_hours: "",
            present: true,
          });

          document.getElementById("date").value = "";
          document.getElementById("time_in").value = null;
          document.getElementById("time_out").value = null;

          Swal.fire({
            title: "Attendence added Successfully",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error handling attendance:", error);
        Swal.fire({
          title: "Attendence Not Added ",
          icon: "error",
        });
      }
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("DD-MM-YYYY");
      setAttendence({ ...attendence, date: formattedDate });
    }
  };

  const handleTimeChange = (time) => {
    if (time) {
      setAttendence({ ...attendence, time_in: time });
    }
  };

  const handleTimeChange2 = (time) => {
    if (time) {
      setAttendence({ ...attendence, time_out: time });
    }
  };
  console.log(attendence);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HeaderSP />
      <div className="d-flex justify-content-center align-items-center pt-5">
        <form
          style={{ width: "400px", height: "400px" }}
          className="mt-5 p-5 shadow"
        >
          <input
            id="date"
            type="date"
            className="form-control mb-3"
            onChange={(e) => handleDateChange(e.target.value)}
          />
          <div className="mb-3">
            <label htmlFor="time_in" className="form-label">
              Time In
            </label>
            <input
              id="time_in"
              type="time"
              className="form-control"
              onChange={(e) => handleTimeChange(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time_out" className="form-label">
              Time Out
            </label>
            <input
              id="time_out"
              type="time"
              className="form-control"
              onChange={(e) => handleTimeChange2(e.target.value)}
            />
          </div>
          <input
            type="number"
            className="form-control mb-3"
            placeholder="working_hours"
            value={attendence.working_hours}
            onChange={(e) =>
              setAttendence({ ...attendence, working_hours: e.target.value })
            }
          />
          <button
            className="btn btn-primary form-control"
            onClick={handlePresent}
          >
            Present
          </button>
        </form>
      </div>
    </LocalizationProvider>
  );
}

export default Attendence;
