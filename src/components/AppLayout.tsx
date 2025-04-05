
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
      <Navbar />
      <main className={`pb-${isMobile ? '20' : '6'} flex-grow`}>
        {children}
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}
