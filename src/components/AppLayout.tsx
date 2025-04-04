
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function AppLayout({ children, hideNav = false }: AppLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
      {!hideNav && <Navbar />}
      <main className={`pb-${isMobile ? '20' : '6'} flex-grow`}>
        <div className="container px-4 py-6 max-w-[1120px] mx-auto">
          {children}
        </div>
      </main>
      <Footer />
      {!hideNav && <MobileNavigation />}
    </div>
  );
}
