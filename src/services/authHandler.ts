
import axiosInstance from './axiosInterceptor';

export interface AuthUser {
  email: string | null;
  reason: "login";
  tenant: "dev";
  otp: string | null;
  authToken: string | null;
  phone: string | null;
  userType: "patient" | "doctor";
}

export const sendOtp = async (authUser: AuthUser) => {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const response = await axiosInstance.post(`${BASE_URL}/v1/public/otp/send`, {
      email: authUser.email,
      reason: authUser.reason,
      tenant: authUser.tenant,
      phone: authUser.phone,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { status: false, message: "Failed to send OTP" };
  }
};

export const verifyOTPAndLogin = async (authUser: AuthUser) => {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const response = await axiosInstance.post(`${BASE_URL}/v1/public/otp/verify`, {
      otp: authUser.otp,
      email: authUser.email,
      reason: authUser.reason,
      tenant: authUser.tenant,
      phone: authUser.phone,
      authToken: authUser.authToken,
    });

    if (response.data.status) {
      // Store auth token in localStorage
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user_info', JSON.stringify(response.data.data.user));
      localStorage.setItem('user_type', 'patient');
    }
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { status: false, message: "Failed to verify OTP" };
  }
};

export const doctorSendOtp = async (authUser: AuthUser) => {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const response = await axiosInstance.post(`${BASE_URL}/v1/public/doctor/otp/send`, {
      email: authUser.email,
      reason: authUser.reason,
      tenant: authUser.tenant,
      phone: authUser.phone,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending doctor OTP:", error);
    return { status: false, message: "Failed to send OTP" };
  }
};

export const doctorVerifyOtp = async (authUser: AuthUser) => {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const response = await axiosInstance.post(`${BASE_URL}/v1/public/doctor/otp/verify`, {
      otp: authUser.otp,
      email: authUser.email,
      reason: authUser.reason,
      tenant: authUser.tenant,
      phone: authUser.phone,
      authToken: authUser.authToken,
    });

    if (response.data.status) {
      // Store auth token in localStorage
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user_info', JSON.stringify(response.data.data.user));
      localStorage.setItem('user_type', 'doctor');
    }
    return response.data;
  } catch (error) {
    console.error("Error verifying doctor OTP:", error);
    return { status: false, message: "Failed to verify OTP" };
  }
};
