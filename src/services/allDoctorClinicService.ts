import axiosInstance from "./axiosInterceptor";




export const getAllDoctorClinic = async (params:any) => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;

        // Serialize the object into a query string
        // const queryString = new URLSearchParams(params).toString();

        const response = await axiosInstance.post(`${BASE_URL}/v1/public/doctor-clinic/search`,params);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching specializations:", error);
    }
}


export const getSimilarDoctorLists = async (params) => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;

        const response = await axiosInstance.post(`${BASE_URL}/v1/public/doctor-clinic/search`,params);
        return response.data.content;
    } catch (error) {
        console.error("Error fetching specializations:", error);
    }
}