
import { Appointment } from "@/admin/modules/appointments/types/appointment";
import { AppLayout } from "@/components/AppLayout";
import { AppointmentCard } from "@/components/public/appointments/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllAppointmentList } from "@/services/appointmentService";
import { motion } from "framer-motion";
import { Calendar, Search } from "lucide-react";
import { useEffect, useState } from "react";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);



  const getAllAppointmentListAftersearch = async (id: string) => {
    try {
        const data = await getAllAppointmentList(id);
        setSearchTerm(id);
        setAppointmentList(data.data);
        console.log("type", id);
        console.log("data", data.data);

    }catch (error) {
      console.error("Error in getAllSpecialization:", error);
    }
  };

  useEffect(() => {
    getAllAppointmentListAftersearch("UPCOMING");
  }, []);


  
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
              <Tabs 
                defaultValue="UPCOMING"
                className="w-full sm:w-auto"
                onValueChange={(value) => {
                  if (value === "UPCOMING") {
                    getAllAppointmentListAftersearch("UPCOMING"); // Replace "upcoming-id" with the actual ID or parameter
                  } else if(value === "COMPLETED") {
                    getAllAppointmentListAftersearch("COMPLETED"); // Replace "past-id" with the actual ID or parameter
                  }else {
                    getAllAppointmentListAftersearch("CANCELLED"); // Replace "cancelled-id" with the actual ID or parameter
                  }
                }}
              >
                <TabsList>
                  <TabsTrigger value="UPCOMING">Upcoming</TabsTrigger>
                  <TabsTrigger value="COMPLETED">Past</TabsTrigger>
                  <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
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
            
            
            {searchTerm === "UPCOMING" && (
              <div className="mt-0">
                    {appointmentList?.map((appointmentss, index) => (
                  <div key={index} className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AppointmentCard
                     appointment={appointmentss}
                      className="col-span-12 md:col-span-6 lg:col-span-4"
                      forUser="You"
                    />
                  </div>
                ))}
                </div>
            )}
              
              {searchTerm === "COMPLETED" && (
              <div className="mt-0">
                  {appointmentList?.map((appointmentss, index) => (
                  <div key={index} className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AppointmentCard
                     appointment={appointmentss}
                      className="col-span-12 md:col-span-6 lg:col-span-4"
                      forUser="You"
                    />
                  </div>
                ))}
              </div>
            )}
              
              {searchTerm === "CANCELLED" && (
              <div className="mt-0">
                 {appointmentList?.map((appointmentss, index) => (
                  <div key={index} className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AppointmentCard
                     appointment={appointmentss}
                      className="col-span-12 md:col-span-6 lg:col-span-4"
                      forUser="You"
                    />
                  </div>
                ))}
              </div>
            )}
           
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Need to schedule a new appointment?</h2>
            <p className="text-gray-600 mb-4">Search for doctors and book your next appointment in just a few clicks.</p>
            <Button className="sky-button">
              <Calendar className="h-4 w-4 mr-2" />
              Book an Appointment
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Appointments;
