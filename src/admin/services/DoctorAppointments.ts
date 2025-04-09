
import http from "@/lib/JwtInterceptor";

export const appointmentListByDoctorId = async (doctorId: number,page:number,size:number) => {
  return await http.get(`v1/appointments/doctor/${doctorId}?page=${page}&size=${size}`);  
};

