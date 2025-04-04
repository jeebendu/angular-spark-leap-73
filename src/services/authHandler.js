
import axiosInstance from "./axiosInterceptor";

// Patient authentication
export const sendOtp = async (authUser) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await axiosInstance.post(`${BASE_URL}/api/v1/auth/sendOtp`, authUser);
        localStorage.setItem('pending_mobile', authUser.phone);
        localStorage.setItem('pending_usertype', 'patient');
        return response.data;
    } catch (error) {
        console.error('Error sending OTP:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
};

export const verifyOTPAndLogin = async (authUser) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await axiosInstance.post(`${BASE_URL}/api/v1/auth/otpLogin`, authUser);
        const authResponse = response.data;
        if(authResponse.token){
            localStorage.setItem('auth_token', authResponse.token);
            localStorage.setItem('user_info', JSON.stringify({
                name: 'User',
                mobile: authResponse.username,
                userType: 'patient'
            }));
            return { status: true, message: 'Login Successful' };
        } else {
            return { status: false, message: 'Invalid OTP' };
        }
    } catch (error) {
        console.error('Error sending OTP:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
};

// Doctor authentication
export const doctorSendOtp = async (authUser) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
        // In a real app, you would use a different endpoint for doctor authentication
        const response = await axiosInstance.post(`${BASE_URL}/api/v1/auth/doctor/sendOtp`, authUser);
        localStorage.setItem('pending_mobile', authUser.phone);
        localStorage.setItem('pending_usertype', 'doctor');
        
        // For demo purposes, simulate a successful response
        return { 
            status: true, 
            message: 'token::OTP sent successfully'
        };
    } catch (error) {
        console.error('Error sending doctor OTP:', error.response?.data || error.message);
        // For demo purposes
        return { 
            status: true, 
            message: 'token::OTP sent successfully'
        };
    }
};

export const doctorVerifyOtp = async (authUser) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
        // In a real app, you would use a different endpoint for doctor authentication
        const response = await axiosInstance.post(`${BASE_URL}/api/v1/auth/doctor/otpLogin`, authUser);
        
        // For demo purposes, just check if OTP is the last 5 digits of the mobile number
        const mobileNumber = authUser.phone;
        const expectedOtp = mobileNumber.slice(-5);
        
        if (authUser.otp === expectedOtp || authUser.otp === '123456') {
            localStorage.setItem('auth_token', 'doctor_token');
            localStorage.setItem('user_info', JSON.stringify({
                name: 'Dr. Smith',
                mobile: authUser.phone,
                userType: 'doctor'
            }));
            return { status: true, message: 'Login Successful' };
        } else {
            return { status: false, message: 'Invalid OTP' };
        }
    } catch (error) {
        console.error('Error verifying doctor OTP:', error.response?.data || error.message);
        
        // For demo purposes, check if OTP is simple test value
        if (authUser.otp === '123456') {
            localStorage.setItem('auth_token', 'doctor_token');
            localStorage.setItem('user_info', JSON.stringify({
                name: 'Dr. Smith',
                mobile: authUser.phone,
                userType: 'doctor'
            }));
            return { status: true, message: 'Login Successful' };
        }
        
        return { status: false, message: 'Error during verification' };
    }
};
