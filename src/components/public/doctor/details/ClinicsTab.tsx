import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Clinic } from "@/models/clinic/Clinic";
import { Doctor } from "@/models/doctor/Doctor";
import { CalendarDays, CheckCircle2, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { BookAppointmentModal } from "../../appointments/BookAppointmentModal";

interface ClinicsTabProps {
  clinics: Clinic[];
  doctor: Doctor;
}

export const ClinicsTab = ({ clinics, doctor }: ClinicsTabProps) => {
  const [selectedClinic, setSelectedClinic] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];
  
  const handleTimeSlotSelection = (slot: string) => {
    setSelectedTimeSlot(slot);
  };
  
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">Available Clinics</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {clinics?.length > 0 ? (
          clinics.map((clinic, index) => (
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
                    <h4 className="font-medium text-base">{clinic.name}</h4>
                    <p className="text-sm text-gray-500 flex items-start mt-1">
                      <MapPin className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
                      {clinic.address}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{clinic.days}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{clinic.timings}</span>
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
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          
          <div className="md:w-1/2">
            <h4 className="font-medium mb-2">Available Slots</h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedTimeSlot === slot ? "default" : "outline"}
                  size="sm"
                  className={selectedTimeSlot === slot ? 'bg-primary text-white' : ''}
                  onClick={() => handleTimeSlotSelection(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
            
            <BookAppointmentModal 
              doctorName={doctor.name}
              specialty={doctor.specialty}
              trigger={
                <Button className="w-full sky-button mt-6" disabled={!selectedTimeSlot}>
                  Book Appointment
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
