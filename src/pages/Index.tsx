
import { Calendar, Star, Award, ThumbsUp, Clock, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Specializations } from "@/components/Specializations";
import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [allSpecialtiesOpen, setAllSpecialtiesOpen] = useState(false);
  const [showSpecialties, setShowSpecialties] = useState(false); // Temporarily hide specialties

  const handleViewAllAppointments = () => {
    navigate("/appointments");
  };

  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-[1120px] mx-auto">
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
                className={isMobile ? "hidden" : "block"}
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

        {/* Upcoming Appointments */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Your Upcoming Appointments</h2>
            <Button 
              variant="link" 
              className="text-primary text-sm sm:text-base flex items-center"
              onClick={handleViewAllAppointments}
            >
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="appointment-row">
            <div className="appointment-card-small">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src="https://placehold.co/200/eaf7fc/33C3F0?text=SJ&font=montserrat" 
                    alt="Dr. Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Dr. Sarah Johnson</h3>
                  <p className="text-xs text-gray-500">Cardiologist</p>
                  <div className="flex items-center mt-2 text-xs">
                    <Calendar className="h-3 w-3 mr-1 text-primary" />
                    <span>Today, 10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="appointment-card-small">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src="https://placehold.co/200/eaf7fc/33C3F0?text=MC&font=montserrat" 
                    alt="Dr. Michael Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Dr. Michael Chen</h3>
                  <p className="text-xs text-gray-500">Dermatologist</p>
                  <div className="flex items-center mt-2 text-xs">
                    <Calendar className="h-3 w-3 mr-1 text-primary" />
                    <span>Tomorrow, 02:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="appointment-card-small">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src="https://placehold.co/200/eaf7fc/33C3F0?text=EW&font=montserrat" 
                    alt="Dr. Emma Wilson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Dr. Emma Wilson</h3>
                  <p className="text-xs text-gray-500">Pediatrician</p>
                  <div className="flex items-center mt-2 text-xs">
                    <Calendar className="h-3 w-3 mr-1 text-primary" />
                    <span>18 May, 11:15 AM</span>
                  </div>
                </div>
              </div>
            </div>
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

        {/* Specializations Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-10"
        >
          <Specializations />
        </motion.section>

        {/* Key Features */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Why Choose ClinicHub</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="border-none card-shadow">
              <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full sky-gradient flex items-center justify-center mb-3">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="font-medium mb-2">Top Specialists</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Access to board-certified specialists with extensive experience</p>
              </CardContent>
            </Card>
            <Card className="border-none card-shadow">
              <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full sky-gradient flex items-center justify-center mb-3">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="font-medium mb-2">24/7 Availability</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Book appointments anytime with our easy-to-use platform</p>
              </CardContent>
            </Card>
            <Card className="border-none card-shadow sm:col-span-2 md:col-span-1">
              <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full sky-gradient flex items-center justify-center mb-3">
                  <ThumbsUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="font-medium mb-2">Patient Satisfaction</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Thousands of 5-star reviews from satisfied patients</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </AppLayout>
  );
};

export default Index;
