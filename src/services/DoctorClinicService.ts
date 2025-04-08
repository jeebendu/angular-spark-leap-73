
import http from "@/lib/JwtInterceptor";
import { DoctorSearchForm, DoctorSearchPageble } from "@/models/doctor/Doctor";

export const getDoctorClinicDRAndBranchId = async (doctorId: any, branchId: any) => {
    return await http.get(`/v1/doctor-clinic/doctor/${doctorId}/branch/${branchId}`);
  };

export const searchDoctorClinics = async (searchParams: DoctorSearchForm, page: number = 0, size: number = 10) => {
  return await http.post<DoctorSearchPageble>('/v1/public/doctor-clinic/search', {
    ...searchParams,
    page,
    size
  });
};
