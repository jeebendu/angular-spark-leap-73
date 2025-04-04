import axiosInstance from './axiosInterceptor.js';
 
export const getDoctorDetails = async (id:any) => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL; // Replace with your actual environment variable
 
        const response = await axiosInstance.get(`${BASE_URL}/v1/doctor/id/${id}`);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching specializations:", error);
    }
 
}



export const getReviewsBYDoctorId = async () => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL; // Replace with your actual environment variable
 
        const response = await axiosInstance.get(`${BASE_URL}/v1/doctor-review/doctor/id/{id}`);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching specializations:", error);
    }
 
}

