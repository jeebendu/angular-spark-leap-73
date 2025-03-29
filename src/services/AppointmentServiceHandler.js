
import axiosInstance from "./axiosInterceptor";

export const getAppointmentById = async (id) => {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const response = await axiosInstance.get(`${BASE_URL}/v1/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw error;
  }
};
