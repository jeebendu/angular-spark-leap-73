
import { Calendar, MapPin, Star, FileText, Award, ThumbsUp, Clock } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { SearchBar } from "@/components/SearchBar";
import { DoctorCard } from "@/components/DoctorCard";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpecialtyList } from "@/components/SpecialtyList";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <AppLayout>
      <div className="container px-4 py-6">
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

        {/* Upcoming Appointments */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Your Upcoming Appointments</h2>
            <Button variant="link" className="text-primary text-sm sm:text-base">View All</Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="min-w-[280px] sm:min-w-[300px] md:min-w-0 md:w-1/2 lg:w-1/3">
              <AppointmentCard
                doctorName="Dr. Sarah Johnson"
                specialty="Cardiologist"
                date="Today, 15 May"
                time="10:00 AM"
                imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=SJ&font=montserrat"
                status="upcoming"
              />
            </div>
            <div className="min-w-[280px] sm:min-w-[300px] md:min-w-0 md:w-1/2 lg:w-1/3">
              <AppointmentCard
                doctorName="Dr. Michael Chen"
                specialty="Dermatologist"
                date="Tomorrow, 16 May"
                time="02:30 PM"
                imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=MC&font=montserrat"
                status="upcoming"
              />
            </div>
            <div className="min-w-[280px] sm:min-w-[300px] md:min-w-0 md:w-1/2 lg:w-1/3">
              <AppointmentCard
                doctorName="Dr. Emma Wilson"
                specialty="Pediatrician"
                date="18 May"
                time="11:15 AM"
                imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=EW&font=montserrat"
                status="upcoming"
              />
            </div>
          </div>
        </motion.section>

        {/* Specialties Section */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Browse by Specialty</h2>
          <SpecialtyList />
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

        {/* Popular Doctors */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Top Rated Doctors</h2>
            <Button variant="link" className="text-primary text-sm sm:text-base">View All</Button>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4 bg-white border border-gray-100 overflow-x-auto scrollbar-hide">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cardiologist">Cardiologist</TabsTrigger>
              <TabsTrigger value="dermatologist">Dermatologist</TabsTrigger>
              <TabsTrigger value="pediatrician">Pediatrician</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <DoctorCard
                  name="Dr. Melissa Thompson"
                  specialty="Cardiologist"
                  rating={4.9}
                  reviewCount={124}
                  price="₹1,200"
                  imageSrc="https://placehold.co/400x300/eaf7fc/33C3F0?text=Dr.+Thompson&font=montserrat"
                />
                <DoctorCard
                  name="Dr. James Wilson"
                  specialty="Neurologist"
                  rating={4.7}
                  reviewCount={98}
                  price="₹1,500"
                  imageSrc="https://placehold.co/400x300/eaf7fc/33C3F0?text=Dr.+Wilson&font=montserrat"
                />
                <DoctorCard
                  name="Dr. Emily Parker"
                  specialty="Dermatologist"
                  rating={4.8}
                  reviewCount={156}
                  price="₹1,350"
                  imageSrc="https://placehold.co/400x300/eaf7fc/33C3F0?text=Dr.+Parker&font=montserrat"
                />
                <DoctorCard
                  name="Dr. Robert Kim"
                  specialty="Pediatrician"
                  rating={4.9}
                  reviewCount={210}
                  price="₹1,100"
                  imageSrc="https://placehold.co/400x300/eaf7fc/33C3F0?text=Dr.+Kim&font=montserrat"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="cardiologist" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <DoctorCard
                  name="Dr. Melissa Thompson"
                  specialty="Cardiologist"
                  rating={4.9}
                  reviewCount={124}
                  price="₹1,200"
                  imageSrc="https://placehold.co/400x300/eaf7fc/33C3F0?text=Dr.+Thompson&font=montserrat"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="dermatologist" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <DoctorCard
                  name="Dr. Emily Parker"
                  specialty="Dermatologist"
                  rating={4.8}
                  reviewCount={156}
                  price="₹1,350"
                  imageSrc="https://placehold.co/400x300/eaf7fc/33C3F0?text=Dr.+Parker&font=montserrat"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="pediatrician" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <DoctorCard
                  name="Dr. Robert Kim"
                  specialty="Pediatrician"
                  rating={4.9}
                  reviewCount={210}
                  price="₹1,100"
                  imageSrc="https://placehold.co/400x300/eaf7fc/33C3F0?text=Dr.+Kim&font=montserrat"
                />
              </div>
            </TabsContent>
          </Tabs>
        </motion.section>
      </div>
    </AppLayout>
  );
};

export default Index;
