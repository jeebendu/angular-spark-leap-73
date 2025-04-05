
import { Country, District, State } from "@/pages/DoctorSearch";

export class Branch {
  id: string; // Changed to be consistently string (not a union type)
  name: string;
  code: string;
  location: string;
  active: boolean;
  state: State; // Assuming State is another model class
  district: District; // Assuming District is another model class
  country: Country; // Assuming Country is another model class
  city: string;
  mapurl: string;
  pincode: string; // Changed to be consistently string
  image: string;
  latitude: number;
  longitude: number;
}
