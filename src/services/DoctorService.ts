import http from "@/lib/JwtInterceptor";
import { Doctor, DoctorSearchForm, DoctorSearchPageble } from "@/models/doctor/Doctor";

export const fetchDoctorDetailsById = async (id: any) => {
  return await http.get<Doctor>(`v1/public/doctor/id/${id}`);
};

export const fetchDoctorReviewsById = async (id:any) => {
  return await http.get(`/v1/doctor-review/doctor/id/${id}`);
};

export const fetchDoctorById = async (id: any) => {
  return await http.get<Doctor>(`/v1/public/doctor/id/${id}`);
};

export const fetchDoctorClinicByDoctorAndBranch = async (doctorId: any, branchId: any) => {
  return await http.get(`/v1/doctor-clinic/doctor/${doctorId}/branch/${branchId}`);
};

export const fetchAllDoctorClinics = async (searchForm: DoctorSearchForm & { page: number; size: number }) => {
  return await http.post<DoctorSearchPageble>(`/v1/public/doctor-clinic/search`, searchForm);
};

export const fetchSimilarDoctors = async (params: any) => {
  return await http.post<Doctor[]>(`/v1/public/doctor-clinic/search`, params);
};
