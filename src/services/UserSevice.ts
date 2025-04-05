import { AuthUser } from "@/components/Navbar";
import http from "@/lib/JwtInterceptor";
import { Patient } from "@/models/Patient";

export const sendOtpApi = async (authUser: AuthUser) => {
    return await http.post(`/api/v1/auth/sendOtp`, authUser);
  };
  
  export const verifyOtpAndLoginApi = async (authUser: AuthUser) => {
    return await http.post(`/api/v1/auth/otpLogin`, authUser);
  };
  
  export const verifyLoginApi = async () => {
    return await http.get(`/api/v1/auth/isVerifyLogin`);
  };

export const fetchMyProfilePatient = async () => {
  return await http.get(`/v1/patient/myprofile`);
};

export const updatePatientInfo = async (patient: Patient) => {
  return await http.post(`/v1/patient/saveOrUpdate`, patient);
};

export const getPatietRelationList = async (id: any) => {
  return await http.get(`/v1/patient/relation-with/list/patient/${id}`);
};

export const createNewPatientRelation = async (familymember: any) => {
  return await http.post(`/v1/patient/relation-with/saveOrUpdate`, familymember);
};