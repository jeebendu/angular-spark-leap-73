
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Phone, User, Calendar, Clock, CalendarClock, ChevronRight } from "lucide-react";
import { AppointmentDetails } from "@/models/appointment/Appointment";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface AppointmentGridCardProps {
  appointment: AppointmentDetails;
  onStartAppointment?: (appointmentId: string) => void;
  onViewAppointment: (appointment: AppointmentDetails) => void;
}

export function AppointmentGridCard({ 
  appointment, 
  onStartAppointment,
  onViewAppointment
}: AppointmentGridCardProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
  
  const handleStartAppointment = () => {
    if (id && onStartAppointment) {
      onStartAppointment(id);
    } else {
      // Navigate to the process appointment page
      toast({
        title: "Starting appointment",
        description: "Navigating to appointment processing page"
      });
      navigate("/doctor/process-appointment");
    }
  };

  const statusColors = {
    upcoming: "bg-blue-50 text-blue-600",
    completed: "bg-green-50 text-green-600",
    cancelled: "bg-red-50 text-red-600"
  };
  
  const statusText = {
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled"
  };

  // Get icon based on visit type
  const getVisitTypeIcon = () => {
    switch(visitType) {
      case "Video Call":
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
          <path d="M15 10l5 5V9l-5 5" /><path d="M20 4H9.5A2.5 2.5 0 0 0 7 6.5v11A2.5 2.5 0 0 0 9.5 20H20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
        </svg>;
      case "Audio Call": 
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
          <path d="M3 5v14c0 2 1.5 3 3 3h12c1.5 0 3-1 3-3V5c0-2-1.5-3-3-3H6C4.5 2 3 3 3 5z"></path>
          <circle cx="12" cy="14" r="4"></circle>
          <line x1="12" y1="6" x2="12.01" y2="6"></line>
        </svg>;
      case "Direct Visit":
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <path d="M9 14h6"></path>
          <path d="M9 18h6"></path>
          <path d="M12 10h.01"></path>
        </svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>;
    }
  };

  // Get background color based on visit type
  const getVisitTypeBgColor = () => {
    switch(visitType) {
      case "Video Call": return "bg-blue-50";
      case "Audio Call": return "bg-purple-50";
      case "Direct Visit": return "bg-green-50";
      default: return "bg-gray-50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col ${status === "cancelled" ? "border-l-4 border-l-red-500" : ""}`}>
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <div className={`p-2 ${getVisitTypeBgColor()} rounded-lg`}>
              {getVisitTypeIcon()}
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${status ? statusColors[status] : statusColors.upcoming}`}>
              {status ? statusText[status] : statusText.upcoming}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-medium text-[#333] truncate">{patientName}</h3>
              {isNew && <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded">New</span>}
              {consultationFee && (
                <span className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full">
                  ${consultationFee}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-1">{appointmentNumber}</p>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-xs">{formattedDate} • {formattedTime}</span>
              </div>
              
              {(age || gender) && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-xs">{age || "N/A"} yrs • {gender || "N/A"}</span>
                </div>
              )}
              
              {lastVisitDate && (
                <div className="flex items-center gap-1">
                  <CalendarClock className="h-4 w-4 text-gray-400" />
                  <span className="text-xs">Last: {lastVisitDate}</span>
                </div>
              )}
              
              {nextVisitDate && (
                <div className="flex items-center gap-1">
                  <CalendarClock className="h-4 w-4 text-gray-400" />
                  <span className="text-xs">Next: {nextVisitDate}</span>
                </div>
              )}
              
              {phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-xs">{phone}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t flex justify-between items-center">
            {visitType && (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{visitType}</span>
            )}
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => onViewAppointment(appointment)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              
              {status === "upcoming" && (
                <Button 
                  size="sm"
                  onClick={handleStartAppointment} 
                  className="bg-primary hover:bg-primary/90 h-8 gap-1"
                >
                  Start
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
