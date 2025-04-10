
import { Doctor, User } from "./doctor";

export type UserRole = "admin" | "doctor" | "staff" | "patient";

export interface Patient {
  id: number;
  uid:string;
  gender: any ;
  dob: Date;
  age:number;
  address: string;
  whatsappNo?: string;
  problem?:string;
  refDoctor:Doctor;
  consDoctorId?:number;
  remark?:string;
  pastRemark?:string;
  firstname:string ;
  lastname: string;
  createdTime?:Date;
  user:User;
  photoUrl?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  fullName?: string; // Added this property
  lastVisit?: string;
  medicalHistory?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  gender: string;
}
