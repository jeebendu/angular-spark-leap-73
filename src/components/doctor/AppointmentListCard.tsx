
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye, Phone, Mail, MapPin, CalendarClock } from "lucide-react";
import { AppointmentDetails } from "@/models/Appointment";
import { format } from "date-fns";

interface AppointmentListCardProps {
  appointment: AppointmentDetails;
  onStartAppointment?: (appointmentId: string) => void;
  onViewAppointment: (appointment: AppointmentDetails) => void;
}

export function AppointmentListCard({ 
  appointment, 
  onStartAppointment,
  onViewAppointment
}: AppointmentListCardProps) {
  const {
    id,
    patientName,
    appointmentNumber,
    selectedDate,
    selectedTime,
    visitType,
    email,
    phone,
    isNew,
    status,
    age,
    gender,
    lastVisitDate,
    nextVisitDate,
    consultationFee
  } = appointment;
  
  const formattedDate = selectedDate ? 
    format(new Date(selectedDate), "dd MMM yyyy") : 
    "Date not specified";
    
  const formattedTime = selectedTime || "Time not specified";

  const statusColors = {
    upcoming: "bg-blue-50 text-blue-600 border-blue-200",
    completed: "bg-green-50 text-green-600 border-green-200",
    cancelled: "bg-red-50 text-red-600 border-red-200"
  };
  
  const statusText = {
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled"
  };

  // Get colored indicator based on visit type
  const getVisitTypeIndicator = () => {
    switch(visitType) {
      case "Video Call":
        return (
          <div className="p-2 bg-blue-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
              <path d="M15 10l5 5V9l-5 5" /><path d="M20 4H9.5A2.5 2.5 0 0 0 7 6.5v11A2.5 2.5 0 0 0 9.5 20H20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
            </svg>
          </div>
        );
      case "Audio Call": 
        return (
          <div className="p-2 bg-purple-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
              <path d="M3 5v14c0 2 1.5 3 3 3h12c1.5 0 3-1 3-3V5c0-2-1.5-3-3-3H6C4.5 2 3 3 3 5z"></path>
              <circle cx="12" cy="14" r="4"></circle>
              <line x1="12" y1="6" x2="12.01" y2="6"></line>
            </svg>
          </div>
        );
      case "Direct Visit":
        return (
          <div className="p-2 bg-green-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-600">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="M9 14h6"></path>
              <path d="M9 18h6"></path>
              <path d="M12 10h.01"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-600">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`border ${status === "cancelled" ? "border-l-4 border-l-red-500" : "border-gray-100"} shadow-sm hover:shadow-md transition-shadow`}>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-3 items-center">
              {getVisitTypeIndicator()}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium text-[#333]">{patientName}</h3>
                  <span className="text-xs text-gray-500">{appointmentNumber}</span>
                  {isNew && <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded">New</span>}
                  {age && gender && (
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                      {age} yrs • {gender}
                    </span>
                  )}
                  {consultationFee && (
                    <span className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full">
                      ${consultationFee}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs text-gray-600">{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs text-gray-600">{formattedTime}</span>
                  </div>
                </div>
                {(lastVisitDate || nextVisitDate) && (
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    {lastVisitDate && (
                      <div className="flex items-center gap-1">
                        <CalendarClock className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-xs text-gray-600">Last: {lastVisitDate}</span>
                      </div>
                    )}
                    {nextVisitDate && (
                      <div className="flex items-center gap-1">
                        <CalendarClock className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-xs text-gray-600">Next: {nextVisitDate}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className={`text-xs font-medium px-3 py-1 rounded-full border ${status ? statusColors[status] : statusColors.upcoming}`}>
                {status ? statusText[status] : statusText.upcoming}
              </div>
              
              {visitType && (
                <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{visitType}</span>
              )}
              
              <div className="flex gap-2 ml-auto md:ml-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 px-3 rounded-full"
                  onClick={() => onViewAppointment(appointment)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                {status === "upcoming" && (
                  <Button 
                    onClick={() => id && onStartAppointment?.(id)} 
                    className="h-8 px-3 rounded-full gap-1 bg-primary hover:bg-primary/90"
                    size="sm"
                  >
                    Start Now
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {(email || phone) && (
            <div className="mt-3 pt-3 border-t">
              <div className="flex flex-wrap gap-4">
                {email && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail className="h-3.5 w-3.5" />
                    {email}
                  </div>
                )}
                
                {phone && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Phone className="h-3.5 w-3.5" />
                    {phone}
                  </div>
                )}
                
                {appointment.selectedClinic?.address && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {appointment.selectedClinic.address}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
