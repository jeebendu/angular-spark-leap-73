import http from "@/lib/JwtInterceptor";




export const fetchAllStateLists = async () => {
    return await http.get(`/v1/state/list`);
  };


  export const fetchAllDistrictLists = async () => {
    return await http.get(`/v1/district/list`);
  };