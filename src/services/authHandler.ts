import { AuthUser } from "@/components/Navbar";
import { sendOtpApi, verifyLoginApi, verifyOtpAndLoginApi } from "./UserSevice";

export const sendOtp = async (authUser: AuthUser) => {
  try {
    const response = await sendOtpApi(authUser);
    localStorage.setItem("pending_mobile", authUser.phone);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const verifyOTPAndLogin = async (authUser: AuthUser) => {
  try {
    const response = await verifyOtpAndLoginApi(authUser);

    const authResponse = response.data;
    if (authResponse.token) {
      localStorage.setItem("auth_token", authResponse.token);
      localStorage.setItem(
        "user_info",
        JSON.stringify({
          name: "User",
          mobile: authResponse.username,
        })
      );
      return { status: true, message: "Login Successful" };
    } else {
      return { status: false, message: "Invalid OTP" };
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const verifyLogin = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) return false;

    const response = await verifyLoginApi();
    return response.data;
  } catch (error) {
    return false;
  }
};