import { Clinic } from "@/services/appointmentService";
import { BaseModel, Pageable, Sort } from "../shared/BaseModel";
import { Branch } from "../shared/Branch";
import { Patient } from "../patient/Patient";

export interface Doctor {
    id: number;
    firstname: string;
    name: string;
    lastname: string;
    about: string;
    specialty: string;
    qualification: string;
    desgination: string;
    email: string;
    expYear: number;
    specializationList: Specialization[];
    clinics: Clinic[];
    languageList:Language[];
    branchList:Branch[];
    serviceList:DoctorService[];
    reviewList:DoctorReview[];
    patitientList:Patient[];
    phone:string;
    pincode:string;
    joiningDate:Date;
    biography: string;
    rating: number;
    reviewCount: number;
    consultationFee: string;
    bio: string;
    education: Education[];
    services: string[];
    profileImageUrl: string;
    
  }

  export interface DoctorPageble {
    content: Doctor[]; 
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  }

  export interface Education extends BaseModel {
    degree: string;
    institute: string;
    year: string;
  } 

  export interface Specialization extends BaseModel {} 

  export interface DoctorService extends BaseModel {}
  
  export interface Language extends BaseModel {}
  
 
  export interface DoctorReview{
    id: number;
    like: number;
    dislike: number;
    message: string;
    rating: number;
    isrecommended: boolean;
    patitientList:Patient[];
    doctor:Doctor;
  }
  