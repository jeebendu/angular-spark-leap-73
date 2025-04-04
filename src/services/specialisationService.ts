
import axiosInstance from "./axiosInterceptor";

export const getSpecialisation = async () => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axiosInstance.get(`${BASE_URL}/v1/public/doctor/specialization/list`);
        return response.data;
    } catch (error) {
        console.error("Error fetching specializations:", error);
        throw error;
    }
};
