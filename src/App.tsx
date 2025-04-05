
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
import DashboardPage from "./pages/doctor/Dashboard";
import DoctorAppointmentsPage from "./pages/doctor/Appointments";
import ProcessAppointment from "./pages/doctor/ProcessAppointment";
import DoctorOnboardingPage from "./pages/doctor/Onboarding";
import { DoctorSchedulePage } from "./pages/doctor/Schedule";
import ClinicRegistration from "./pages/ClinicRegistration";
import ClinicManagementLanding from "./pages/ClinicManagementLanding";

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LocationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/doctor-search" element={<DoctorSearch />} />
              <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/tests" element={<Tests />} />
              <Route path="/account" element={<Account />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/clinic-management" element={<ClinicManagementLanding />} />
              <Route path="/clinic-registration" element={<ClinicRegistration />} />
              <Route path="*" element={<NotFound />} />
              
              {/* Doctor Routes */}
              <Route path="/doctor" element={<DashboardPage />} />
              <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
              <Route path="/doctor/appointments/:appointmentId" element={<ProcessAppointment />} />
              <Route path="/doctor/process-appointment" element={<ProcessAppointment />} />
              <Route path="/doctor/onboarding" element={<DoctorOnboardingPage />} />
              <Route path="/doctor/schedule" element={<DoctorSchedulePage />} />
            </Routes>
          </BrowserRouter>
        </LocationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
