
import http from "@/lib/JwtInterceptor";
import { Doctor } from "@/models/Doctor";

export const fetchDoctorById = async (id: number) => {
  return await http.get(`/v1/public/doctor/${id}`);
};

export const fetchDoctorReviewsById = async (id: number) => {
  return await http.get(`/v1/public/doctor/reviews/${id}`);
};

export const fetchDoctorClinicByDoctorAndBranch = async (doctorId: number, branchId: number) => {
  return await http.get(`/v1/public/doctor-clinic/doctor/${doctorId}/branch/${branchId}`);
};

export const fetchAllDoctorClinics = async () => {
  return await http.get(`/v1/public/doctor-clinic/list`);
};

export const fetchSimilarDoctors = async (specialties: any[], latitude: number, longitude: number) => {
  // Implementation depends on your API structure
  return await http.post(`/v1/public/doctor/similar`, {
    specialties,
    latitude,
    longitude
  });
};
