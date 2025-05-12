
// Shared doctor model used by both web and mobile platforms
export interface DoctorBase {
  id: number;
  uid: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  qualification: string;
  specialization?: string;
  specializationList?: SpecializationBase[];
  expYear?: number;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  about?: string;
}

export interface SpecializationBase {
  id: number;
  name: string;
}

export interface DoctorSearchParams {
  searchTerm?: string;
  specialization?: string;
  rating?: number;
  experience?: number;
  page: number;
  limit: number;
}
