
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LocationProvider } from "./contexts/LocationContext";
import { useEffect } from "react";
import { setPageTitle } from "./utils/seoUtils";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/doctor/Dashboard";
import DoctorAppointmentsPage from "./pages/doctor/Appointments";
import ProcessAppointment from "./pages/doctor/ProcessAppointment";
import DoctorOnboardingPage from "./pages/doctor/Onboarding";
import { DoctorSchedulePage } from "./pages/doctor/Schedule";
import StaffDashboard from "./pages/staff/Dashboard";
import AddPatient from "./pages/staff/AddPatient";
import DoctorSearch from "./pages/public/DoctorSearch";
import DoctorDetails from "./pages/public/DoctorDetails";
import Reports from "./pages/public/Reports";
import Tests from "./pages/public/Tests";
import Account from "./pages/public/Account";
import Chat from "./pages/public/Chat";
import Appointments from "./pages/public/Appointments";
import ClinichubLanding from "./pages/public/ClinichubLanding";

// Map of routes to page titles
const routeTitles: Record<string, string> = {
  "/": "Home",
  "/doctor/search": "Find Doctors",
  "/appointments": "Your Appointments",
  "/reports": "Medical Reports",
  "/tests": "Medical Tests",
  "/account": "Your Account",
  "/chat": "Chat with Doctors",
  "/clinic-management": "Clinic Management",
  "/doctor": "Doctor Dashboard",
  "/doctor/appointments": "Manage Appointments",
  "/doctor/schedule": "Manage Schedule",
  "/doctor/onboarding": "Doctor Onboarding",
  "/staff": "Staff Dashboard",
  "/staff/add-patient": "Add New Patient",
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set page title based on route
    const exactRouteTitle = routeTitles[pathname];
    if (exactRouteTitle) {
      setPageTitle(exactRouteTitle);
    } else {
      // For dynamic routes like /doctor/:doctorId
      const pathSegments = pathname.split('/').filter(segment => segment);
      if (pathSegments.length > 0) {
        const baseRoute = `/${pathSegments[0]}`;
        if (routeTitles[baseRoute]) {
          setPageTitle(routeTitles[baseRoute]);
        } else {
          setPageTitle(); // Default title
        }
      }
    }
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
              {/* Patient/User Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/doctor/search" element={<DoctorSearch />} />
              <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/tests" element={<Tests />} />
              <Route path="/account" element={<Account />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/clinic-management" element={<ClinichubLanding />} />
              
              {/* Doctor Routes */}
              <Route path="/doctor" element={<DashboardPage />} />
              <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
              <Route path="/doctor/appointments/:appointmentId" element={<ProcessAppointment />} />
              <Route path="/doctor/process-appointment" element={<ProcessAppointment />} />
              <Route path="/doctor/onboarding" element={<DoctorOnboardingPage />} />
              <Route path="/doctor/schedule" element={<DoctorSchedulePage />} />
              
              {/* Staff Routes */}
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/staff/add-patient" element={<AddPatient />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LocationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
