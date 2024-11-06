import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Label } from "@mui/icons-material";

function Login({ register }) {
  const registerForm = register ? true : false;
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    service: "",
    specialization: "",
    qualification: "",
    exp_year: "",
    rate: "",
    experience_crt: null,
  });

  const [profile_img, setProfile_img] = useState(null);

  console.log(profile_img);

  const handleRegister = async () => {
    const {
      username,
      email,
      password,
      mobile,
      service,
      specialization,
      qualification,
      exp_year,
      rate,
      experience_crt,
    } = userdata;

    if (
      !username ||
      !email ||
      !password ||
      !mobile ||
      !service ||
      !specialization ||
      !qualification ||
      !exp_year ||
      !rate ||
      !experience_crt
    ) {
      Swal.fire({
        title: "Please fill the form completly",
        icon: "warning",
      });
    } else {
      try {
        const result = await axios.post(
          `http://localhost:5000/serviceProvier/register`,
          userdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (result.status >= 200 && result.status < 300) {
          navigate("/service-reg2");
          Swal.fire({
            title: "Primary Reg Completed",
            icon: "Success",
          });
          setUserdata({
            username: "",
            email: "",
            password: "",
            mobile: "",
            service: "",
            specialization: "",
            qualification: "",
            exp_year: "",
            rate: "",
            location: "",
            experience_crt: null,
          });
        } else if (result?.response?.status === 400) {
          console.log(result);
          Swal.fire({
            title: "Email Already Taken ",
            icon: "warning",
          });
        }
      } catch (error) {
        if (error?.response?.status === 400) {
          Swal.fire({
            title: "Email Already Taken ",
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "warning",
          });
        }
        console.log(error);
      }
    }
  };
  const handleServiceChange = (event) => {
    setUserdata({ ...userdata, service: event.target.value });
  };
  const handleSecondReg = async () => {
    const reqBody = new FormData();

    if (profile_img) {
      reqBody.append("profile_img", profile_img, profile_img.name);
    }

    reqBody.append("email", userdata.email);

    try {
      const response = await axios.post(
        `http://localhost:5000/serviceProvider/fianlRegtration`,
        reqBody,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          title: "Registration Completed, Wait For Admin Response",
          icon: "success",
        });
        setUserdata({ email: "" });
        setProfile_img(null);
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Something went wrong",
        icon: "warning",
      });
    }
  };
  console.log(userdata);

  return (
    <>
      <div className="containeradmin">
        {/* Data or Content */}
        <div className="box-1">
          <div className="content-adminholder">
            <h2 className="fade-in"></h2>
            <h2 className="fade-in">
              <span style={{ "--index": 1 }}>H</span>
              <span style={{ "--index": 2 }}>e</span>
              <span style={{ "--index": 3 }}>l</span>
              <span style={{ "--index": 4 }}>l</span>
              <span style={{ "--index": 5 }}>o</span>
              <span style={{ "--index": 6 }}>!</span>
              <span style={{ "--index": 7 }}>&nbsp;</span>
              <span style={{ "--index": 8 }}>S</span>
              <span style={{ "--index": 9 }}>e</span>
              <span style={{ "--index": 10 }}>r</span>
              <span style={{ "--index": 11 }}>v</span>
              <span style={{ "--index": 12 }}>i</span>
              <span style={{ "--index": 13 }}>c</span>
              <span style={{ "--index": 14 }}>e</span>
            </h2>
          </div>
        </div>

        {/* Forms */}
        <div className="box-2">
          <div className="login-form-container">
            {registerForm ? (
              <h1>Primary Registration Form</h1>
            ) : (
              <h1>Second Registration Form</h1>
            )}
            {registerForm ? (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="input-field"
                  value={userdata.username}
                  onChange={(e) =>
                    setUserdata({ ...userdata, username: e.target.value })
                  }
                />
              </div>
            ) : null}

            {registerForm ? (
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="email"
                  className="input-field"
                  value={userdata.email}
                  onChange={(e) =>
                    setUserdata({ ...userdata, email: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Confirm email"
                  className="input-field"
                  value={userdata.email}
                  onChange={(e) =>
                    setUserdata({ ...userdata, email: e.target.value })
                  }
                />
              </div>
            )}
            {registerForm ? null : (
              <div>
                <label htmlFor="" className="fw-bolder mb-3">
                  Profile Imge
                </label>
                <br />
                <input
                  className="ms-5 mb-4"
                  type="file"
                  onChange={(e) => setProfile_img(e.target.files[0])}
                />
              </div>
            )}
            {registerForm ? (
              <div className="mb-3">
                <input
                  type="tel"
                  placeholder="Phone no"
                  className="input-field"
                  value={userdata.mobile}
                  onChange={(e) =>
                    setUserdata({ ...userdata, mobile: e.target.value })
                  }
                />
              </div>
            ) : null}
            {registerForm ? (
              <>
                {" "}
                <div className="mb-3 w-75 ms-5 px-5">
                 <FormControl fullWidth >
                    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={userdata.service}
    onChange={handleServiceChange}
  >
    <MenuItem value="doctor">Doctor</MenuItem>
    <MenuItem value="nurse">Nurse</MenuItem>
    <MenuItem value="care taker">Care taker</MenuItem>
    <MenuItem value="therapist">Therapist</MenuItem>
  </Select>
                 </FormControl>
                </div>
              
                <div className="mb-3">
                  <input
                    name=""
                    id=""
                    type="text"
                    placeholder="Location"
                    className="input-field"
                    value={userdata.location}
                    onChange={(e) =>
                      setUserdata({ ...userdata, location: e.target.value })
                    }
                  ></input>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Specialization"
                    className="input-field"
                    value={userdata.specialization}
                    onChange={(e) =>
                      setUserdata({
                        ...userdata,
                        specialization: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Qualification"
                    className="input-field"
                    value={userdata.qualification}
                    onChange={(e) =>
                      setUserdata({
                        ...userdata,
                        qualification: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Year Of Experience"
                    className="input-field"
                    value={userdata.exp_year}
                    onChange={(e) =>
                      setUserdata({ ...userdata, exp_year: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Rate"
                    className="input-field"
                    value={userdata.rate}
                    onChange={(e) =>
                      setUserdata({ ...userdata, rate: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3 ms-5">
                  <label htmlFor="" className="mb-3 me-5">
                    Experince Certifacte
                  </label>
                  <br />
                  <input
                    className="ms-5"
                    type="file"
                    onChange={(e) =>
                      setUserdata({
                        ...userdata,
                        experience_crt: e.target.files[0],
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={userdata.password}
                    onChange={(e) =>
                      setUserdata({ ...userdata, password: e.target.value })
                    }
                  />
                </div>
              </>
            ) : null}

            {registerForm ? (
              <div className="mb-5">
                <button
                  className="login-button"
                  type="button"
                  onClick={handleRegister}
                >
                  Primary Registration
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <button
                  className="login-button"
                  type="button"
                  onClick={handleSecondReg}
                >
                  Final Regstration
                </button>
              </div>
            )}
          </div>
          {registerForm ? (
            <p className="text-center">
              Complete your registration here{" "}
              <Link to={"/service-reg2"}>Step2</Link>
            </p>
          ) : null}
          <div className="text-center">
            <p>
              Already have an Account?{" "}
              <Link
                to={"/service-login"}
                style={{ textDecoration: "none", color: "navyblue" }}
              >
                Login
              </Link>{" "}
              here
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

