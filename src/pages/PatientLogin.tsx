
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { sendOtp, verifyOTPAndLogin } from "@/services/authHandler";

export interface AuthUser {
  email: string | null;
  reason: "login";
  tenant: "dev";
  otp: string | null;
  authToken: string | null;
  phone: string | null;
  userType: "patient";
}

export default function PatientLogin() {
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  
  const [authUser, setAuthUser] = useState<AuthUser>({
    email: "",
    reason: "login",
    tenant: "dev",
    phone: "",
    otp: "",
    authToken: "",
    userType: "patient"
  });

  const handleMobileEmailChange = (e: any) => {
    setAuthUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOtp = async () => {
    if (authUser.phone.length !== 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10 digit mobile number",
        variant: "destructive"
      });
      return;
    }

    // Send OTP
    const success = await sendOtp(authUser);
    if (success.status) {
      setIsOtpSent(true);
      toast({
        title: "OTP Sent",
        description: `Please check your phone for the OTP`,
      });
      const token = success.message.split("::")[0];
      setAuthUser((prev) => ({ ...prev, authToken: token }));
    } else {
      toast({
        title: "Failed to send OTP",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const otpHandler = (val: string) => {
    setOtpValue(val);
    setAuthUser((prev) => ({ ...prev, otp: val }));
  };

  const handleVerifyOtp = async () => {
    if (authUser.otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6 digit OTP",
        variant: "destructive"
      });
      return;
    }

    const success = await verifyOTPAndLogin(authUser);
    if (success.status) {
      toast({
        title: "Login Successful",
        description: "Welcome back",
      });
      // Redirect to patient dashboard
      navigate("/");
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please check and try again",
        variant: "destructive"
      });
    }
  };

  return (
    <AppLayout hideNav>
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <img
              src="https://res.cloudinary.com/dzxuxfagt/image/upload/h_100/assets/logo.png"
              alt="ClinicHub Logo"
              className="h-12 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900">Patient Login</h2>
            <p className="mt-2 text-gray-600">Access your health records and appointments</p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4 mt-4">
              {!isOtpSent ? (
                <>
                  <div className="space-y-2">
                    <label htmlFor="mobile" className="text-sm font-medium">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <div className="w-[90px] mr-2">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="+91" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">
                              <div className="flex items-center">
                                <img src="https://preview--appointify-platform-67.lovable.app/lovable-uploads/8ecf0148-aeef-4d33-acd7-b29efebedf9d.png" alt="India" className="h-4 w-6 mr-2" />
                                +91
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={authUser.phone}
                        name="phone"
                        onChange={handleMobileEmailChange}
                        className="rounded-md border-gray-300 flex-1"
                      />
                    </div>

                    <label htmlFor="email" className="text-sm font-medium mt-4">
                      Email Id
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your Email id"
                      value={authUser.email}
                      name="email"
                      onChange={handleMobileEmailChange}
                      className="rounded-md border-gray-300 flex-1"
                    />
                  </div>
                  <Button
                    className="w-full bg-primary"
                    onClick={handleSendOtp}
                    disabled={authUser.phone.length !== 10}
                  >
                    Send OTP
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <label className="text-sm font-medium block mb-2 text-center">
                      Enter OTP sent to {authUser.phone}
                    </label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otpValue}
                        onChange={otpHandler}
                        className="otp-input-premium"
                      >
                        <InputOTPGroup className="gap-4">
                          <InputOTPSlot index={0} className="otp-slot" />
                          <InputOTPSlot index={1} className="otp-slot" />
                          <InputOTPSlot index={2} className="otp-slot" />
                          <InputOTPSlot index={3} className="otp-slot" />
                          <InputOTPSlot index={4} className="otp-slot" />
                          <InputOTPSlot index={5} className="otp-slot" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <p className="text-xs text-center mt-2">
                      Didn't receive the code? <button className="text-primary">Resend</button>
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      For demo: Use the last 5 digits of your mobile number as OTP
                    </p>
                  </div>
                  <Button
                    className="w-full bg-primary"
                    onClick={handleVerifyOtp}
                    disabled={otpValue.length !== 6}
                  >
                    Verify OTP
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsOtpSent(false)}
                  >
                    Go Back
                  </Button>
                </>
              )}
            </TabsContent>
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullname" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Enter your full name"
                  className="rounded-md border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="signupMobile" className="text-sm font-medium">
                  Mobile Number
                </label>
                <div className="flex">
                  <div className="w-[90px] mr-2">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="+91" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+91">
                          <div className="flex items-center">
                            <img src="https://preview--appointify-platform-67.lovable.app/lovable-uploads/8ecf0148-aeef-4d33-acd7-b29efebedf9d.png" alt="India" className="h-4 w-6 mr-2" />
                            +91
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    id="signupMobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="rounded-md border-gray-300 flex-1"
                  />
                </div>
              </div>
              <Button className="w-full bg-primary">
                Continue
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="text-center text-sm mt-4">
            <p>Are you a doctor? <a href="/doctor/login" className="text-primary font-medium">Login as doctor</a></p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
