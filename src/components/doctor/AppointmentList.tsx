
import { useState } from "react";
import { Search, Calendar, Filter, Eye, Home, Phone, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { AppointmentDetails } from "@/models/Appointment";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface AppointmentListProps {
  appointments: AppointmentDetails[];
  onStartAppointment?: (appointmentId: string) => void;
}

export function AppointmentList({ appointments, onStartAppointment }: AppointmentListProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState(`${format(new Date(), "MM/dd/yyyy")} - ${format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "MM/dd/yyyy")}`);
  
  // Count appointments by status
  const counts = {
    upcoming: appointments.filter(a => a.status === "upcoming").length,
    completed: appointments.filter(a => a.status === "completed").length,
    cancelled: appointments.filter(a => a.status === "cancelled").length
  };
  
  // Filter appointments based on active tab and search query
  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = appointment.status === activeTab;
    const matchesSearch = searchQuery === "" || 
      appointment.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.appointmentNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as "upcoming" | "completed" | "cancelled");
  };
  
  const handleStartAppointment = (id: string) => {
    if (onStartAppointment) {
      onStartAppointment(id);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full lg:w-auto lg:min-w-[320px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-9 pr-4 h-10 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 h-10">
            <Calendar className="h-4 w-4" />
            {dateRange}
          </Button>
          
          <Button variant="outline" className="gap-2 h-10">
            <Filter className="h-4 w-4" />
            Filter By
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming" className="relative">
            Upcoming
            <Badge className="ml-2 bg-primary text-white">{counts.upcoming}</Badge>
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled
            <Badge className="ml-2 bg-gray-200 text-gray-700">{counts.cancelled}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            <Badge className="ml-2 bg-gray-200 text-gray-700">{counts.completed}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            {filteredAppointments.map((appointment, index) => (
              <AppointmentCard 
                key={appointment.id || index}
                appointment={appointment}
                onStartAppointment={handleStartAppointment}
              />
            ))}
            
            {filteredAppointments.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No upcoming appointments found.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            {filteredAppointments.map((appointment, index) => (
              <AppointmentCard 
                key={appointment.id || index}
                appointment={appointment}
                onStartAppointment={handleStartAppointment}
              />
            ))}
            
            {filteredAppointments.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No cancelled appointments found.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            {filteredAppointments.map((appointment, index) => (
              <AppointmentCard 
                key={appointment.id || index}
                appointment={appointment}
                onStartAppointment={handleStartAppointment}
              />
            ))}
            
            {filteredAppointments.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No completed appointments found.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AppointmentCardProps {
  appointment: AppointmentDetails;
  onStartAppointment?: (appointmentId: string) => void;
}

function AppointmentCard({ appointment, onStartAppointment }: AppointmentCardProps) {
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
    status
  } = appointment;
  
  const formattedDate = selectedDate ? 
    format(new Date(selectedDate), "dd MMM yyyy") : 
    "Date not specified";
    
  const formattedTime = selectedTime || "Time not specified";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-3 items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-[#333]">{patientName}</h3>
                  <span className="text-xs text-gray-500">{appointmentNumber}</span>
                  {isNew && <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded">New</span>}
                </div>
                <p className="text-sm text-gray-500">{formattedDate} • {formattedTime}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className={`text-xs font-medium px-2 py-1 rounded ${status ? statusColors[status] : statusColors.upcoming}`}>
                {status ? statusText[status] : statusText.upcoming}
              </div>
              
              {visitType && (
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{visitType}</span>
              )}
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Download className="h-4 w-4" />
                </Button>
                {status === "upcoming" && (
                  <Button 
                    onClick={() => id && onStartAppointment?.(id)} 
                    className="bg-primary hover:bg-primary/90"
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {email}
                  </div>
                )}
                
                {phone && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Phone className="h-4 w-4" />
                    {phone}
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
