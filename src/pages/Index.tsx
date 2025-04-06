
import { Calendar, Star, Award, ThumbsUp, Clock, ChevronRight, Phone, Laptop, Users, LockKeyhole } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { SearchBar } from "@/components/public/doctor-search/SearchBar";
import { Button } from "@/components/ui/button";
import { Specializations } from "@/components/Specializations";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { AppointmentCard } from "@/components/AppointmentCard";
import { PromotionalBanner } from "@/components/PromotionalBanner";
import { AppDownloadSection } from "@/components/public/home/AppDownloadSection";
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
        {/* Hero Section */}
        <motion.section 
          className="mb-8 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full text-center mb-4">
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
            
            <div className="py-8">
              <SearchBar />
            </div>
          </div>
        </motion.section>

        {/* Upcoming Appointments (only shown if logged in) */}
        {isLoggedIn && upcomingAppointments.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
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

        {/* Promotional Banner */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-10"
        >
          <PromotionalBanner 
            title="Consult with specialist doctors online"
            subtitle="Get medical advice from the comfort of your home"
            buttonText="Start for free"
            buttonLink="/doctor-search"
            bgColor="bg-[#0ABAB5]"
          />
        </motion.section>

        {/* Specializations Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-10"
        >
          <Specializations />
        </motion.section>
        
        {/* Why Choose ClinicHub Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-10 bg-white rounded-xl shadow-sm py-12 px-6"
        >
          <div className="text-center mb-10">
            <h2 className="text-primary font-semibold text-sm uppercase tracking-wide">WHY CHOOSE US</h2>
            <h3 className="text-2xl font-bold mt-2">Why ClinicHub is Right for You</h3>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              We're committed to providing you with the best healthcare experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4 hover:bg-gray-50 rounded-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Verified Doctors</h4>
              <p className="text-gray-500 text-sm">
                All our doctors are verified and have undergone strict quality checks
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 hover:bg-gray-50 rounded-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Easy Scheduling</h4>
              <p className="text-gray-500 text-sm">
                Book appointments with just a few clicks and manage them effortlessly
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 hover:bg-gray-50 rounded-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Save Time</h4>
              <p className="text-gray-500 text-sm">
                No more waiting in lines. Online booking saves your valuable time
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 hover:bg-gray-50 rounded-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                <LockKeyhole className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">100% Privacy</h4>
              <p className="text-gray-500 text-sm">
                Your medical information is secure and private with our advanced protection
              </p>
            </div>
          </div>
        </motion.section>
        
        {/* App Download Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-10"
        >
          <AppDownloadSection />
        </motion.section>
    </AppLayout>
  );
};

export default Index;
