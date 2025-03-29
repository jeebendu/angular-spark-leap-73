import axiosInstance from "./axiosInterceptor";


export const getDoctorById = async (id) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    try {
        const response = await axiosInstance.get(`${BASE_URL}/v1/doctor/id/${id}`);
       
        return response.data;
    } catch (error) {
        console.error('Error fetching doctorById:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
};