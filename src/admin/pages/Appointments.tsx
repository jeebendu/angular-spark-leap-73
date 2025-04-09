
import { useState } from "react";
import AdminLayout from "@/admin/components/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "../components/PageHeader";
import FilterCard, { FilterOption } from "../components/FilterCard";
import InfiniteAppointmentList from "../modules/appointments/components/InfiniteAppointmentList";
import { useAppointments } from "../modules/appointments/hooks/useAppointments";
import AppointmentCalendar from "../modules/appointments/components/AppointmentCalendar";
import AppointmentSidebar from "../modules/appointments/components/AppointmentSidebar";

const AppointmentsAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const { toast } = useToast();

  // Filter states
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    types: [],
    statuses: [],
    assignees: []
  });

  // Use the custom hook for appointments with lazy loading
  const {
    appointments,
    loading,
    hasMore,
    loadMore,
    refreshAppointments,
    updateFilters
  } = useAppointments({
    page: 0,
    size: 10,
    doctorId: 1 // Replace with actual doctor ID when available
  });

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

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowSidebar(true);
  };

  const handleAddAppointment = () => {
    toast({
      title: "Add Appointment",
      description: "This feature is coming soon.",
    });
  };

  const handleStartAppointment = (appointment: any) => {
    toast({
      title: "Starting Appointment",
      description: "Navigating to appointment...",
    });
    // Handle appointment start logic
  };

  return (
    <AdminLayout 
      rightSidebar={showSidebar ? <AppointmentSidebar onClose={() => setShowSidebar(false)} appointments={appointments} /> : undefined}
      onUserClick={() => setShowSidebar(!showSidebar)}
      showAddButton={true}
      onAddButtonClick={handleAddAppointment}
    >
      <PageHeader 
        title="Appointments"
        onViewModeToggle={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
        viewMode={viewMode}
        showAddButton={true}
        addButtonLabel="New Appointment"
        onAddButtonClick={handleAddAppointment}
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
        <InfiniteAppointmentList 
          appointments={appointments}
          loading={loading}
          hasMore={hasMore}
          loadMore={loadMore}
          onAppointmentClick={handleAppointmentClick}
          onStartAppointment={handleStartAppointment}
        />
      )}
    </AdminLayout>
  );
};

export default AppointmentsAdmin;
