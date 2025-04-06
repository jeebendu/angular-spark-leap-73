
import { Phone, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AppDownloadSection() {
  return (
    <div className="bg-gradient-to-r from-primary/90 to-primary rounded-xl overflow-hidden shadow-md">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-white pr-0 md:pr-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Download the ClinicHub App
              </h3>
              <p className="text-white/90 mb-6 text-base md:text-lg">
                Book appointments, track health records, and get medication reminders all in one place.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm md:text-base">Secure & Private</h4>
                    <p className="text-white/80 text-xs md:text-sm">Your health data stays private</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm md:text-base">Fast Booking</h4>
                    <p className="text-white/80 text-xs md:text-sm">Book appointments in seconds</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a href="#" className="block">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Download on Google Play"
                    className="h-12 w-auto"
                  />
                </a>
                <a href="#" className="block">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on App Store" 
                    className="h-12 w-auto" 
                  />
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="relative w-48 md:w-64 h-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent rounded-2xl"></div>
                <img 
                  src="https://res.cloudinary.com/dzxuxfagt/image/upload/h_100/assets/logo.png" 
                  alt="ClinicHub App"
                  className="mx-auto z-10 relative"
                />
              </div>
              <div className="absolute top-8 -right-2 md:right-8 bg-white/10 backdrop-blur-lg rounded-full p-6 shadow-lg">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div className="absolute bottom-12 -left-2 md:left-12 bg-white/10 backdrop-blur-lg rounded-full p-4 shadow-lg">
                <div className="flex items-center justify-center h-10 w-10">
                  <span className="text-white font-bold text-lg">24/7</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
