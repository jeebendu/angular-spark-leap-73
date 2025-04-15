import http from "@/lib/JwtInterceptor";



export const fetchAllClinicListss= async () => {
    return await http.get(`/v1/clinic/public/list`);
  };

  export const fetchClinicByIds = async (id:string) => {
    return await http.get(`/v1/clinic/public/id/${id}`);
  }