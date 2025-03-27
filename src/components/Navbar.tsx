
import { Link } from "react-router-dom";
import { Bell, Calendar, Globe, MapPin, MessageSquare, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
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

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [otpValue, setOtpValue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  
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
      console.log("OTP verified successfully");
    }
  };
  
  return (
    <header className={`py-3 px-4 md:px-6 sticky top-0 z-30 ${scrolled ? 'glass-header' : 'bg-white border-b'}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="sky-gradient rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="font-semibold text-lg hidden md:block">ClinicHub</span>
        </Link>
        
        <div className="flex items-center gap-3 mr-4">
          <MapPin className="text-primary h-4 w-4 block" />
          <Select defaultValue="bangalore">
            <SelectTrigger className="border-0 px-0 py-0 h-auto w-auto bg-transparent focus:ring-0 font-medium">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
            </SelectContent>
          </Select>
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
            <Button variant="ghost" size="icon" className="text-muted-foreground hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground relative hidden md:flex">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            <LanguageSwitcher />
            
            {/* Login Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="sky-button rounded-full">
                  <User className="h-4 w-4 mr-2" />
                  {!isMobile && t('common.account')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md glass-morphism border-0 bg-white/90 backdrop-blur-lg">
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
                          <Input
                            id="mobile"
                            type="tel"
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="rounded-md border-gray-300"
                          />
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
                        <div className="space-y-2">
                          <label className="text-sm font-medium block mb-2 text-center">
                            Enter OTP sent to {mobileNumber}
                          </label>
                          <div className="flex justify-center">
                            <InputOTP 
                              value={otpValue} 
                              onChange={setOtpValue}
                              maxLength={6}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
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
                    {/* Same logic as login but with additional fields if needed */}
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
                      <Input
                        id="signupMobile"
                        type="tel"
                        placeholder="Enter your mobile number"
                        className="rounded-md border-gray-300"
                      />
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
