import { Branch } from "./Branch";
import { Clinic } from "./Clinic";
import { BaseModel } from "./BaseModel";
import { Patient } from "./Patient";

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
  