
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <AppLayout>
      <div className="container px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-6">Your Appointments</h1>
          
          <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <Tabs defaultValue="upcoming" className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 bg-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <Tabs defaultValue="upcoming">
              <TabsContent value="upcoming" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AppointmentCard
                    doctorName="Dr. Sarah Johnson"
                    specialty="Cardiologist"
                    date="Today, 15 May"
                    time="10:00 AM"
                    imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=SJ&font=montserrat"
                    status="upcoming"
                  />
                  <AppointmentCard
                    doctorName="Dr. Michael Chen"
                    specialty="Dermatologist"
                    date="Tomorrow, 16 May"
                    time="02:30 PM"
                    imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=MC&font=montserrat"
                    status="upcoming"
                  />
                  <AppointmentCard
                    doctorName="Dr. Emma Wilson"
                    specialty="Pediatrician"
                    date="18 May"
                    time="11:15 AM"
                    imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=EW&font=montserrat"
                    status="upcoming"
                  />
                  <AppointmentCard
                    doctorName="Dr. David Patel"
                    specialty="Orthopedic"
                    date="20 May"
                    time="09:30 AM"
                    imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=DP&font=montserrat"
                    status="upcoming"
                  />
                  <AppointmentCard
                    doctorName="Dr. Lisa Wang"
                    specialty="Neurologist"
                    date="22 May"
                    time="03:45 PM"
                    imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=LW&font=montserrat"
                    status="upcoming"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="past" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AppointmentCard
                    doctorName="Dr. James Wilson"
                    specialty="Cardiologist"
                    date="10 May"
                    time="11:30 AM"
                    imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=JW&font=montserrat"
                    status="completed"
                    className="opacity-70"
                  />
                  <AppointmentCard
                    doctorName="Dr. Emily Parker"
                    specialty="Dermatologist"
                    date="05 May"
                    time="09:15 AM"
                    imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=EP&font=montserrat"
                    status="completed"
                    className="opacity-70"
                  />
                  <AppointmentCard
                    doctorName="Dr. Robert Kim"
                    specialty="Pediatrician"
                    date="28 Apr"
                    time="02:00 PM"
                    imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=RK&font=montserrat"
                    status="completed"
                    className="opacity-70"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="cancelled" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AppointmentCard
                    doctorName="Dr. Melissa Thompson"
                    specialty="Neurologist"
                    date="12 May"
                    time="04:30 PM"
                    imageSrc="https://placehold.co/200/eaf7fc/33C3F0?text=MT&font=montserrat"
                    status="cancelled"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Need to schedule a new appointment?</h2>
            <p className="text-gray-600 mb-4">Search for doctors and book your next appointment in just a few clicks.</p>
            <Button className="sky-button">
              <Calendar className="h-4 w-4 mr-2" />
              Book an Appointment...
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Appointments;
