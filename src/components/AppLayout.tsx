
import { Navbar } from "@/components/public/shared/Navbar";
import { Footer } from "@/components/public/shared/Footer";
import { MobileNavigation } from "./MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  showMobileNav?: boolean;
}

export function AppLayout({ 
  children, 
  showFooter = true,
  showMobileNav = true
}: AppLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 max-w-6xl">
        {children}
      </main>
      
      {showFooter && <Footer />}
      
      {showMobileNav && isMobile && <MobileNavigation />}
    </div>
  );
}
