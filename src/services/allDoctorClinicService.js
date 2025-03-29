
// Rename the file to have the correct extension
import axiosInstance from "./axiosInterceptor";

export const getAllDoctorClinic = async () => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axiosInstance.get(`${BASE_URL}/v1/doctor-clinic/list`);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching doctor clinics:", error);
        throw error;
    }
};
