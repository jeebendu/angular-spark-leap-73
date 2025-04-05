
import { Branch } from "./Branch";
import { User } from "./User";
import { Country, District, State } from "@/pages/DoctorSearch";

export class Patient {
  id: number;
  branch: Branch;
  user: User;
  uid?: string;
  firstname: string;
  lastname: string;
  dob?: Date;
  age?: number;
  gender?: string;
  alternativeContact?: string;
  whatsappNo?: string;
  address?: string;
  city?: string;
  country?: Country;
  state?: State;
  district?: District;
}

export interface FamilyMember {
    id: string;
    relationship: string;
    name: string;
  }
