
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AppointmentDetails } from "@/models/Appointment";
import { AppointmentFilters } from "./AppointmentFilters";
import { AppointmentRenderer } from "./AppointmentRenderer";
import { AppointmentDetailsDialog } from "./AppointmentDetailsDialog";
import { AppointmentFilterState, defaultFilters } from "@/models/AppointmentFilters";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AppointmentListProps {
  appointments: AppointmentDetails[];
  onStartAppointment?: (appointmentId: string) => void;
}

export function AppointmentList({ appointments, onStartAppointment }: AppointmentListProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const [filters, setFilters] = useState<AppointmentFilterState>({
    ...defaultFilters,
    // Using empty string as default to avoid date parsing issues
    dateRange: ""
  });
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
    const matchesSearch = filters.searchQuery === "" || 
      appointment.patientName?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      appointment.appointmentNumber?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      appointment.phone?.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesVisitType = filters.visitTypeFilter === "all" || appointment.visitType === filters.visitTypeFilter;
    
    return matchesStatus && matchesSearch && matchesVisitType;
  });
  
  // Sort appointments
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (filters.sortField === "date") {
      const dateA = new Date(`${a.selectedDate} ${a.selectedTime}`);
      const dateB = new Date(`${b.selectedDate} ${b.selectedTime}`);
      return filters.sortDirection === "asc" 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    } else {
      // Sort by name
      const nameA = a.patientName || "";
      const nameB = b.patientName || "";
      return filters.sortDirection === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
  });
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as "upcoming" | "completed" | "cancelled");
  };
  
  const handleFilterChange = (key: keyof AppointmentFilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleToggleSortDirection = () => {
    setFilters(prev => ({ 
      ...prev, 
      sortDirection: prev.sortDirection === "asc" ? "desc" : "asc" 
    }));
  };

  const handleViewAppointment = (appointment: AppointmentDetails) => {
    setSelectedAppointment(appointment);
    setIsDetailsDialogOpen(true);
  };

  const handleClearFilters = () => {
    setFilters({
      ...defaultFilters
    });
  };

  const handleStartAppointment = (appointmentId: string) => {
    if (onStartAppointment) {
      onStartAppointment(appointmentId);
    } else {
      toast({
        title: "Starting appointment",
        description: "Navigating to appointment processing page..."
      });
      navigate(`/doctor/appointments/${appointmentId}`);
    }
  };

  return (
    <div className="w-full">
      <div className="sticky top-0 z-30 bg-white pb-4 pt-6 px-6">
        <h1 className="text-2xl font-bold mb-6">Appointments</h1>
        
        <AppointmentFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onToggleSortDirection={handleToggleSortDirection}
          onClearFilters={handleClearFilters}
          onToggleViewMode={() => handleFilterChange('viewMode', filters.viewMode === 'list' ? 'grid' : 'list')}
        />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-4">
          <TabsList className="mb-4">
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
            <AppointmentRenderer 
              appointments={sortedAppointments} 
              viewMode={filters.viewMode}
              onStartAppointment={handleStartAppointment}
              onViewAppointment={handleViewAppointment}
            />
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-0">
            <AppointmentRenderer 
              appointments={sortedAppointments} 
              viewMode={filters.viewMode}
              onStartAppointment={handleStartAppointment}
              onViewAppointment={handleViewAppointment}
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <AppointmentRenderer 
              appointments={sortedAppointments} 
              viewMode={filters.viewMode}
              onStartAppointment={handleStartAppointment}
              onViewAppointment={handleViewAppointment}
            />
          </TabsContent>
        </Tabs>
      </div>

      <AppointmentDetailsDialog 
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        appointment={selectedAppointment}
        onStartAppointment={handleStartAppointment}
      />
    </div>
  );
}
