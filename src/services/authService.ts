import { AuthUser } from '@/components/Navbar';


// Types for authentication
export interface LoginResponse {
  token: string;
  user: {
    name: string;
    mobile: string;
    // Other user properties
  };
}

export interface UserInfo {
  name: string;
  mobile: string;
  // Other user properties
}

class AuthService {
  // Function to check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Function to get the current user info from local storage
  getCurrentUser(): UserInfo | null {
    const userStr = localStorage.getItem('user_info');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user info from localStorage', error);
      return null;
    }
  }

  // Function to send OTP to mobile number
  async sendOtp(authUser: AuthUser): Promise<boolean> {
    try {
     
      // In a real app, this would call the API to send OTP
      // For demo, we'll simulate it
      console.log(`OTP sent to ${authUser.phone}`);
      
      // Store the mobile number to verify later
      localStorage.setItem('pending_mobile', authUser.phone);
      
      return true;
    } catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  }








  // Function to verify OTP
  async verifyOtp(otp: string): Promise<boolean> {
    try {
      // In a real app, this would call the API to verify OTP
      // For demo, we'll check if OTP is the last 5 digits of the mobile number
      const mobileNumber = localStorage.getItem('pending_mobile') || '';
      const expectedOtp = mobileNumber.slice(-5);
      
      if (otp === expectedOtp) {
        // Generate a random token
        const token = this.generateRandomToken();
        
        // Store token and user info
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_info', JSON.stringify({
          name: 'User',
          mobile: mobileNumber
        }));
        
        // Clean up
        localStorage.removeItem('pending_mobile');
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  }

  // Function to logout
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
  }

  // Helper function to generate a random token
  private generateRandomToken(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
