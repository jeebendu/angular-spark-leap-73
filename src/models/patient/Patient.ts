
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
}

export class FamilyMember {
  id: string;
  firstname: string;
  lastname: string;
  dob: Date;
  gender: string;
  relationship: string;
  phoneNumber: string;
  profileImage?: string;
  
  // Add name property as a computed getter
  get name(): string {
    return `${this.firstname} ${this.lastname}`.trim();
  }

  // Add a name setter to maintain compatibility
  set name(fullName: string) {
    const parts = fullName.split(' ');
    this.firstname = parts[0] || '';
    this.lastname = parts.slice(1).join(' ') || '';
  }
}
