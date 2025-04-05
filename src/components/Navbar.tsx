import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocationSelector } from "@/components/LocationSelector";
import { Menu, X, User, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendOtp, verifyOTPAndLogin } from "@/services/authHandler";
import { AuthUser } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { Navigate, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { auth, logout, isDoctor } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const authUser: AuthUser = {
        phone: phone,
        reason: "login",
        userType: "patient"
      };
      
      const result = await sendOtp(authUser);
      
      if (result.success) {
        setShowOtpInput(true);
        toast({
          title: "OTP sent",
          description: "OTP has been sent to your phone number",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const authUser: AuthUser = {
        phone: phone,
        otp: otp,
        reason: "login",
        userType: "patient"
      };
      
      const result = await verifyOTPAndLogin(authUser);
      
      if (result.status) {
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        });
        setLoginOpen(false);
        window.location.reload();
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
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to={isDoctor ? "/doctor/dashboard" : "/dashboard"} className="flex items-center gap-2">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-lg font-bold text-primary">ClinicHub</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-4 ml-4">
            <Link to={isDoctor ? "/doctor/dashboard" : "/dashboard"} className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            {!isDoctor && (
              <>
                <Link to="/doctor/search" className="text-sm font-medium hover:text-primary">
                  Find Doctor
                </Link>
                <Link to="/appointments" className="text-sm font-medium hover:text-primary">
                  Appointments
                </Link>
              </>
            )}
            {isDoctor && (
              <>
                <Link to="/doctor/appointments" className="text-sm font-medium hover:text-primary">
                  My Appointments
                </Link>
                <Link to="/doctor/patients" className="text-sm font-medium hover:text-primary">
                  My Patients
                </Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <LocationSelector />
          <LanguageSwitcher />
          
          {auth.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 group">
                  <User size={18} className="group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">{auth.user?.name}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/account">My Account</Link>
                </DropdownMenuItem>
                {!isDoctor && (
                  <DropdownMenuItem asChild>
                    <Link to="/appointments">My Appointments</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                  <Button>Login</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{showOtpInput ? 'Enter OTP' : 'Login'}</DialogTitle>
                    <DialogDescription>
                      {showOtpInput 
                        ? 'Enter the OTP sent to your phone' 
                        : 'Sign in to your account using your phone number'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {!showOtpInput ? (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input 
                          id="phone" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 xxxxxxxxxx" 
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="otp">One-Time Password</Label>
                        <Input 
                          id="otp" 
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP" 
                        />
                      </div>
                    </div>
                  )}
                  
                  <DialogFooter>
                    {showOtpInput ? (
                      <div className="flex w-full justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowOtpInput(false)}
                          disabled={isLoading}
                        >
                          Back
                        </Button>
                        <Button 
                          onClick={handleVerifyOtp}
                          disabled={isLoading || !otp}
                        >
                          {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={handleLogin}
                        disabled={isLoading || !phone}
                      >
                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" asChild>
                <Link to="/doctor/login">For Doctors</Link>
              </Button>
            </>
          )}
        </div>
        
        <button onClick={toggleMobileMenu} className="md:hidden">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <div className="space-y-2">
              <LocationSelector />
              <LanguageSwitcher />
            </div>
            
            <nav className="space-y-2">
              <Link 
                to={isDoctor ? "/doctor/dashboard" : "/dashboard"} 
                className="block py-2 text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              {!isDoctor && (
                <>
                  <Link 
                    to="/doctor/search" 
                    className="block py-2 text-sm font-medium hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Find Doctor
                  </Link>
                  <Link 
                    to="/appointments" 
                    className="block py-2 text-sm font-medium hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Appointments
                  </Link>
                </>
              )}
              {isDoctor && (
                <>
                  <Link 
                    to="/doctor/appointments" 
                    className="block py-2 text-sm font-medium hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Appointments
                  </Link>
                  <Link 
                    to="/doctor/patients" 
                    className="block py-2 text-sm font-medium hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Patients
                  </Link>
                </>
              )}
            </nav>
            
            {auth.isAuthenticated ? (
              <div className="pt-2 border-t">
                <Button 
                  variant="ghost"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full justify-start"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="pt-2 border-t space-y-2">
                <Button 
                  className="w-full"
                  onClick={() => {
                    setLoginOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    navigate("/doctor/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  For Doctors
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
