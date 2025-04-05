
import { useState } from "react";
import { Search, Calendar, Filter, Eye, X, Download, Grid, List, ArrowUp, ArrowDown, Clock, Phone, Mail, MapPin, ChevronRight, User, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { AppointmentDetails, FilterOption, statusOptions, visitTypeOptions } from "@/models/Appointment";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AppointmentListProps {
  appointments: AppointmentDetails[];
  onStartAppointment?: (appointmentId: string) => void;
}

export function AppointmentList({ appointments, onStartAppointment }: AppointmentListProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState(`${format(new Date(), "MM/dd/yyyy")} - ${format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "MM/dd/yyyy")}`);
  const [visitTypeFilter, setVisitTypeFilter] = useState("all");
  const [sortField, setSortField] = useState<"date" | "name">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetails | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  // Count appointments by status
  const counts = {
    upcoming: appointments.filter(a => a.status === "upcoming").length,
    completed: appointments.filter(a => a.status === "completed").length,
    cancelled: appointments.filter(a => a.status === "cancelled").length
  };
  
  // Filter appointments based on active tab, search query, and filters
  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = appointment.status === activeTab;
    const matchesSearch = searchQuery === "" || 
      appointment.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.appointmentNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.phone?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVisitType = visitTypeFilter === "all" || appointment.visitType === visitTypeFilter;
    
    return matchesStatus && matchesSearch && matchesVisitType;
  });
  
  // Sort appointments
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(`${a.selectedDate} ${a.selectedTime}`);
      const dateB = new Date(`${b.selectedDate} ${b.selectedTime}`);
      return sortDirection === "asc" 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    } else {
      // Sort by name
      const nameA = a.patientName || "";
      const nameB = b.patientName || "";
      return sortDirection === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
  });
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as "upcoming" | "completed" | "cancelled");
  };
  
  const handleStartAppointment = (id: string) => {
    if (onStartAppointment) {
      onStartAppointment(id);
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleViewAppointment = (appointment: AppointmentDetails) => {
    setSelectedAppointment(appointment);
    setIsDetailsDialogOpen(true);
  };

  const handleChangeVisitType = (value: string) => {
    setVisitTypeFilter(value);
  };

  const handleClearFilters = () => {
    setVisitTypeFilter("all");
    setSortField("date");
    setSortDirection("asc");
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full lg:w-auto lg:min-w-[320px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by patient name, mobile number..."
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
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 h-10">
                <Filter className="h-4 w-4" />
                Filter By
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white p-0" align="end">
              <div className="bg-gray-50 p-2 flex justify-between items-center border-b">
                <h3 className="font-semibold text-sm">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs hover:bg-gray-200"
                  onClick={handleClearFilters}
                >
                  Clear All
                </Button>
              </div>
              <div className="p-3 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Visit Type</label>
                  <Select 
                    value={visitTypeFilter} 
                    onValueChange={handleChangeVisitType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Visit Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {visitTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Sort By</label>
                  <div className="flex items-center gap-2">
                    <Select 
                      value={sortField} 
                      onValueChange={(value) => setSortField(value as "date" | "name")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Date and Time</SelectItem>
                        <SelectItem value="name">Patient Name</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={toggleSortDirection}
                    >
                      {sortDirection === "asc" ? 
                        <ArrowUp className="h-4 w-4" /> : 
                        <ArrowDown className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="flex border rounded-md h-10">
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"}
              className="rounded-r-none px-3"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"}
              className="rounded-l-none px-3"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Azure-style filters */}
      <div className="bg-gray-100 mb-6 p-2 flex items-center rounded-md overflow-x-auto">
        <div className="flex items-center text-gray-500 px-2">
          <Filter className="h-4 w-4 mr-2" /> 
          Filter by:
        </div>
        
        <div className="flex space-x-1 overflow-x-auto pb-1">
          <Select 
            value={visitTypeFilter} 
            onValueChange={handleChangeVisitType}
          >
            <SelectTrigger className="bg-white border-gray-200 h-8 text-sm min-w-32">
              <span className="text-gray-400 mr-1">Types:</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visitTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {visitTypeFilter !== "all" && (
          <button
            onClick={() => setVisitTypeFilter("all")}
            className="ml-auto flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </button>
        )}
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
          <RenderAppointments 
            appointments={sortedAppointments} 
            viewMode={viewMode} 
            onStartAppointment={handleStartAppointment}
            onViewAppointment={handleViewAppointment}
          />
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-0">
          <RenderAppointments 
            appointments={sortedAppointments} 
            viewMode={viewMode} 
            onStartAppointment={handleStartAppointment}
            onViewAppointment={handleViewAppointment}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <RenderAppointments 
            appointments={sortedAppointments} 
            viewMode={viewMode} 
            onStartAppointment={handleStartAppointment}
            onViewAppointment={handleViewAppointment}
          />
        </TabsContent>
      </Tabs>

      {/* Appointment Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6">
              {/* Patient Header Section */}
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                  {selectedAppointment.patientName?.charAt(0) || "P"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">{selectedAppointment.patientName}</h2>
                    <span className="text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                      {selectedAppointment.appointmentNumber}
                    </span>
                    {selectedAppointment.isNew && (
                      <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded">New</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-1">
                    {selectedAppointment.age && selectedAppointment.gender && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{selectedAppointment.age} Years • {selectedAppointment.gender}</span>
                      </div>
                    )}
                    {selectedAppointment.phone && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{selectedAppointment.phone}</span>
                      </div>
                    )}
                    {selectedAppointment.email && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{selectedAppointment.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Appointment Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Appointment Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Date & Time</span>
                        <span className="text-sm font-medium">
                          {selectedAppointment.selectedDate && format(new Date(selectedAppointment.selectedDate), "dd MMM yyyy")} • {selectedAppointment.selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Visit Type</span>
                        <span className="text-sm font-medium">{selectedAppointment.visitType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={`text-sm font-medium ${
                          selectedAppointment.status === "upcoming" ? "text-blue-600" :
                          selectedAppointment.status === "completed" ? "text-green-600" :
                          "text-red-600"
                        }`}>
                          {selectedAppointment.status && selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                        </span>
                      </div>
                      {selectedAppointment.consultationFee && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Consultation Fee</span>
                          <span className="text-sm font-medium">${selectedAppointment.consultationFee}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Clinic Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Clinic Name</span>
                        <span className="text-sm font-medium">{selectedAppointment.selectedClinic.name}</span>
                      </div>
                      {selectedAppointment.selectedClinic.address && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Address</span>
                          <span className="text-sm font-medium">{selectedAppointment.selectedClinic.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Visit History</h3>
                    <div className="space-y-2">
                      {selectedAppointment.lastVisitDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Visit</span>
                          <span className="text-sm font-medium">{selectedAppointment.lastVisitDate}</span>
                        </div>
                      )}
                      {selectedAppointment.nextVisitDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Next Visit</span>
                          <span className="text-sm font-medium">{selectedAppointment.nextVisitDate}</span>
                        </div>
                      )}
                      {!selectedAppointment.lastVisitDate && (
                        <div className="text-sm font-medium text-purple-600">First Visit</div>
                      )}
                    </div>
                  </div>
                  
                  {selectedAppointment.vitalSigns && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Patient Vitals</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedAppointment.vitalSigns.temperature && (
                          <div>
                            <span className="text-xs text-gray-500 block">Temperature</span>
                            <span className="text-sm font-medium">{selectedAppointment.vitalSigns.temperature}</span>
                          </div>
                        )}
                        {selectedAppointment.vitalSigns.pulse && (
                          <div>
                            <span className="text-xs text-gray-500 block">Pulse</span>
                            <span className="text-sm font-medium">{selectedAppointment.vitalSigns.pulse}</span>
                          </div>
                        )}
                        {selectedAppointment.vitalSigns.respiratoryRate && (
                          <div>
                            <span className="text-xs text-gray-500 block">Respiratory Rate</span>
                            <span className="text-sm font-medium">{selectedAppointment.vitalSigns.respiratoryRate}</span>
                          </div>
                        )}
                        {selectedAppointment.vitalSigns.spo2 && (
                          <div>
                            <span className="text-xs text-gray-500 block">SPO2</span>
                            <span className="text-sm font-medium">{selectedAppointment.vitalSigns.spo2}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedAppointment.status === "upcoming" && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setIsDetailsDialogOpen(false);
                      selectedAppointment.id && handleStartAppointment(selectedAppointment.id);
                    }}
                    className="bg-primary hover:bg-primary/90 gap-2"
                  >
                    Start Appointment
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface RenderAppointmentsProps {
  appointments: AppointmentDetails[];
  viewMode: "list" | "grid";
  onStartAppointment?: (appointmentId: string) => void;
  onViewAppointment: (appointment: AppointmentDetails) => void;
}

function RenderAppointments({ 
  appointments, 
  viewMode, 
  onStartAppointment,
  onViewAppointment
}: RenderAppointmentsProps) {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No appointments found.</p>
      </div>
    );
  }
  
  return (
    <>
      {viewMode === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((appointment, index) => (
            <AppointmentCard 
              key={appointment.id || index}
              appointment={appointment}
              onStartAppointment={onStartAppointment}
              onViewAppointment={onViewAppointment}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment, index) => (
            <AppointmentGridCard 
              key={appointment.id || index}
              appointment={appointment}
              onStartAppointment={onStartAppointment}
              onViewAppointment={onViewAppointment}
            />
          ))}
        </div>
      )}
    </>
  );
}

interface AppointmentCardProps {
  appointment: AppointmentDetails;
  onStartAppointment?: (appointmentId: string) => void;
  onViewAppointment: (appointment: AppointmentDetails) => void;
}

function AppointmentCard({ 
  appointment, 
  onStartAppointment,
  onViewAppointment
}: AppointmentCardProps) {
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

function AppointmentGridCard({ 
  appointment, 
  onStartAppointment,
  onViewAppointment
}: AppointmentCardProps) {
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
                  onClick={() => id && onStartAppointment?.(id)} 
                  className="bg-primary hover:bg-primary/90 h-8"
                >
                  Start
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
