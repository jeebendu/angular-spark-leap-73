
export interface UserInfo {
  name: string;
  mobile: string;
  userType?: 'patient' | 'doctor';
  // Add other user properties as needed
}

export interface LoginResponse {
  token: string;
  user: UserInfo;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  token: string | null;
}

export interface AuthUser {
  phone: string;
  otp?: string;
  reason: "login";
  email?: string;
  tenant?: string;
  authToken?: string;
  userType: 'patient' | 'doctor';
}

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
  branchList?: any[];
  clinics?: any[];
  user?: any;
}

export interface FamilyMember {
  id?: number;
  name: string;
  dob?: Date;
  relationship?: string;
  mobile?: string;
  email?: string;
  patientId?: number;
}
