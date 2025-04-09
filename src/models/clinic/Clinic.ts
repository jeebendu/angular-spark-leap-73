
import { Branch } from "../shared/Branch";

export interface Clinic {
  id: string; // Corresponds to Long in Java
  name: string;
  email: string;
  contact: string;
  address: string;
  branchList: Branch[];
  days: string;
  timings: string;
  
  // Additional properties that might be used in components
  location?: string;
  clinicType?: string;
  consultationFees?: string;
  specialties?: string[];
  doctorCount?: number;
  rating?: number;
  reviewCount?: number;
  images?: string[];
}
