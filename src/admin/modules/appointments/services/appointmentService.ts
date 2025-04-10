
import http from "@/lib/JwtInterceptor";

export interface AppointmentQueryParams {
  page: number;
  size: number;
  doctorId?: number;
  status?: string;
  fromDate?: string;
  toDate?: string;
  searchTerm?: String;
  branches:Number[];
  statuses:String[];

}

/**
 * Fetches appointments by doctor ID with pagination support
 */
export const fetchAppointmentsByDoctorId = async (params: AppointmentQueryParams) => {
  const { doctorId, page, size, status, fromDate, toDate ,branches,statuses,searchTerm} = params;
  let url = `v1/appointments/doctor/${doctorId}?page=${page}&size=${size}`;
  
  if (status) url += `&status=${status}`;
  if (fromDate) url += `&fromDate=${fromDate}`;
  if (toDate) url += `&toDate=${toDate}`;
  
  const filter={
    branches:branches,
    statuses:statuses,
    searchTerm:searchTerm
  }

  return await http.post(url,filter);
};

/**
 * Fetches all appointments with pagination support
 */
export const fetchAllAppointments = async (params: AppointmentQueryParams) => {
  const { page, size, status, fromDate, toDate } = params;
  let url = `v1/appointments?page=${page}&size=${size}`;
  
  if (status) url += `&status=${status}`;
  if (fromDate) url += `&fromDate=${fromDate}`;
  if (toDate) url += `&toDate=${toDate}`;
  
  return await http.get(url);
};
