import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./Admin/Admin Dashboard/AdminDashboard";
import Login from "./User/UserLogin/Login";
import UserHome from "./User/UserHome/UserHome";
import Profile from "./User/Profile/Profile";
import LeaveRequest from "./Admin/Leave/LeaveRequest";
import Home from "./Common/Home";
import MyBookings from "./User/Bookings/MyBookings";
import Singup from "./ServiceProvider/LoginRegister/Singup";
import Bookings from "./Admin/AdminBookings/Bookings";
import UserApproval from "./Admin/Approvals/UserApproval";
import UserList from "./Admin/Approvals/UserList";
import ServiceProviderList from "./Admin/Approvals/ServiceProviderList";
import Attendence from "./ServiceProvider/Attendence/Attendence";
import AcceptedBookings from "./ServiceProvider/Bookings/AcceptedBookings";
import AddBlog from "./Admin/AdminBlog/AddBlog";
import UserBlog from "./User/Blog/UserBlog";
import Webinar from "./User/Webinar/Webinar";
import AdminWebinar from "./Admin/AdminWebinar/AdminWebinar";
import SignIn from "./ServiceProvider/LoginRegister/SignIn";
import Leave from "./ServiceProvider/LeaveRequest/Leave";
import Dashboard from "./ServiceProvider/Dashboard/Dashboard";
import ServiceAttendance from "./Admin/Approvals/ServiceAttendance";
import AdminChat from "./Admin/Chat/AdminChat";
import BookSP from "./User/Bookings/BookSP";
import Search from "./User/Search/Search";
import RejectedBookings from "./ServiceProvider/Bookings/RejectedBookings";
import AllBookings from "./ServiceProvider/Bookings/AllBookings";
import TransactionHistory from "./User/Transaction/TransactionHistory";
import AddCategory from "./Admin/Category/AddCategory";
import AddEmergency from "./Admin/Emergency/AddEmergency";
import ProfileSP from "./ServiceProvider/Profile/ProfileSP";
import Emergency from "./User/Emergency/Emergency";
import SingleView from "./Admin/Approvals/SingleView";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/*  //admin */}
        <Route path="/admin-dash" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-leave" element={<LeaveRequest />} />
        <Route path="/admin-bookings" element={<Bookings />} />
        <Route path="/admin-approval" element={<UserApproval />} />
        <Route path="/admin-user" element={<UserList />} />
        <Route path="/admin-service" element={<ServiceProviderList />} />
        <Route path="/admin-blog" element={<AddBlog />} />
        <Route path="/admin-webinar" element={<AdminWebinar />} />
        <Route path="/admin-attendance" element={<ServiceAttendance/>} />
        <Route path="/admin-chat" element={<AdminChat/>} />
        <Route path="/add-category" element={<AddCategory/>} />
        <Route path="/add-emergency" element={<AddEmergency/>} />
        <Route path="/serviceProvider-profile" element={<SingleView/>} />



        {/* //user */}
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Login register />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="/user-blog" element={<UserBlog />} />
        <Route path="/user-webinar" element={<Webinar />} />
        <Route path="/user-booknow" element={<BookSP />} />
        <Route path="/user-search" element={<Search />} />
        <Route path="/user-bookings" element={<MyBookings />} />
        <Route path="/user-transaction" element={<TransactionHistory />} />
        <Route path="/user-emergency" element={<Emergency />} />


        {/* //serviceprovider */}
        <Route path="/service-reg2" element={<Singup />} />
        <Route path="/service-reg" element={<Singup register />} />
        <Route path="/service-attendence" element={<Attendence />} />
        <Route path="/service-bookings" element={<AcceptedBookings />} />
        <Route path="/service-login" element={<SignIn />} />
        <Route path="/service-leave" element={<Leave />} />
        <Route path="/service-dash" element={<Dashboard />} />
        <Route path="/service-rejectedbookings" element={<RejectedBookings />} />
        <Route path="/all-bookings" element={<AllBookings />} />
        <Route path="/serivce-profilee" element={<ProfileSP />} />

      </Routes>
    </div>
  );
}

export default App;