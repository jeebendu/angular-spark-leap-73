
export interface UserInfo {
  name: string;
  mobile: string;
  userType?: string;
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
  email: string | null;
  reason: "login";
  tenant: "dev";
  otp: string | null;
  authToken: string | null;
  phone: string | null;
  userType?: "patient" | "doctor";
}
