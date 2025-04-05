
import { Calendar, Star, Award, ThumbsUp, Clock, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Specializations } from "@/components/Specializations";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { AppointmentCard } from "@/components/AppointmentCard";
import authService from "@/services/authService";

// Mock upcoming appointments data
const upcomingAppointments = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2025-04-15",
    time: "10:30 AM",
    clinicName: "Wellness Heart Clinic",
    location: "Bhubaneswar",
    status: "confirmed",
    imageSrc: "https://preview--appointify-platform-67.lovable.app/lovable-uploads/d82a74cb-0b37-4b2c-8189-2b22f05c214a.png",
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "2025-04-18",
    time: "3:15 PM",
    clinicName: "Skin Health Center",
    location: "Bhubaneswar",
    status: "confirmed",
    imageSrc: "https://preview--appointify-platform-67.lovable.app/lovable-uploads/0f62ca83-c439-4dfa-8703-5891d34eb742.png",
  }
];

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(authService.isLoggedIn());
    };
    
    checkLoginStatus();
    
    // Listen for changes to auth state (like login/logout)
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const handleViewAllAppointments = () => {
    navigate('/appointments');
  };

  return (
    <AppLayout>
      <div className="container px-4 md:px-6 py-6 max-w-[1120px] mx-auto">
        {/* Hero Section */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-xl bg-white p-4 sm:p-6 mb-6 md:p-8 overflow-hidden relative card-shadow">
            <div className="w-full text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Find and Book the Best Doctors</h1>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                  Schedule appointments with top specialists in your area
                </p>
              </motion.div>
              
              <SearchBar />
            </div>
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full opacity-10 sky-gradient"></div>
          </div>
        </motion.section>

        {/* Promotional Banner */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-10"
        >
          <div className="promo-banner">
            <img 
              src="https://preview--appointify-platform-67.lovable.app/lovable-uploads/8ecf0148-aeef-4d33-acd7-b29efebedf9d.png" 
              alt="Health Promotion" 
              className="w-full h-auto rounded-xl"
            />
          </div>
        </motion.section>

        {/* Upcoming Appointments (only shown if logged in) */}
        {isLoggedIn && upcomingAppointments.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Upcoming Appointments</h2>
              <Button 
                variant="ghost" 
                className="text-primary flex items-center"
                onClick={handleViewAllAppointments}
              >
                View all
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Specializations Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-10"
        >
          <Specializations />
        </motion.section>
      </div>
    </AppLayout>
  );
};

export default Index;
