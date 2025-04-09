import React, { useState, useEffect } from "react";
import AdminLayout from "@/admin/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  HospitalIcon, 
  Mail, 
  MapPin, 
  Phone, 
  Plus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Appointment, AppointmentStatus, AppointmentType } from "../types/appointment";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import AppointmentCalendar from "../components/AppointmentCalendar";
import AppointmentSidebar from "../components/AppointmentSidebar";
import PageHeader from "../components/PageHeader";
import FilterCard, { FilterOption } from "../components/FilterCard";
import { appointmentListByDoctorId } from "../services/DoctorAppointments";

const AppointmentsAdmin = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const { toast } = useToast();

  // Filter states
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    types: [],
    statuses: [],
    assignees: []
  });

  const fetchAppointments = async () => {
    try {
      const page= 0;
      const size= 10;
      const response = await appointmentListByDoctorId(1,page,size); // Replace with actual doctor ID
      setAppointments(response.data.content);
      console.log(response.data.content)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Define filter options
  const filterOptions: FilterOption[] = [
    {
      id: 'types',
      label: 'Types',
      options: [
        { id: 'direct-visit', label: 'Direct Visit' },
        { id: 'video-call', label: 'Video Call' },
        { id: 'audio-call', label: 'Audio Call' }
      ]
    },
    {
      id: 'statuses',
      label: 'Status',
      options: [
        { id: 'upcoming', label: 'Upcoming' },
        { id: 'completed', label: 'Completed' },
        { id: 'cancelled', label: 'Cancelled' },
        { id: 'new', label: 'New' }
      ]
    },
    {
      id: 'assignees',
      label: 'Assigned to',
      options: [
        { id: 'dr-smith', label: 'Dr. John Smith' },
        { id: 'dr-watson', label: 'Dr. Emma Watson' },
        { id: 'dr-brown', label: 'Dr. Robert Brown' }
      ]
    }
  ];

  const handleFilterChange = (filterId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[filterId]?.includes(optionId)) {
        newFilters[filterId] = newFilters[filterId].filter(id => id !== optionId);
      } else {
        newFilters[filterId] = [...(newFilters[filterId] || []), optionId];
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedFilters({
      types: [],
      statuses: [],
      assignees: []
    });
  };

  

  const getAppointmentTypeLabel = (type: AppointmentType) => {
    switch (type) {
      case "direct-visit": return "Direct Visit";
      case "video-call": return "Video Call";
      case "audio-call": return "Audio Call";
      default: return type;
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800 p-2";
      case "completed": return "bg-green-100 text-green-800 p-2";
      case "cancelled": return "bg-red-100 text-red-800 p-2";
      case "new": return "bg-purple-100 text-purple-800 p-2";
      default: return "bg-gray-100 text-gray-800 p-2";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy");
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowSidebar(true);
  };

  const handleAddAppointment = () => {
    toast({
      title: "Add Appointment",
      description: "This feature is coming soon.",
    });
  };

  return (
    <AdminLayout 
      rightSidebar={showSidebar ? <AppointmentSidebar onClose={() => setShowSidebar(false)} appointments={appointments} /> : undefined}
      onUserClick={() => setShowSidebar(!showSidebar)}
      showAddButton={true}
      onAddButtonClick={handleAddAppointment}
      onRefreshClick={fetchAppointments}
      onFilterToggle={() => setShowFilters(!showFilters)}
      showFilter={showFilters}
    >
      <PageHeader 
        title="Appointments"
        onViewModeToggle={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
        viewMode={viewMode}
        showAddButton={true}
        addButtonLabel="New Appointment"
        onAddButtonClick={handleAddAppointment}
        onRefreshClick={fetchAppointments}
        onFilterToggle={() => setShowFilters(!showFilters)}
        showFilter={showFilters}
      />

      {showFilters && (
        <FilterCard 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
      )}

      {viewMode === 'calendar' ? (
        <AppointmentCalendar
          appointments={appointments}
          onAppointmentClick={handleAppointmentClick}
        />
      ) : (
        <div className="space-y-4 pb-6">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5">
                <div className="flex justify-between flex-wrap gap-2">
                  <div className="flex items-start">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                      appointment.patient.gender === "Female" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                    )}>
                      {appointment.patient.gender === "Female" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-lg font-medium">{appointment.patient.firstname} {appointment.patient.lastname}</h2>
                        <span className="text-gray-500 text-sm"># AP0934M8</span>
                        <span className="text-gray-500 text-sm">{appointment.patient.age} yrs • {appointment.patient.gender}</span>
                        <span className="text-amber-600 font-medium">₹ 200</span>
                      </div>
                      <div className="flex items-center mt-2 gap-4 flex-wrap">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {appointment?.slot?.date ? format(new Date(appointment.slot.date), "EEEE, MMMM d, yyyy") : "Date not available"}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                         {appointment?.slot?.startTime ? format(new Date(`1970-01-01T${appointment?.slot?.startTime}`), "hh:mm a") : "Time not available"}
                        </div>
              
                        <div className="flex items-center text-gray-600 text-sm">
                          <HospitalIcon className="h-4 w-4 mr-1" />
                        {appointment?.doctorClinic?.clinic?.name}
                        </div>
                        
                        {/* {appointment.lastVisit && (
                          <div className="flex items-center text-gray-600 text-sm">
                            <span className="mr-1">Last:</span>
                            {formatDate(appointment.lastVisit)}
                          </div>
                        )}
                          
                        {appointment.nextVisit && (
                          <div className="flex items-center text-gray-600 text-sm">
                            <span className="mr-1">Next:</span>
                            {formatDate(appointment.nextVisit)}
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge className={getStatusBadgeStyle(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                    {/* <Badge variant="outline">testingnsdfnsadf</Badge> */}
                    <Button variant="outline" size="sm" className="rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      View
                    </Button>
                    <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">
                      Start Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Mail className="h-4 w-4 mr-2" />
                    {appointment.patient.user.email?appointment.patient.user.email:"N/A"}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Phone className="h-4 w-4 mr-2" />
                    {appointment.patient.user.phone?appointment.patient.user.phone:"N/A"}
                  </div>
                  { (
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {appointment.patient.city},{appointment.patient.address},{appointment.patient?.district ?appointment.patient?.district?.name:""},{appointment.patient?.state? appointment.patient?.state?.name:""},
                      {appointment.patient?.country? appointment.patient?.country?.name:""}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AppointmentsAdmin;
