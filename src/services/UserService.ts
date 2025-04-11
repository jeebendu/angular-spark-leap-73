import http from "@/lib/JwtInterceptor";

export const uploadProfileImage = async (id: number,formData:FormData) => {

  return await http.post(`/v1/users/id/${id}/upload-profile-image`,formData);

};
