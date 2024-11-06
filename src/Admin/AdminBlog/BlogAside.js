import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
function BlogAside() {

 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll initial',minHeight:"100vh" }}>
      


     
      <CDBSidebar textColor="#fff" style={{ background: 'linear-gradient(to bottom, #9C6644, #DDB892)' }}>
        <CDBSidebarHeader >
          <a className="text-decoration-none" style={{ color: 'inherit' }}>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Cindy Baker"
                src="https://i.postimg.cc/BbqPkcnD/360-F-65756860-GUZwz-OKNMUU3-Hld-Fo-IA44qss7-ZIr-CG8-I.jpg"
                style={{ width: '50px', height: '50px' }}
              />
              <h6 className='mt-4 ms-2'>Admin </h6>
            </Stack>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent  >
          <CDBSidebarMenu>
            <NavLink exact to="/admin-dash" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin-leave" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="note-sticky">Leave Requests</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin-bookings" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">Bookings</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin-feedback" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="comment">Feedbacks</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin-blog" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Blogs</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin-approval" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="hand">Approval Request</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink exact to="/admin-webinar"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="handshake">Webinar</CDBSidebarMenuItem>
            </NavLink>
          
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 100px' }}>
          <Stack direction="row" spacing={2}>
          <Avatar style={{ color: "white", backgroundColor:"#9C6644"}}>L</Avatar>
      
    </Stack>
          
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default BlogAside;
