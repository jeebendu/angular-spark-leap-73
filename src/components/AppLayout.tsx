
import { Navbar } from "@/components/public/shared/Navbar";
import { Footer } from "@/components/public/shared/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavigation } from "./public/shared/MobileNavigation";
import { useEffect } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  showMobileNav?: boolean;
}

export function AppLayout({
  children,
  showFooter = true,
  showMobileNav = true,
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
