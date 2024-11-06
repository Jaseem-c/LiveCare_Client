import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminSidebar() {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
    Swal.fire({
      title: "Logged out",
      icon: "success",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "scroll initial",
      }}
    >
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#9C6644" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <div className="dropdown"></div>

              <li className="nav-item mx-2">
                <a className="nav-link" href="/admin-chat">
                  <i
                    className="fa fa-envelope"
                    style={{ color: "white" }}
                    title="Chat"
                  ></i>
                </a>
              </li>
              <li>
                <a className="nav-link" href="#">
                  <i
                    className="fa fa-power-off"
                    style={{ color: "white", marginRight: "5px" }}
                    onClick={logout}
                    title="Log Out"
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <CDBSidebar
        textColor="#fff"
        style={{ background: "linear-gradient(to bottom, #9C6644, #DDB892)" }}
      >
        <CDBSidebarHeader>
          <a className="text-decoration-none" style={{ color: "inherit" }}>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Cindy Baker"
                src="https://i.postimg.cc/BbqPkcnD/360-F-65756860-GUZwz-OKNMUU3-Hld-Fo-IA44qss7-ZIr-CG8-I.jpg"
                style={{ width: "50px", height: "50px" }}
              />
              <h6 className="mt-4 ms-2">Admin </h6>
            </Stack>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink exact to="/admin-dash" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin-leave" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="note-sticky">
                Leave Requests
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin-bookings" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">Bookings</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/admin-blog" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Blogs</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin-approval" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="hand">
                Approval Request
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/admin-webinar" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="handshake">Webinar</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/add-category"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Categories</CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink exact to="/add-emergency" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="tower-broadcast">
                Emergency
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div style={{ padding: "20px 100px" }}>
            <Stack direction="row" spacing={2}>
              <Avatar
                onClick={logout}
                style={{ color: "white", backgroundColor: "#9C6644" }}
              >
                L
              </Avatar>
            </Stack>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default AdminSidebar;
