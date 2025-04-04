import { Appointments } from "@/components/BookAppointmentModal";
import axiosInstance from "./axiosInterceptor";


export const getAllAppointmentList = async (name: any): Promise<Appointments[]> => {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const response = await axiosInstance.get<Appointments[]>(`${BASE_URL}/v1/appointments/patient/appointments/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error; 
  }
};