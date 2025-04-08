import http from "@/lib/JwtInterceptor";
import { Patient } from "@/models/patient/Patient";

export const fetchMyProfilePatient = async () => {
    return await http.get(`/v1/patient/myprofile`);
  };
  
  export const updatePatientInfo = async (patient: Patient) => {
    return await http.post(`/v1/patient/saveOrUpdate`, patient);
  };
