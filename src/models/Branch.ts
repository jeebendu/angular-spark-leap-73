
import { Country, District, State } from "@/pages/DoctorSearch";

export class Branch {
  id: number | string; // Modified to accept both number and string id types
  name: string;
  code: string;
  location: string;
  active: boolean;
  state: State; // Assuming State is another model class
  district: District; // Assuming District is another model class
  country: Country; // Assuming Country is another model class
  city: string;
  mapurl: string;
  pincode: number | string; // Modified to accept both number and string
  image: string;
  latitude: number;
  longitude: number;
}
