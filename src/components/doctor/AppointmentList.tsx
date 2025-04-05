
import { useState } from "react";
import { Search, Calendar, Filter, Eye, X, Download, Grid, List, ArrowUp, ArrowDown } from "lucide-react";
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Patient</h3>
                  <p className="text-base font-medium">{selectedAppointment.patientName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Appointment Number</h3>
                  <p className="text-base">{selectedAppointment.appointmentNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                  <p className="text-base">
                    {selectedAppointment.selectedDate && format(new Date(selectedAppointment.selectedDate), "dd MMM yyyy")} • {selectedAppointment.selectedTime}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Visit Type</h3>
                  <p className="text-base">{selectedAppointment.visitType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="text-base capitalize">{selectedAppointment.status}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Age & Gender</h3>
                  <p className="text-base">
                    {selectedAppointment.age || "N/A"} • {selectedAppointment.gender || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Clinic</h3>
                  <p className="text-base">{selectedAppointment.selectedClinic.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="text-base">{selectedAppointment.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-base">{selectedAppointment.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Visit</h3>
                  <p className="text-base">{selectedAppointment.lastVisitDate || "First Visit"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Next Visit</h3>
                  <p className="text-base">{selectedAppointment.nextVisitDate || "Not Scheduled"}</p>
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
                  >
                    Start Appointment
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
    nextVisitDate
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
                {visitType === "Video Call" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                    <path d="M15 10l5 5V9l-5 5" /><path d="M20 4H9.5A2.5 2.5 0 0 0 7 6.5v11A2.5 2.5 0 0 0 9.5 20H20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" /><polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
                  </svg>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-[#333]">{patientName}</h3>
                  <span className="text-xs text-gray-500">{appointmentNumber}</span>
                  {isNew && <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded">New</span>}
                  {age && gender && (
                    <span className="text-xs text-gray-500">{age} • {gender}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{formattedDate} • {formattedTime}</p>
                {lastVisitDate && (
                  <p className="text-xs text-gray-500">Last visit: {lastVisitDate}</p>
                )}
                {nextVisitDate && (
                  <p className="text-xs text-gray-500">Next visit: {nextVisitDate}</p>
                )}
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 px-2"
                  onClick={() => onViewAppointment(appointment)}
                >
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
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
    nextVisitDate
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
      <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              {visitType === "Video Call" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M15 10l5 5V9l-5 5" /><path d="M20 4H9.5A2.5 2.5 0 0 0 7 6.5v11A2.5 2.5 0 0 0 9.5 20H20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" /><polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
                </svg>
              )}
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded ${status ? statusColors[status] : statusColors.upcoming}`}>
              {status ? statusText[status] : statusText.upcoming}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-[#333] truncate">{patientName}</h3>
              {isNew && <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded">New</span>}
            </div>
            <p className="text-xs text-gray-500 mb-1">{appointmentNumber}</p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span className="text-xs">{formattedDate} • {formattedTime}</span>
              </div>
              
              {(age || gender) && (
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="text-xs">{age || "N/A"} • {gender || "N/A"}</span>
                </div>
              )}
              
              {lastVisitDate && (
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="m4 12 8-8 8 8" /><path d="M12 4v16" />
                  </svg>
                  <span className="text-xs">Last: {lastVisitDate}</span>
                </div>
              )}
              
              {nextVisitDate && (
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="m4 12 8 8 8-8" /><path d="M12 4v16" />
                  </svg>
                  <span className="text-xs">Next: {nextVisitDate}</span>
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
