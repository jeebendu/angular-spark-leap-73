
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AppointmentDetails } from "@/models/Appointment";
import { format } from "date-fns";
import { AppointmentFilters } from "./AppointmentFilters";
import { AppointmentRenderer } from "./AppointmentRenderer";
import { AppointmentDetailsDialog } from "./AppointmentDetailsDialog";
import { AppointmentFilterState, defaultFilters } from "@/models/AppointmentFilters";

interface AppointmentListProps {
  appointments: AppointmentDetails[];
  onStartAppointment?: (appointmentId: string) => void;
}

export function AppointmentList({ appointments, onStartAppointment }: AppointmentListProps) {
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

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      
      <AppointmentFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onToggleSortDirection={handleToggleSortDirection}
        onClearFilters={handleClearFilters}
        onToggleViewMode={() => handleFilterChange('viewMode', filters.viewMode === 'list' ? 'grid' : 'list')}
      />

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
          <AppointmentRenderer 
            appointments={sortedAppointments} 
            viewMode={filters.viewMode} 
            onStartAppointment={onStartAppointment}
            onViewAppointment={handleViewAppointment}
          />
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-0">
          <AppointmentRenderer 
            appointments={sortedAppointments} 
            viewMode={filters.viewMode} 
            onStartAppointment={onStartAppointment}
            onViewAppointment={handleViewAppointment}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <AppointmentRenderer 
            appointments={sortedAppointments} 
            viewMode={filters.viewMode} 
            onStartAppointment={onStartAppointment}
            onViewAppointment={handleViewAppointment}
          />
        </TabsContent>
      </Tabs>

      <AppointmentDetailsDialog 
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        appointment={selectedAppointment}
        onStartAppointment={onStartAppointment}
      />
    </div>
  );
}
