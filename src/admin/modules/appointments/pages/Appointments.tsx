
import { useEffect, useState } from "react";
import AdminLayout from "@/admin/components/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { useAppointments } from "../hooks/useAppointments";
import FilterCard, { FilterOption } from "@/admin/components/FilterCard";
import AppointmentSidebar from "../components/AppointmentSidebar";
import PageHeader from "@/admin/components/PageHeader";
import InfiniteAppointmentList from "../components/InfiniteAppointmentList";
import AppointmentCalendar from "../components/AppointmentCalendar";
import { Doctor } from "../types/Doctor";
import { fetchDoctorDetailsById } from "../services/DoctorService";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

const AppointmentsAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const { toast } = useToast();
  const [doctor, setDoctor] = useState<Doctor>();
  
  // Date range filter - updated to use DateRange type
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Filter states
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    types: [],
    statuses: [],
    branches: [],
    searchTerm: null,
  });
  
  // Define filter options
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    {
      id: 'statuses',
      label: 'Status',
      options: [
        { id: 'UPCOMING', label: 'Upcoming' },
        { id: 'COMPLETED', label: 'Completed' },
        { id: 'CANCELLED', label: 'Cancelled' },
        { id: 'IN_PROGRESS', label: 'In Progress' }
      ]
    },
    {
      id: 'branches',
      label: 'Branch',
      options: []
    }
  ]);
  
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
    doctorId: 1, // Replace with actual doctor ID when available
    branches: [],
    searchTerm: null,
    statuses: []
  });

  const handleFilterChange = (filterId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[filterId]?.includes(optionId)) {
        newFilters[filterId] = newFilters[filterId].filter(id => id !== optionId);
      } else {
        newFilters[filterId] = [...(newFilters[filterId] || []), optionId];
      }
  
      // Update the filters using the updateFilters function
      updateFilters(newFilters);
  
      return newFilters;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedFilters({
      types: [],
      statuses: [],
      assignees: [],
      searchTerm: null,
      branches: []
    });
    setDateRange(undefined);
    updateFilters({
      page: 0,
      size: 10,
      doctorId: 1,
      branches: [],
      searchTerm: null,
      statuses: [],
      fromDate: undefined,
      toDate: undefined
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
  };

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      const response = await fetchDoctorDetailsById(1);
      setDoctor(response.data);

      // Dynamically update branch options in filterOptions
      setFilterOptions(prevOptions => {
        return prevOptions.map(option => {
          if (option.id === 'branches') {
            return {
              ...option,
              options: response.data.branchList.map((branch: any) => ({
                id: branch.id,
                label: branch.name
              }))
            };
          }
          return option;
        });
      });
    };

    fetchDoctorInfo();
  }, []);

  // Update filters when date range changes
  useEffect(() => {
    if (dateRange?.from) {
      updateFilters({
        ...selectedFilters,
        fromDate: dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
        toDate: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
      });
    }
  }, [dateRange]);
  
  const onSearchChange = async (term: string) => {
    updateFilters({
      ...selectedFilters,
      searchTerm: term,
      page: 0,
    });
    setSearchTerm(term);
  };

  return (
    <AdminLayout
      rightSidebar={showSidebar ? <AppointmentSidebar onClose={() => setShowSidebar(false)} appointments={appointments} /> : undefined}
      onUserClick={() => setShowSidebar(!showSidebar)}
      showAddButton={true}
      onAddButtonClick={handleAddAppointment}
    >
      <div className="flex flex-col h-full">
        <div className="sticky top-0 z-10 bg-[#eff5ff] pb-2">
          <PageHeader
            title="Appointments"
            onViewModeToggle={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
            viewMode={viewMode}
            showAddButton={true}
            addButtonLabel="New Appointment"
            onAddButtonClick={handleAddAppointment}
            onFilterToggle={() => setShowFilters(!showFilters)}
            showFilter={showFilters}
          />

          {showFilters && (
            <div className="space-y-2">
              <FilterCard
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                filters={filterOptions}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
              
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium mr-2">Date Range:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                        ) : (
                          format(dateRange.from, "MMM dd, yyyy")
                        )
                      ) : (
                        <span>Select date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {dateRange?.from && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setDateRange(undefined)}
                    className="ml-2"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto">
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default AppointmentsAdmin;
