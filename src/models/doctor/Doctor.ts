
import { Clinic } from "@/services/appointmentService";
import { BaseModel, Pageable, Sort } from "../shared/BaseModel";
import { Branch } from "../shared/Branch";
import { Patient } from "../patient/Patient";
import { Country, District, State } from "../shared/Address";
import { User } from "../user/User";

export interface Doctor {
  id: number;
  uid: string;
  firstname: string;
  lastname: string;
  external: boolean;
  desgination: string;
  expYear: number;
  email: string;
  phone: string;
  qualification: string;
  joiningDate: string;
  about: string;
  image: string;
  pincode: string;
  city: string;
  biography: string;
  gender: number;
  verified: boolean;
  percentages: any[]; // Adjust type if percentages have a specific structure
  specializationList: Specialization[];
  specialization:string;
  serviceList: DoctorService[];
  branchList: Branch[];
  languageList: Language[];
  user: User;
  district: District;
  state: State;
  country: Country;
  education?: Education[]; // Added as optional

  //temp
  consultationFee: any;
  reviewCount: number;
  rating: number;
  clinics: Clinic[]; // Array of Clinic objects
}

export interface DoctorClinic {
  id: number;
  clinic: Clinic;
  doctor: Doctor;
}

export interface DoctorSearchView {
  doctorId: number;
  doctorName: string;
  clinicId: number;
  clinicName: string;
  gender: number;
  experienceYears: number;
  city: string;
  specialties: string;
  languages: string;
  averageRating: number;
  reviewCount: number;
  price: number;
  imageSrc: string;
}

export interface DoctorSearchPageble {
  content: DoctorSearchView[]; 
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

export interface DoctorSearchForm {
  doctorName?: string; // Doctor's name (optional)
  clinicName?: string; // Clinic's name (optional)
  gender?: number; // Gender as a number (optional)
  expYearFirst?: number; // Minimum experience years (optional)
  expYearLast?: number; // Maximum experience years (optional)
  clinicList?: Clinic[]; // Array of Clinic objects (optional)
  radius?: number; // Search radius (optional)
  latitude?: number; // Latitude as a number (optional)
  longitude?: number; // Longitude as a number (optional)
  city?: string; // City name (optional)
  rating?: number; // Minimum rating (optional)
  specialtyNames?: string[]; // Array of specialty names (optional)
  languageNames?: string[]; // Array of language names (optional)
  sortBy?: string; // Sorting field (optional)
  sortDirection?: "ASC" | "DESC"; // Sorting direction (optional)
}

export interface Education extends BaseModel {
  degree: string;
  institute: string;
  year: string;
}

export interface Specialization extends BaseModel {}

export interface DoctorService extends BaseModel {}

export interface Language extends BaseModel {}

export interface DoctorReview {
  id: number;
  like: number;
  dislike: number;
  message: string;
  rating: number;
  isrecommended: boolean;
  patitientList: Patient[];
  doctor: Doctor;
  createdTime: Date;
}
