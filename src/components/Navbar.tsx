import { Link } from "react-router-dom";
import { Bell, Calendar, MapPin, User, Menu, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import authService from "@/services/authService";
import { sendOtp } from "@/services/authHandler"; 
import { verifyOTPAndLogin } from "@/services/authHandler";
import { AuthUser } from "@/types/auth";

import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar({isRequiredLogin}) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [otpValue, setOtpValue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string, mobile: string } | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = authService.isLoggedIn();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        setUserInfo(authService.getCurrentUser());
      }
    };

    checkAuth();

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleSendOtp = async () => {
    if (authUser.phone.length !== 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10 digit mobile number",
        variant: "destructive"
      });
      return;
    }

    const success = await sendOtp(authUser);
    console.log("success");
    if (success.status) {
      setIsOtpSent(true);
      toast({
        title: "OTP Sent",
        description: `Please enter the last 5 digits of ${authUser.phone} as OTP`,
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
      setLoginDialogOpen(false);
      setIsLoggedIn(true);
      setUserInfo(authService.getCurrentUser());

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

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUserInfo(null);

    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityDialogOpen(false);
  };

  const resetLoginForm = () => {
    setMobileNumber("");
    setOtpValue("");
    setIsOtpSent(false);
  };

  const handleMobileEmailChange = (e: any) => {
    setAuthUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const otpHandler = (val: string) => {
    console.log(val)
    setOtpValue(val)
    setAuthUser((prev) => ({ ...prev, otp: val}));
  }

  useEffect(() => {
    if (isRequiredLogin) {
      setLoginDialogOpen(true);
      console.log("Login required:", isRequiredLogin);
    }
  }, [isRequiredLogin]);

  return (
    <header className={`py-3 px-4 md:px-6 sticky top-0 z-30 ${scrolled ? 'glass-header' : 'bg-white border-b'}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dzxfagt/image/upload/h_100/assets/logo.png"
              alt="ClinicHub Logo"
              className="h-8"
            />
          </Link>

          <Dialog open={cityDialogOpen} onOpenChange={setCityDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="gap-2 text-sm font-medium ml-2">
                <MapPin className="text-primary h-4 w-4" />
                <span className="font-medium">{selectedCity}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-8 bg-white modal-background">
              <div className="absolute right-4 top-4">
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </div>
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-semibold mb-8">Select your city</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <button
                  onClick={() => handleCitySelect("Bangalore")}
                  className={`city-selector-card ${selectedCity === "Bangalore" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon bg-sky-50 p-3 rounded-full">
                    <span className="text-2xl">🏙️</span>
                  </div>
                  <span className="city-name">Bangalore</span>
                </button>
                <button
                  onClick={() => handleCitySelect("Mumbai")}
                  className={`city-selector-card ${selectedCity === "Mumbai" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon bg-sky-50 p-3 rounded-full">
                    <span className="text-2xl">🌇</span>
                  </div>
                  <span className="city-name">Mumbai</span>
                </button>
                <button
                  onClick={() => handleCitySelect("Delhi")}
                  className={`city-selector-card ${selectedCity === "Delhi" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon bg-sky-50 p-3 rounded-full">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <span className="city-name">Delhi</span>
                </button>
                <button
                  onClick={() => handleCitySelect("Hyderabad")}
                  className={`city-selector-card ${selectedCity === "Hyderabad" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon bg-sky-50 p-3 rounded-full">
                    <span className="text-2xl">🏯</span>
                  </div>
                  <span className="city-name">Hyderabad</span>
                </button>
                <button
                  onClick={() => handleCitySelect("Chennai")}
                  className={`city-selector-card ${selectedCity === "Chennai" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon bg-sky-50 p-3 rounded-full">
                    <span className="text-2xl">🌴</span>
                  </div>
                  <span className="city-name">Chennai</span>
                </button>
                <button
                  onClick={() => handleCitySelect("Kolkata")}
                  className={`city-selector-card ${selectedCity === "Kolkata" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon bg-sky-50 p-3 rounded-full">
                    <span className="text-2xl">🌉</span>
                  </div>
                  <span className="city-name">Kolkata</span>
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              {t('common.home')}
            </Link>
            <Link to="/tests" className="text-sm font-medium hover:text-primary transition-colors">
              {t('common.tests')}
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              {t('header.healthPackages')}
            </Link>
            <Link to="/reports" className="text-sm font-medium hover:text-primary transition-colors">
              {t('common.reports')}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground relative hidden md:flex">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            <LanguageSwitcher />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-primary text-white">
                      {userInfo?.name.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{userInfo?.name || 'User'}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/appointments" className="flex items-center w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>My Appointments</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/account" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
                                    <SelectItem value="+1">
                                      <div className="flex items-center">
                                        <span className="w-6 mr-2">🇺🇸</span>
                                        +1
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="+44">
                                      <div className="flex items-center">
                                        <span className="w-6 mr-2">🇬🇧</span>
                                        +44
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
                                onChange={(e) => handleMobileEmailChange(e)}
                                className="rounded-md border-gray-300 flex-1"
                              />
                            </div>

                            <label htmlFor="email" className="text-sm font-medium">
                             Email Id
                            </label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your Email id "
                              value={authUser.email}
                              name="email"
                              onChange={(e) => handleMobileEmailChange(e)}
                              className="rounded-md border-gray-300 flex-1"
                            />
                          </div>
                          <Button
                            className="w-full sky-button"
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
                              Enter OTP sent to {mobileNumber}
                            </label>
                            <div className="flex justify-center">
                              <InputOTP
                                maxLength={6}
                                value={otpValue}
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
                            <p className="text-xs text-gray-500 text-center">
                              For demo: Use the last 5 digits of your mobile number as OTP
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
                                    <img src="https://preview--appointify-platform-67.lovable.app/lovable-uploads/8ecf0148-aeef-4d33-acd7-b29efebedf9d.png" alt="India" className="h-4 w-6 mr-2" />
                                    +91
                                  </div>
                                </SelectItem>
                                <SelectItem value="+1">
                                  <div className="flex items-center">
                                    <span className="w-6 mr-2">🇺🇸</span>
                                    +1
                                  </div>
                                </SelectItem>
                                <SelectItem value="+44">
                                  <div className="flex items-center">
                                    <span className="w-6 mr-2">🇬🇧</span>
                                    +44
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
            )}

            {isMobile && (
              <Button variant="ghost" size="icon" className="text-muted-foreground ml-1">
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
