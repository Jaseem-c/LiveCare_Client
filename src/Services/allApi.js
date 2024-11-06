import baseurl from './baseurl'
import { commonApi } from './commonApi'

//user register
export const registerApi = async(user)=>{
    return await commonApi(`POST`,`${baseurl}/user/register`,user,"")
}

//user login
export const loginApi = async(user)=>{
    return await commonApi('POST',`${baseurl}/user/login`,user,"")
}

//profile edit
export const editApi = async (id, user) => {
    return await commonApi('PUT', `${baseurl}/editUser/${id}`, user);
}

//admi
//get Service Providers List

export const getServiceProvidersApi=async()=>{
    return await commonApi('GET',`${baseurl}/allServiceProviders/list`,"","")
}
//get approved service providers
export const getApprovedServiceProvidersApi=async()=>{
    return await commonApi('GET',`${baseurl}/approvedServiceProviders/list`,"","")
}
//get All Users
export const getUsersApi=async()=>{
    return await commonApi('GET',`${baseurl}/users/list`,"","")
}

export const getAllBlogs = async()=>{
    return await commonApi(`GET`,`${baseurl}/blogs/all-blogs`,"","")
}

export const getOneBlog = async(id)=>{
    return await commonApi(`GET`,`${baseurl}/blogs/view-blog/${id}`,"","")
}

//admin Add blogs

export const addBlogsApi = async(reqBody,header)=>{
    return await commonApi(`POST`,`${baseurl}/blogs/add-blogs`,reqBody,header)
}

//get all webinar
export const getAllwebinarApi = async () => {
    return await commonApi(`GET`, `${baseurl}/webinar/all-webinar`, "", "")
}

//get all blogs
export const getAllBlogApi = async()=>{
    return await commonApi(`GET`,`${baseurl}/blogs/all-blogs`,"","")
}
export const addWebApi = async(reqBody,header)=>{
    return await commonApi(`POST`,`${baseurl}/webinar/add-webinar`,reqBody,header)
}
export const getAllWebsApi = async()=>{
    return await commonApi(`GET`,`${baseurl}/webinar/all-webinar`,"","")
}

//login service provider
export const serviceproviderloginApi = async(service)=>{
    return await commonApi('POST',`${baseurl}/serviceProvider/login`,service,"")
}

//get attendance

export const getAllAttendanceApi = async () => {
    return await commonApi(`GET`, `${baseurl}/service-providers/attenedence`, "", "")
}

//get all service provider

export const getAllServiceproviderApi = async (data) => {
    return await commonApi(`GET`, `${baseurl}/serviceProviders/allServiceProviders`, data, "")
}

//get all booking request
export const getAllAcceptedBookings = async () => {
    return await commonApi(`GET`, `${baseurl}/bookings/accepted-bookings`, "", "")
}

export const getAllSP = async () => {
    return await commonApi(`GET`, `${baseurl}/approvedServiceProviders/list`, "", "")
}
export const getUserAPI = async () => {
    return await commonApi(`GET`, `${baseurl}/users/list`, "", "")
}
export const getAllRejectedBookings = async () => {
    return await commonApi(`GET`, `${baseurl}/bookings/rejected-bookings`, "", "")
}

export const getAllBookingsApi = async () => {
    return await commonApi(`GET`, `${baseurl}/bookings/user-bookings`, "", "")
}



export const getAllBookingsNumberApi = async () => {
    return await commonApi(`GET`, `${baseurl}/bookings/accepted-bookings`, "", "")
}

export const getUnpaidbillsApi = async () => {
    return await commonApi(`GET`, `${baseurl}/maternalcare/primarybooking/billunpaid/view`, "", "")
}
export const getBookingAdminApi = async () => {
    return await commonApi(`GET`, `${baseurl}/bookings/accepted-bookings`, "", "")
}
export const getPaymentApi = async () => {
    return await commonApi(`GET`, `${baseurl}/transactions/alltransactions`, "", "")
    return await commonApi(`GET`, `${baseurl}`, "", "")
}

export const getuserTransactionApi = async (reqheader) => {
    return await commonApi(`GET`, `${baseurl}/user/paid-bills`, "", reqheader)
}

export const addreviewApi = async (data,reqheader) => {
    return await commonApi(`POST`, `${baseurl}/review/add-review`, data, reqheader)
}

export const viewreviewApi = async () => {
    return await commonApi(`GET`, `${baseurl}/reviews/view-reviews`, "", "")
}
export const addEmergencyApi = async (data) => {
    return await commonApi(`POST`, `${baseurl}/emergency/add-emergency`, data,"")
}

export const getEmergencyApi = async () => {
    return await commonApi(`GET`, `${baseurl}/emergency/allEmergency`, "","")
}