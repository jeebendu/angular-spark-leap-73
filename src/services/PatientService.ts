
import http from "@/lib/JwtInterceptor";
import { FamilyMember, Patient, patientHealth } from "@/models/patient/Patient";

export const fetchMyProfilePatient = async () => {
  return await http.get(`/v1/patient/myprofile`);
};
  
export const updatePatientInfo = async (patient: Patient) => {
  return await http.post(`/v1/patient/saveOrUpdate`, patient);
};

export const fetchFamilyMembers = async (id: any) => {
  return await http.get(`/v1/patient/relation-with/list/patient/${id}`);
};

export const fetchFamilyMemeberList = async (id: any) => {
  return await http.get(`/v1/patient/relation-with/list/patient/${id}`);
};
  
export const createNewPatientRelation = async (familymember: any) => {
  return await http.post(`/v1/patient/relation-with/saveOrUpdate`, familymember);
};

export const deleteFamilyMember = async (id: string) => {
  return await http.delete(`/v1/patient/relation-with/${id}`);
};

export const healthDetailsByPatientId = async (id: any) => {
  return await http.get(`/v1/patient-health/patient/1`);
};

export const saveOrUpdatePatientHealth = async (healthInfo: patientHealth) => {
  return await http.post(`/v1/patient-health/saveOrUpdate`, healthInfo);
};
