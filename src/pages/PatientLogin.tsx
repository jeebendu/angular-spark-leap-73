
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/AppLayout";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendOtp, verifyOTPAndLogin } from "@/services/authHandler";
import { useAuth } from "@/contexts/AuthContext";
import { AuthUser } from "@/types/auth";

export default function PatientLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/dashboard");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Check for redirect path stored in localStorage
    const storedPath = localStorage.getItem('redirect_after_login');
    if (storedPath) {
      setRedirectPath(storedPath);
    }
  }, []);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const authUser: AuthUser = {
        phone: phoneNumber,
        reason: "login",
        email: "",
        tenant: "patients",
        otp: "",
        authToken: "",
        userType: "patient"
      };

      const response = await sendOtp(authUser);
      if (response.success) {
        setOtpSent(true);
        toast({
          title: "Success",
          description: "OTP sent to your mobile number",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to send OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const authUser: AuthUser = {
        phone: phoneNumber,
        otp: otp,
        reason: "login",
        email: "",
        tenant: "patients",
        authToken: "",
        userType: "patient"
      };
      
      const response = await verifyOTPAndLogin(authUser);
      if (response.status) {
        toast({
          title: "Success",
          description: "Login successful",
        });
        
        login(
          localStorage.getItem("auth_token") || "",
          { name: "Patient User", mobile: phoneNumber, userType: "patient" },
          "patient"
        );
        
        // Clear the redirect path from localStorage
        const redirectTo = redirectPath;
        localStorage.removeItem('redirect_after_login');
        navigate(redirectTo);
      } else {
        toast({
          title: "Error",
          description: "Invalid OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout hideNav={true}>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Patient Login</h1>
            <p className="text-gray-600">Login to access your health portal</p>
          </div>
          
          {!otpSent ? (
            <form onSubmit={handleSendOTP}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setOtpSent(false)}
                  disabled={loading}
                >
                  Back
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Are you a doctor?{" "}
              <a href="/doctor/login" className="text-primary hover:underline">
                Doctor Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
