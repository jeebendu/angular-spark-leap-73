import http from "@/lib/JwtInterceptor";

export const fetchAllSpecializations = async () => {
  return await http.get(`/v1/public/doctor/specialization/list`);
};

export const fetchSpecializationById = async (id: any) => {
  return await http.get(`/v1/public/doctor/specialization/id/${id}`);
};

export const fetchLanguageList = async () => {
  return await http.get(`/v1/language/public/list`);
};