
import http from "@/lib/JwtInterceptor";
import { FamilyMember, Patient } from "@/models/patient/Patient";

export const fetchMyProfilePatient = async () => {
  return await http.get(`/v1/patient/myprofile`);
};

export const updatePatientInfo = async (patient: Patient) => {
  return await http.post(`/v1/patient/saveOrUpdate`, patient);
};

// Family member services
export const fetchFamilyMembers = async () => {
  return await http.get(`/v1/patient/family-members`);
};

export const addFamilyMember = async (familyMember: FamilyMember) => {
  return await http.post(`/v1/patient/family-members`, familyMember);
};

export const updateFamilyMember = async (familyMember: FamilyMember) => {
  return await http.put(`/v1/patient/family-members/${familyMember.id}`, familyMember);
};

export const deleteFamilyMember = async (id: string) => {
  return await http.delete(`/v1/patient/family-members/${id}`);
};
