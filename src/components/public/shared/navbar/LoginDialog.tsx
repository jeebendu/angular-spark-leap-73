
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { AuthUser } from "@/models/user/User";
import authService from "@/services/authService";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { verifyOtpAndLoginApi, sendOtpApi } from "@/services/authService";

export function LoginDialog({ isLogin }) {
  const [otpValue, setOtpValue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoding, setIsLoding] = useState(false);


  const [authUser, setAuthUser] = useState<AuthUser>({
    email: "",
    reason: "login",
    tenant: "dev",
    phone: "",
    otp: "",
    authToken: ""
  });


  useEffect(() => {
    if (isLogin) {
      setLoginDialogOpen(true)
    }
  }, [isLogin]);

  const resetLoginForm = () => {
    setMobileNumber("");
    setOtpValue("");
    setIsOtpSent(false);
  };


  const handleSendOtp = async () => {

    // if (authUser.phone.length !== 10) {
    //   toast({
    //     title: "Invalid mobile number",
    //     description: "Please enter a valid 10 digit mobile number",
    //     variant: "destructive"
    //   });
    //   return;
    // }

    setIsLoding(true);
    // Send OTP
    const success = await sendOtpApi(authUser);
    if (success.status) {
      setIsLoding(false);
      setIsOtpSent(true);
      toast({
        title: "OTP Sent",
        description: `Please enter OTP here`,
      });
      const token = success.data.message.split("::")[0];
      setAuthUser((prev) => ({ ...prev, authToken: token }));

    } else {
      toast({
        title: "Failed to send OTP",
        description: "Please try again",
        variant: "destructive"
      });
    }
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

    const success = await verifyOtpAndLoginApi(authUser);
    if (success.status) {
      // Close dialog and update state
      setLoginDialogOpen(false);
      // setUserInfo(authService.getCurrentUser());

      toast({
        title: "Login Successful",
        description: "You are now logged in",
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please check and try again",
        variant: "destructive"
      });
    }
  };

  const handleMobileEmailChange = (e: any) => {
    setAuthUser((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Assign to AuthUser

  }
  const otpHandler = (val: string) => {
    setOtpValue(val)
    setAuthUser((prev) => ({ ...prev, otp: val }));

  }

  return (
    <Dialog open={loginDialogOpen} onOpenChange={(open) => {
      setLoginDialogOpen(open);
      if (!open) resetLoginForm();
    }}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md premium-login-dialog bg-white modal-background">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">Login / Sign Up</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            {!isOtpSent ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-sm font-medium">
                    Email Id
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
                              <span className="w-6 mr-2">IN</span>
                              +91
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter your email"
                      name="email"
                      value={authUser.email}
                      onChange={(e) => handleMobileEmailChange(e)}
                      className="rounded-md border-gray-300 flex-1"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    For demo: OTP will be the last 5 digits of your mobile number
                  </p>
                </div>

                <Button
                  className="w-full sky-button"
                  onClick={handleSendOtp}
                  disabled={!authUser.email}
                >
             Send OTP
                </Button>

              </>
            ) : (
              <>
                <div className="space-y-4">
                  <label className="text-sm font-medium block mb-2 text-center">
                    Enter OTP sent to {mobileNumber}
                  </label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={authUser.otp}
                      onChange={(e) => otpHandler(e)}
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

                </div>
                <Button
                  className="w-full sky-button"
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
                          <span className="w-6 mr-2">IN</span> +91
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
            <Button className="w-full sky-button">
              Continue
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
