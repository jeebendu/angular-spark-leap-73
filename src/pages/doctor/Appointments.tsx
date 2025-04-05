
import { useState } from "react";
import { DoctorLayout } from "@/components/DoctorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Clock,
  Video,
  MessageSquare,
  Phone,
  MoreHorizontal
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { AppointmentCard } from "@/components/AppointmentCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppointmentDetails } from "@/models/Appointment";

interface Appointment {
  id: string;
  patient: string;
  patientImage: string;
  time: string;
  date: string;
  status: "upcoming" | "completed" | "cancelled";
  type: string;
  reason: string;
  notes?: string;
}

const appointments: Appointment[] = [
  {
    id: "1",
    patient: "Sarah Johnson",
    patientImage: "https://placehold.co/200/eaf7fc/33C3F0?text=SJ&font=montserrat",
    time: "09:00 AM",
    date: "2025-04-05",
    status: "upcoming",
    type: "Follow-up",
    reason: "Blood pressure check"
  },
  {
    id: "2",
    patient: "Michael Brown",
    patientImage: "https://placehold.co/200/eaf7fc/33C3F0?text=MB&font=montserrat",
    time: "10:30 AM",
    date: "2025-04-05",
    status: "upcoming",
    type: "New Patient",
    reason: "Chest pain and shortness of breath"
  },
  {
    id: "3",
    patient: "Emily Davis",
    patientImage: "https://placehold.co/200/eaf7fc/33C3F0?text=ED&font=montserrat",
    time: "01:15 PM",
    date: "2025-04-05",
    status: "upcoming",
    type: "Consultation",
    reason: "Review of test results"
  },
  {
    id: "4",
    patient: "Robert Wilson",
    patientImage: "https://placehold.co/200/eaf7fc/33C3F0?text=RW&font=montserrat",
    time: "03:00 PM", 
    date: "2025-04-06",
    status: "upcoming",
    type: "Follow-up",
    reason: "Post-surgery check-up"
  },
  {
    id: "5",
    patient: "Lisa Anderson",
    patientImage: "https://placehold.co/200/eaf7fc/33C3F0?text=LA&font=montserrat",
    time: "11:45 AM",
    date: "2025-04-04",
    status: "completed",
    type: "Regular Check-up",
    reason: "Annual physical examination",
    notes: "Patient is healthy. Recommended regular exercise and balanced diet."
  },
  {
    id: "6",
    patient: "James Taylor",
    patientImage: "https://placehold.co/200/eaf7fc/33C3F0?text=JT&font=montserrat",
    time: "02:30 PM",
    date: "2025-04-04",
    status: "completed",
    type: "Consultation",
    reason: "Persistent headaches",
    notes: "Prescribed pain medication and recommended an MRI scan."
  },
  {
    id: "7",
    patient: "Patricia Martinez",
    patientImage: "https://placehold.co/200/eaf7fc/33C3F0?text=PM&font=montserrat",
    time: "04:15 PM",
    date: "2025-04-04",
    status: "cancelled",
    type: "Follow-up",
    reason: "Diabetes management"
  },
];

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");
  
  // Filter appointments based on search term and status filter
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Group appointments by date for the list view
  const appointmentsByDate = filteredAppointments.reduce<Record<string, Appointment[]>>((acc, appointment) => {
    const date = appointment.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(appointment);
    return acc;
  }, {});
  
  // Sort dates
  const sortedDates = Object.keys(appointmentsByDate).sort();
  
  // Get today's appointments
  const todayDateString = format(new Date(), "yyyy-MM-dd");
  const todayAppointments = appointmentsByDate[todayDateString] || [];
  
  // Handle date selection - in a real app, this would filter appointments for the selected date
  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    // In a real app, this would fetch appointments for the selected date
  };
  
  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600">Manage and schedule your patient appointments</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="bg-white">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>Schedule</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              + New Appointment
            </Button>
          </div>
        </div>
        
        {/* Filter and search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text"
              placeholder="Search by patient name or reason..." 
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Tabs defaultValue="list" onValueChange={(value) => setViewMode(value as "calendar" | "list")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {viewMode === "list" ? (
          <div className="space-y-8">
            {/* Today's Appointments */}
            {todayAppointments.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Today's Appointments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {todayAppointments.map((appointment) => (
                    <AppointmentCard 
                      key={appointment.id}
                      doctorName={appointment.patient}
                      specialty={appointment.type}
                      date={format(new Date(appointment.date), "MMMM d, yyyy")}
                      time={appointment.time}
                      imageSrc={appointment.patientImage}
                      status={appointment.status}
                      forUser={appointment.patient}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Appointments by date */}
            {sortedDates.map(date => (
              date !== todayDateString && (
                <div key={date}>
                  <h2 className="text-lg font-semibold mb-4">{format(new Date(date), "EEEE, MMMM d, yyyy")}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointmentsByDate[date].map((appointment) => (
                      <AppointmentCard 
                        key={appointment.id}
                        doctorName={appointment.patient}
                        specialty={appointment.type}
                        date={format(new Date(appointment.date), "MMMM d, yyyy")}
                        time={appointment.time}
                        imageSrc={appointment.patientImage}
                        status={appointment.status}
                        forUser={appointment.patient}
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
            
            {/* If no appointments match filters */}
            {filteredAppointments.length === 0 && (
              <Card className="bg-gray-50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
                  <p className="text-gray-500 text-center mt-1">
                    There are no appointments matching your search criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Calendar View */}
            <Card className="md:col-span-1">
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md"
                />
              </CardContent>
            </Card>
            
            {/* Appointments for selected date */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  Appointments for {date ? format(date, "MMMM d, yyyy") : "Today"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments
                      .filter(app => app.date === format(date || new Date(), "yyyy-MM-dd"))
                      .map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full overflow-hidden">
                                <img 
                                  src={appointment.patientImage} 
                                  alt={appointment.patient} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.patient}</p>
                                <p className="text-xs text-gray-500">{appointment.reason}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-gray-500" />
                              <span>{appointment.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.type}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`
                                ${appointment.status === "upcoming" && "bg-blue-50 text-blue-700 hover:bg-blue-50"}
                                ${appointment.status === "completed" && "bg-green-50 text-green-700 hover:bg-green-50"}
                                ${appointment.status === "cancelled" && "bg-red-50 text-red-700 hover:bg-red-50"}
                              `}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {appointment.status === "upcoming" && (
                                <>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Video className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Phone className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    Cancel Appointment
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    {filteredAppointments.filter(app => app.date === format(date || new Date(), "yyyy-MM-dd")).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                          No appointments scheduled for this date
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DoctorLayout>
  );
};

export default Appointments;
