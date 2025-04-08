import { Clinic } from "../clinic/Clinic";
import { Doctor } from "../doctor/Doctor";

export interface DoctorClinic {
    id: number;
    doctor: Doctor;
    clinic: Clinic;
  }