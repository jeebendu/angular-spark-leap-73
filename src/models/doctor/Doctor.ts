
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
  city?: string;
  status?: string;
  gender?: string;
  designation?: string;
  registrationNumber?: string;
  alternativeContact?: string;
  profilePic?: string;
  specializations?: Specialization[];
  services?: DoctorService[];
  ratings?: Rating[];
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
