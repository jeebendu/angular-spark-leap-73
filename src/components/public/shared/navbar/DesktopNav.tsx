
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export function DesktopNav() {
  const { t } = useTranslation();
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm">
      <Link 
        to="/doctor/search" 
        className={`${isActiveRoute('/doctor') ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary transition-colors`}
      >
        {t('navbar.find_doctor')}
      </Link>
      <Link 
        to="/clinics" 
        className={`${isActiveRoute('/clinics') ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary transition-colors`}
      >
        Clinics
      </Link>
      <Link 
        to="/reports" 
        className={`${isActiveRoute('/reports') ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary transition-colors`}
      >
        {t('navbar.reports')}
      </Link>
      <Link 
        to="/tests" 
        className={`${isActiveRoute('/tests') ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary transition-colors`}
      >
        {t('navbar.tests')}
      </Link>
    </nav>
  );
}
