
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Appointments as AppointmentObject } from "@/components/BookAppointmentModal";
import { getAllAppointmentList } from "@/services/PatientappointmentService";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("upcoming");
  const [appointmentList, setAppointmentList] = useState<AppointmentObject[]>([]);



  const getAllAppointmentListAftersearch = async (id: string) => {
    try {
        const data = await getAllAppointmentList(id);
        setSearchTerm(id);
        setAppointmentList(data);
        console.log("type", id);
        console.log("data", data);

    }catch (error) {
      console.error("Error in getAllSpecialization:", error);
    }
  };

  useEffect(() => {
    getAllAppointmentListAftersearch("upcoming");
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
                defaultValue="upcoming"
                className="w-full sm:w-auto"
                onValueChange={(value) => {
                  if (value === "upcoming") {
                    getAllAppointmentListAftersearch("upcoming"); // Replace "upcoming-id" with the actual ID or parameter
                  } else {
                    getAllAppointmentListAftersearch("completed"); // Replace "past-id" with the actual ID or parameter
                  }
                }}
              >
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Past</TabsTrigger>
                </TabsList>
              </Tabs>




              {/*               
              <div className="relative w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 bg-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div> */}
            </div>

            <Tabs defaultValue="past">
              <TabsContent value="past" className="mt-0">
                {appointmentList?.map((appointment, index) => (
                  <div key={index} className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AppointmentCard
                      doctorName={appointment.doctorClinic?.doctor?.user?.name || "Unknown"}
                      specialty={appointment.doctorClinic?.doctor?.specialization || "Unknown"}
                      date={
                        appointment.slot?.date instanceof Date
                          ? `${appointment.slot.date.getFullYear()}-${String(appointment.slot.date.getMonth() + 1).padStart(2, '0')}-${String(appointment.slot.date.getDate()).padStart(2, '0')}` // Format Date object to YYYY-MM-DD
                          : (() => {
                              const parsedDate = new Date(appointment.slot?.date);
                              return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`; // Parse string to Date and format
                            })()
                      }
                      time={
                        appointment.slot?.startTime instanceof Date
                          ? appointment.slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Format Date object to hh:mm
                          : new Date(appointment.slot?.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Parse string to Date and format
                      }
                      imageSrc={appointment.doctorClinic?.doctor?.image || "https://placehold.co/200/eaf7fc/33C3F0?text=SJ&font=montserrat"}
                      status={searchTerm}
                      
                    />
                  </div>
                ))}
              </TabsContent>

               {/* <TabsContent value="past" className="mt-0">
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
                </div>
              </TabsContent> */}

              {/* <TabsContent value="cancelled" className="mt-0">
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
              </TabsContent> */}
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
