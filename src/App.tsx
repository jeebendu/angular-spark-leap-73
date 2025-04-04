
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LocationProvider } from "./contexts/LocationContext";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tests from "./pages/Tests";
import Reports from "./pages/Reports";
import Chat from "./pages/Chat";
import Account from "./pages/Account";
import Appointments from "./pages/Appointments";
import DoctorSearch from "./pages/DoctorSearch";
import DoctorDetails from "./pages/DoctorDetails";
import AppointmentDetails from "./pages/AppointmentDetails";
import PatientLogin from "./pages/PatientLogin";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Patient Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<PatientLogin />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/account" element={<Account />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/:id" element={<AppointmentDetails />} />
            <Route path="/doctor-search" element={<DoctorSearch />} />
            <Route path="/doctor/:id" element={<DoctorDetails />} />
            
            {/* Doctor Routes */}
            <Route path="/doctor/login" element={<DoctorLogin />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
