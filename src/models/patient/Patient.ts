
import { Country, District, State } from "../shared/Address";
import { Branch } from "../shared/Branch";
import { User } from "../user/User";


export class Patient {
  id: number;
  branch: Branch;
  user: User;
  uid?: string;
  firstname?: string;
  lastname?: string;
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
  photoUrl?: string;
}


  
export class patientHealth {
    id: string;
    patientdetails: Patient;
    height: number;
    weight: number;
    bloodGroup: string;
    allergies: string;
    currentMedication: string;
    bloodPressure: string;
    heartRate: string;
    cholesterol: string;
    bloodSugar: string;
}

export class FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  gender: string;
  phone: string;
  profileImage?: string;
  firstname?: string;
  lastname?: string;
  dob?: Date;
  phoneNumber?: string;
}
