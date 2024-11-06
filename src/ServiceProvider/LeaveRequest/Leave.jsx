import React, { useState } from "react";
import HeaderSP from "../Navbar/HeaderSP";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import axios from "axios";
import baseurl from "../../Services/baseurl";

function Leave() {
  const [expanded, setExpanded] = useState(false);
  const token = sessionStorage.getItem("token");

  const [leave, setLeave] = useState({
    date: "",
    reason: "",
    additionalNotes: "",
  });

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("DD-MM-YYYY");
      setLeave({ ...leave, date: formattedDate });
    }
  };

  const handleSubmitLeaveReq = async () => {
    const { date, reason, additionalNotes } = leave;

    if (!date || !reason || !additionalNotes) {
      Swal.fire({
        title: "Fill the Form",
        icon: "warning",
      });
    } else {
      try {
        const response = await axios.post(
          `${baseurl}/serviceProvider/leave-request`,
          leave,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.status >= 200 && response.status <= 300) {
          console.log(response);

          Swal.fire({
            title: "Leave Request sent Wait for the response",
            icon: "success",
          });
          document.getElementById("date").value = "";
          setLeave({
            date: "",
            reason: "",
            additionalNotes: "",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Leave Request Not Sent",
          icon: "error",
        });
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="mb-5">
        <HeaderSP />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Accordion
          expanded={expanded}
          onChange={handleExpansion}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={{
            "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
            "& .MuiAccordionDetails-root": {
              display: expanded ? "block" : "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Leave Request</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Card sx={{ maxWidth: 500, width: 500 }}>
                <CardMedia
                  sx={{ height: 100 }}
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8RB557crs7nQPgynwfUXCG5t7Tpce5htcT_ngdCOoxw&s"
                  style={{
                    width: "20%",
                    marginLeft: "40%",
                    borderRadius: "50%",
                  }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <input
                        id="date"
                        type="date"
                        className="form-control mb-3"
                        onChange={(e) => handleDateChange(e.target.value)}
                      />
                    </LocalizationProvider>
                    <textarea
                      id="text-area"
                      className="form-control "
                      rows="4"
                      cols="50"
                      placeholder="Reason"
                      value={leave.reason}
                      onChange={(e) =>
                        setLeave({ ...leave, reason: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="form-control my-3"
                      placeholder="Additional Notes"
                      value={leave.additionalNotes}
                      onChange={(e) =>
                        setLeave({ ...leave, additionalNotes: e.target.value })
                      }
                    />
                  </Typography>
                </CardContent>
                <CardActions className="d-flex justify-content-center">
                  <Button variant="contained" onClick={handleSubmitLeaveReq}>
                    Submit
                  </Button>
                </CardActions>
              </Card>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="container mt-5">
      </div>
    </div>
  );
}

export default Leave;
