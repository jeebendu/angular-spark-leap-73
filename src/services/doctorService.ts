
import http from "@/lib/JwtInterceptor";

export const fetchDoctorDetailsById = async (id: any) => {
  return await http.get(`/v1/doctor/id/${id}`);
};

export const fetchDoctorReviewsById = async (id: any) => {
  return await http.get(`/v1/doctor-review/doctor/id/${id}`);
};

export const fetchDoctorById = async (doctorId: number) => {
  return await http.get(`/v1/public/doctor/${doctorId}`);
};

export const fetchDoctorClinicByDoctorAndBranch = async (doctorId: number, branchId: number) => {
  return await http.get(`/v1/public/doctor-clinic/doctor/${doctorId}/branch/${branchId}`);
};

export const fetchAllDoctorClinics = async (params: any) => {
  return await http.post(`/v1/public/doctor-clinic/search`, params);
};

export const fetchSimilarDoctors = async (searchData: any) => {
  return await http.post(`/v1/public/doctor/search-near-by-doctors`, searchData);
};
