
export interface UserInfo {
  name: string;
  mobile: string;
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
