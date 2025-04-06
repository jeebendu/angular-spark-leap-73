
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CitySelector } from "@/components/navbar/CitySelector";
import { NavbarUserMenu } from "@/components/navbar/NavbarUserMenu";
import { LoginDialog } from "@/components/navbar/LoginDialog";
import { MobileMenu } from "@/components/navbar/MobileMenu";
import { DesktopNav } from "@/components/navbar/DesktopNav";
import { NotificationBell } from "@/components/navbar/NotificationBell";
import authService from "@/services/authService";

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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
