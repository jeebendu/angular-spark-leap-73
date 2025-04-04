import axiosInstance from "./axiosInterceptor";


export const getDoctorById = async (id:any) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    try {
        const response = await axiosInstance.get(`${BASE_URL}/v1/doctor/id/${id}`);
       
        return response.data;
    } catch (error) {
        console.error('Error fetching doctorById:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
};


export const getDoctorClinicDRAndBranchId=async(doctorId:any,branchId:any)=>{
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL; // Replace with your actual environment variable
        const response = await axiosInstance.get(`${BASE_URL}/v1/doctor-clinic/doctor/${doctorId}/branch/${branchId}`);  
        return response.data;
    } catch (error) {
        console.log("Something went wrong")
    }
}