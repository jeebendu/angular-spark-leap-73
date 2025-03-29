import axiosInstance from "./axiosInterceptor";


export const fetchMyProfilePatient = async (id) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    try {
        const response = await axiosInstance.get(`${BASE_URL}/v1/patient/myprofile`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error.response?.data || error.message);
        return null;
    }
};


export const updatePatientInfo = async (patient) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await axiosInstance.post(`${BASE_URL}/v1/patient/saveOrUpdate`, patient);
        return response.data;
    }
    catch (error) {
        console.error('Error updating patient info:', error.response?.data || error.message);
        return null;
    }


}