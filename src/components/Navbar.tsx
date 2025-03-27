
import { Link } from "react-router-dom";
import { Bell, Calendar, Globe, MessageSquare, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  
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
  
  return (
    <header className={`py-3 px-4 md:px-6 sticky top-0 z-30 ${scrolled ? 'glass-header' : 'bg-white border-b'}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="sky-gradient rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="font-semibold text-lg hidden md:block">ClinicHub</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
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
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            <LanguageSwitcher />
            <Button className="sky-button rounded-full ml-2">
              <User className="h-4 w-4 mr-2" />
              {t('common.account')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
