import { FamilyMember } from "@/components/BookAppointmentModal";
import { Patient } from "./appointmentService";
import axiosInstance from "./axiosInterceptor";


export const fetchMyProfilePatient = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    try {
        const response = await axiosInstance.get(`${BASE_URL}/v1/patient/myprofile`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error.response?.data || error.message);
        return null;
    }
};


export const updatePatientInfo = async (patient:Patient) => {
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

export const getPatietRelationList = async (id:any) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await axiosInstance.get(`${BASE_URL}/v1/patient/relation-with/list/patient/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error updating patient info:', error.response?.data || error.message);
        return null;
    }
}



export const createNewPatientRelation = async (familymember:any) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await axiosInstance.post(`${BASE_URL}/v1/patient/relation-with/saveOrUpdate`,familymember);
        return response.data;
    }
    catch (error) {
        console.error('Error updating patient info:', error.response?.data || error.message);
        return null;
    }
}