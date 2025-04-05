import http from "@/lib/JwtInterceptor";
import { Appointments } from "@/components/BookAppointmentModal";

export const saveOrUpdateAppointment = async (appointment: Appointments) => {
  return await http.post(`/v1/appointments/saveOrUpdate`, appointment);
};

export const fetchSlotsByDoctorAndBranch = async (slotFilter: any) => {
  return await http.post(`/v1/public/doctor/slots/list-filtered`, slotFilter);
};

export const getAllAppointmentList = async (name: any) => {
  return await http.get(`/v1/appointments/patient/appointments/${name}`);
};