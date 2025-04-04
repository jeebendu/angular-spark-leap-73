
import axiosInstance from './axiosInterceptor.js';

export const getSpecialisationAll = async () => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL; // Replace with your actual environment variable
  
        const response = await axiosInstance.get(`${BASE_URL}/v1/public/doctor/specialization/list`);
        return response.data;
    } catch (error) {
        console.error("Error fetching specializations:", error);
    }
}

export const getSpecialisation = async (id:any) => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL; // Replace with your actual environment variable
  
        const response = await axiosInstance.get(`${BASE_URL}/v1/public/doctor/specialization/id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching specializations:", error);
    }
}


export const getLanguageList = async () => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL; // Replace with your actual environment variable
  
        const response = await axiosInstance.get(`${BASE_URL}/v1/language/public/list`);
        return response.data;
    } catch (error) {
        console.error("Error fetching specializations:", error);
    }
}




