import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clinic } from "@/models/clinic/Clinic";
import { Doctor } from "@/models/doctor/Doctor";
import { CalendarDays, CheckCircle2, Clock, MapPin } from "lucide-react";
import { BookAppointmentModal } from "../../appointments/BookAppointmentModal";
import { format } from "date-fns";
import { Branch } from "@/models/shared/Branch";

interface ClinicsTabProps {
  doctor: Doctor;
  branch: Branch[]
}

export const ClinicsTab = ({ doctor, branch}: ClinicsTabProps) => {
  const [selectedClinic, setSelectedClinic] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];
  
  // Group time slots for better display
  const morningSlots = timeSlots.filter(time => 
    time.includes('AM') || time === "12:00 PM" || time === "12:30 PM"
  );
  const afternoonSlots = timeSlots.filter(time => 
    time.includes('PM') && !time.includes('12:') && !time.includes('05:')
  );
  const eveningSlots = timeSlots.filter(time => 
    time.includes('05:') && time.includes('PM')
  );
  
  const handleTimeSlotSelection = (slot: string) => {
    setSelectedTimeSlot(slot);
    // Open modal directly at step 3 since clinic and date/time are already selected
    setIsModalOpen(true);
  };
  
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">Available Clinics</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {branch?.length > 0 ? (
          branch.map((branch, index) => (
            <Card
              key={index}
              className={`cursor-pointer border-2 ${
                selectedClinic === index ? "border-primary" : "border-gray-100"
              }`}
              onClick={() => setSelectedClinic(index)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-base">{branch.name}</h4>
                    <p className="text-sm text-gray-500 flex items-start mt-1">
                      <MapPin className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
                      {branch.location + ", " + branch.city + ", " + branch.state?.name + ", " + branch.country?.name}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>branch.days</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>branch.timings</span>
                    </div>
                  </div>
                  {selectedClinic === index && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No clinics available.</p>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Select Appointment Date & Time</h3>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 items-center justify-center flex">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-white w-full max-w-full shadow-sm"
              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg border h-full p-4">
              {date ? (
                <div className="space-y-3">
                  <h4 className="text-md font-medium mb-1">
                    Available Slots for {format(date, "EEEE, MMMM d")}
                  </h4>
                  
                  {morningSlots.length > 0 && (
                    <div className="mb-2">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Morning</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {morningSlots.map((time) => (
                          <Button
                            key={time}
                            variant="outline"
                            className={`text-sm h-10 ${
                              selectedTimeSlot === time ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white" : ""
                            }`}
                            onClick={() => handleTimeSlotSelection(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {afternoonSlots.length > 0 && (
                    <div className="mb-2">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Afternoon</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {afternoonSlots.map((time) => (
                          <Button
                            key={time}
                            variant="outline"
                            className={`text-sm h-10 ${
                              selectedTimeSlot === time ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white" : ""
                            }`}
                            onClick={() => handleTimeSlotSelection(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {eveningSlots.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Evening</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {eveningSlots.map((time) => (
                          <Button
                            key={time}
                            variant="outline"
                            className={`text-sm h-10 ${
                              selectedTimeSlot === time ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white" : ""
                            }`}
                            onClick={() => handleTimeSlotSelection(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>Please select a date to view available slots</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* BookAppointmentModal with controlled open state and initial step set to 3 */}
      {branch?.length > 0 && (
        <BookAppointmentModal 
          doctor={doctor}
          doctorName={doctor.firstname + " " + doctor.lastname}
          specialty={doctor.designation}
          initialClinicId={branch[selectedClinic]?.id.toString()}
          initialStep={3}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          trigger={<div className="hidden" />}
        />
      )}
    </div>
  );
};
