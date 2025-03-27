
import { Link } from "react-router-dom";
import { Bell, Calendar, MapPin, User, Menu, ChevronDown } from "lucide-react";
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

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [otpValue, setOtpValue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const userName = "User";
  
  // Add scroll effect
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

  const handleSendOtp = () => {
    // Simulate OTP sending
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    if (otpValue.length === 6) {
      // Handle successful verification
      setIsLoggedIn(true);
      console.log("OTP verified successfully");
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityDialogOpen(false);
  };
  
  return (
    <header className={`py-3 px-4 md:px-6 sticky top-0 z-30 ${scrolled ? 'glass-header' : 'bg-white border-b'}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="https://res.cloudinary.com/dzxuxfagt/image/upload/h_100/assets/logo.png" 
              alt="ClinicHub Logo" 
              className="h-8"
            />
            {/* Removed the ClinicHub text span as requested */}
          </Link>
          
          {/* Location selection moved next to logo */}
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
                  <div className="city-icon">
                    <img src="/lovable-uploads/d82a74cb-0b37-4b2c-8189-2b22f05c214a.png" alt="Bangalore" className="city-image" />
                  </div>
                  <span className="city-name">Bangalore</span>
                </button>
                <button 
                  onClick={() => handleCitySelect("Mumbai")} 
                  className={`city-selector-card ${selectedCity === "Mumbai" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon">
                    <img src="/lovable-uploads/ee5e4d14-7a0c-42b8-8655-a67209502c36.png" alt="Mumbai" className="city-image" />
                  </div>
                  <span className="city-name">Mumbai</span>
                </button>
                <button 
                  onClick={() => handleCitySelect("Delhi")} 
                  className={`city-selector-card ${selectedCity === "Delhi" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon">
                    <img src="https://placehold.co/200/eaf7fc/33C3F0?text=DEL&font=montserrat" alt="Delhi" className="city-image" />
                  </div>
                  <span className="city-name">Delhi</span>
                </button>
                <button 
                  onClick={() => handleCitySelect("Hyderabad")} 
                  className={`city-selector-card ${selectedCity === "Hyderabad" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon">
                    <img src="https://placehold.co/200/eaf7fc/33C3F0?text=HYD&font=montserrat" alt="Hyderabad" className="city-image" />
                  </div>
                  <span className="city-name">Hyderabad</span>
                </button>
                <button 
                  onClick={() => handleCitySelect("Chennai")} 
                  className={`city-selector-card ${selectedCity === "Chennai" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon">
                    <img src="https://placehold.co/200/eaf7fc/33C3F0?text=CHE&font=montserrat" alt="Chennai" className="city-image" />
                  </div>
                  <span className="city-name">Chennai</span>
                </button>
                <button 
                  onClick={() => handleCitySelect("Kolkata")} 
                  className={`city-selector-card ${selectedCity === "Kolkata" ? "border-primary" : "border-gray-100"}`}
                >
                  <div className="city-icon">
                    <img src="https://placehold.co/200/eaf7fc/33C3F0?text=KOL&font=montserrat" alt="Kolkata" className="city-image" />
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
            
            {/* Login Dialog with updated User icon */}
            <Dialog>
              <DialogTrigger asChild>
                {isLoggedIn ? (
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-primary text-white">{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                )}
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
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              className="rounded-md border-gray-300 flex-1"
                            />
                          </div>
                        </div>
                        <Button 
                          className="w-full sky-button" 
                          onClick={handleSendOtp}
                          disabled={mobileNumber.length !== 10}
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
                              onChange={setOtpValue}
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
