
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { CitySelector } from "@/components/public/shared/navbar/CitySelector";
import { NavbarUserMenu } from "@/components/public/shared/navbar/NavbarUserMenu";
import { LoginDialog } from "@/components/public/shared/navbar/LoginDialog";
import { MobileMenu } from "@/components/public/shared/navbar/MobileMenu";
import { DesktopNav } from "@/components/public/shared/navbar/DesktopNav";
import { NotificationBell } from "@/components/public/shared/navbar/NotificationBell";
import authService from "@/services/authService";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {verifyLoginApi} from "@/services/authService";
import { AuthUser } from "@/models/user/User";

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string, mobile: string } | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser>({
    email: "",
    reason: "login",
    tenant: "dev",
    phone: "",
    otp: "",
    authToken: ""
  });


  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = authService.isLoggedIn();
      setIsLoggedIn(loggedIn);
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

    const checkAuth =async () => {
      const loggedIn = await verifyLoginApi();
      setIsLoggedIn(loggedIn.data);

      if (loggedIn.data) {
        setUserInfo(authService.getCurrentUser());
      }
    };

    checkAuth();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);


  return (
    <header className={`py-2 px-2 md:px-6 sticky top-0 z-30 ${scrolled ? 'glass-header' : 'bg-white border-b'}`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link to="/" className="flex items-center">
            <img 
              src="https://res.cloudinary.com/dzxuxfagt/image/upload/h_100/assets/logo.png" 
              alt="ClinicHub Logo" 
              className="h-8 w-auto object-contain"
            />
          </Link>
          
          <CitySelector selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        </div>
        
        <div className="flex items-center gap-1 md:gap-6">
          <DesktopNav />
          
          <div className="flex items-center gap-1 md:gap-3">
            <NotificationBell />
            <LanguageSwitcher />
            
            {isLoggedIn ? (
              <NavbarUserMenu />
            ) : (
              <LoginDialog />
            )}
            
            {isMobile && <MobileMenu />}
          </div>
        </div>
      </div>
    </header>
  );
}
