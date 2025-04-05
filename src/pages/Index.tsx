
import { Calendar, Star, Award, ThumbsUp, Clock, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Specializations } from "@/components/Specializations";
import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

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
