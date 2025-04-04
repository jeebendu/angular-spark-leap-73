
import axiosInstance from "./axiosInterceptor";

export const getDoctorById = async (id: number | string) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await axiosInstance.get(`${BASE_URL}/v1/doctor/id/${id}`);
       
        return response.data;
    } catch (error: any) {
        console.error('Error fetching doctorById:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
};
