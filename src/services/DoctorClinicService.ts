import http from "@/lib/JwtInterceptor";

export const getDoctorClinicDRAndBranchId = async (doctorId: any, branchId: any) => {
    return await http.get(`/v1/doctor-clinic/doctor/${doctorId}/branch/${branchId}`);
  };