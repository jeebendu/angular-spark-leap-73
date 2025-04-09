import { Country, District, State } from "../shared/Address";
import { Branch } from "../shared/Branch";
import { User } from "../user/User";

export class Doctor {
  id: number | string;
  branchList?: Branch[];
  title?: string;
  firstname?: string;
  lastname?: string;
  experience?: number;
  ranking?: number;
  qualification?: string;
  username?: string;
  about?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string; // Added phone property
  city?: string;
  status?: string;
  gender?: string;
  designation?: string;
  registrationNumber?: string;
  alternativeContact?: string;
  profilePic?: string;
  image?: string; // Added image property
  specializations?: Specialization[];
  services?: DoctorService[];
  ratings?: Rating[];
  
  // Additional properties referenced in the components
  biography?: string;
  expYear?: number;
  reviewCount?: number;
  rating?: number;
  consultationFee?: string;
  education?: Education[];
  languageList?: Language[];
  clinics?: Clinic[];
}

export class DoctorService {
  id?: number | string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
}

export class Specialization {
  id: number | string;
  name: string;
  description?: string;
  icon?: string;
  category?: string;
  parentId?: number | string;
}

export class Rating {
  id?: number | string;
  rating: number;
  comment?: string;
  patientName?: string;
  date?: Date;
}

// Add missing types
export class Education {
  id?: number | string;
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export class Language {
  id?: number | string;
  name: string;
  code?: string;
}

export class Clinic {
  id: number | string;
  name: string;
  location?: string;
  branchList?: Branch[];
}

export class DoctorReview {
  id?: number | string;
  doctorId?: number | string;
  patitientList?: any[];
  rating: number;
  message?: string;
  createdTime?: string;
}

// Add search-related types
export interface DoctorSearchForm {
  doctorName?: string;
  clinicName?: string;
  gender?: number;
  expYearFirst?: number;
  expYearLast?: number;
  specialtyNames?: string[];
  languageNames?: string[];
  radius?: number;
  latitude?: number;
  longitude?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  page?: number;
  size?: number;
}

export interface DoctorSearchPageble {
  content: DoctorSearchView[];
  pageable: any;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface DoctorSearchView {
  doctorId: string;
  doctorName: string;
  specialties: string;
  averageRating: number;
  reviewCount: number;
  price: string;
  experienceYears: number;
  languages: string;
  imageSrc: string;
  clinicName?: string;
}
