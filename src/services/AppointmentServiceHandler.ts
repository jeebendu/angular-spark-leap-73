import { Appointments } from "@/components/BookAppointmentModal";
import axiosInstance from "./axiosInterceptor";



export const saveAppointment = async (appointment:Appointments) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    try {
        const res=await axiosInstance.post(`${BASE_URL}/v1/appointments/saveOrUpdate`,appointment);
        return res.data;
    }catch(e){
        console.log(e);
    }
    
};

export const slotByDrAndBranchId=async(slotFilter:any)=>{
    const BASE_URL = import.meta.env.VITE_BASE_URL
    try {
        const res=await axiosInstance.post(`${BASE_URL}/v1/public/doctor/slots/list-filtered`,slotFilter);
        return res.data;
    }catch(e){
        console.log(e);
    }
}

export const getAllAppointmentList = async (name:String) => {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const response = await axiosInstance.get(`${BASE_URL}/v1/appointments/patient/appointments/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error; // Re-throw the error for better error handling
  }
};