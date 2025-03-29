import axiosInstance from "./axiosInterceptor";


export const sendOtp = async (authUser) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    try {
        const response = await axiosInstance.post(`${BASE_URL}/api/v1/auth/sendOtp`, authUser);
        localStorage.setItem('pending_mobile', authUser.phone);
        return response.data;
    } catch (error) {
        console.error('Error sending OTP:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
};


export const verifyOTPAndLogin = async (authUser) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    try {
        const response = await axiosInstance.post(`${BASE_URL}/api/v1/auth/otpLogin`, authUser);
        //   localStorage.setItem('pending_mobile', authUser.phone);

        const authResponse = response.data;
        if(authResponse.token){
            localStorage.setItem('auth_token', authResponse.token);
            localStorage.setItem('user_info', JSON.stringify({
                name: 'User',
                mobile: authResponse.username
            }));
            return { status: true, message: 'Login Successfull'};
        }else{
            return { status: false, message: 'Invalid OTP' };
        }
    } catch (error) {
        console.error('Error sending OTP:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
};


