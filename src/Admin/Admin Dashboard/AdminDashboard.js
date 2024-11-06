import React from 'react'
import AdminSidebar from '../Admin Sidebar/AdminSidebar'
import AdminDetails from '../AdminDetails/AdminDetails'
import './AdminDashboard.css'
function AdminDashboard() {
  return (
    <div  className='dash1' >


<AdminSidebar></AdminSidebar>
<div className='dash' > 
<AdminDetails></AdminDetails>
</div>

    </div>
  )
}

export default AdminDashboard