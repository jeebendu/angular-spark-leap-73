
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { MobileNavigation } from "./MobileNavigation";
import { Navbar } from "./Navbar";

export interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
  isRequiredLogin?: number;
}

export const AppLayout = ({ children, hideNav = false, isRequiredLogin }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!hideNav && <Navbar />}
      <main className="flex-grow">{children}</main>
      <Footer />
      {!hideNav && <MobileNavigation />}
    </div>
  );
};
