import http from "@/lib/JwtInterceptor";
import { Doctor } from "@/models/doctor/Doctor";

export const fetchDoctorDetailsById = async (id: any) => {
  return await http.get<Doctor>(`/v1/doctor/id/${id}`);
};

export const fetchDoctorReviewsById = async () => {
  return await http.get(`/v1/doctor-review/doctor/id/{id}`);
};

export const fetchDoctorById = async (id: any) => {
  return await http.get<Doctor>(`/v1/doctor/id/${id}`);
};

export const fetchDoctorClinicByDoctorAndBranch = async (doctorId: any, branchId: any) => {
  return await http.get(`/v1/doctor-clinic/doctor/${doctorId}/branch/${branchId}`);
};

export const fetchAllDoctorClinics = async (params: any) => {
  return await http.post(`/v1/public/doctor-clinic/search`, params);
};

export const fetchSimilarDoctors = async (params: any) => {
  return await http.post<Doctor[]>(`/v1/public/doctor-clinic/search`, params);
};
