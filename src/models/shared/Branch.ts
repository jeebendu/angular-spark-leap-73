
import { Country, District, State } from "./Address";

export class Branch {
  id: string; // Corresponds to Long in Java
  name: string;
  code?: string;
  location?: string;
  active?: boolean;
  state?: State; // Assuming State is another model class
  district?: District; // Assuming District is another model class
  country?: Country; // Assuming Country is another model class
  city?: string;
  mapurl?: string;
  pincode?: number;
  image?: string;
  latitude?: number;
  longitude?: number;
  address?: string; // Adding the address property to fix the error
}
