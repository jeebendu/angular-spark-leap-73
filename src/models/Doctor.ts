
import { Branch } from "./Branch";

export interface Doctor {
  id: number;
  firstname: string;
  lastname: string;
  qualification?: string;
  biography?: string;
  rating?: number;
  reviewCount?: number;
  consultationFee?: number;
  expYear?: number;
  specializationList: Array<{id?: number; name: string}>;
  languageList: Array<{id?: number; name: string}>;
  branchList?: Branch[];
  clinics?: any[];
  user?: any;
  education?: Array<{degree: string; institute: string; year: string}>;
  services?: string[];
  languages?: string[];
}
