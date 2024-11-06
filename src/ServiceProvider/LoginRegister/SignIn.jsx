import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { serviceproviderloginApi } from "../../Services/allApi";
import Swal from "sweetalert2";

function SignIn() {
  const navigate =useNavigate()
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  console.log(login);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = login;
    if (!email || !password) {
      Swal.fire({
        title: "Please fill the form completly",
        icon: "warning",
      });
    } else {
      const result = await serviceproviderloginApi(login);
      console.log(result);

      if (result.status >= 200 && result.status <= 300) {
        Swal.fire({
          title: "Login Successfull",
          icon: "Success",
        });
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        setLogin({
          email: "",
          password: "",
        });
        navigate('/service-dash')
      } else {
        Swal.fire({
          title: "Something went wrong",
          icon: "warning",
        });
        console.log(result.response.data);
      }
    }
  };

  return (
    <div>
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
              <span style={{ "--index": 15 }}>&nbsp;</span>
              <br />
              <span style={{ "--index": 16 }}>P</span>
              <span style={{ "--index": 17 }}>r</span>
              <span style={{ "--index": 18 }}>o</span>
              <span style={{ "--index": 19 }}>v</span>
              <span style={{ "--index": 20 }}>i</span>
              <span style={{ "--index": 21 }}>d</span>
              <span style={{ "--index": 22 }}>e</span>
              <span style={{ "--index": 23 }}>r</span>
            </h2>
          </div>
        </div>

        {/* Forms */}
        <div className="box-2">
          <div className="login-form-container">
            <div className="mb-4">
              <input
                type="email"
                placeholder="email"
                className="input-field"
                value={login.email}
                onChange={(e) =>
                  setLogin({ ...login, email: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <button
                className="login-button"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>

          <div className="text-center">
            <p>
              Don't have an Account?{" "}
              <Link
                to={"/service-reg"}
                style={{ textDecoration: "none", color: "navyblue" }}
              >
                Register
              </Link>{" "}
              here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
