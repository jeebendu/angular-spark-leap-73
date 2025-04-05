
import React from "react";
import { Calendar, ChevronDown, Filter, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { AppointmentFilterState } from "@/models/AppointmentFilters";

interface AppointmentFiltersProps {
  filters: AppointmentFilterState;
  onFilterChange: (filters: AppointmentFilterState) => void;
  onToggleSortDirection?: () => void;
  onClearFilters?: () => void;
  onToggleViewMode?: () => void;
}

export const AppointmentFilters = ({
  filters,
  onFilterChange,
  onToggleSortDirection,
  onClearFilters,
  onToggleViewMode
}: AppointmentFiltersProps) => {
  const handleFilterChange = (key: keyof AppointmentFilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap gap-3 mb-6 bg-transparent">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-9 bg-white bg-opacity-80"
            placeholder="Search by patient name"
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Select
          value={filters.visitTypeFilter}
          onValueChange={(value) => handleFilterChange("visitTypeFilter", value)}
        >
          <SelectTrigger className="w-[180px] bg-white bg-opacity-80">
            <SelectValue placeholder="Visit Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="General Visit">General Visit</SelectItem>
            <SelectItem value="Video Call">Video Call</SelectItem>
            <SelectItem value="Audio Call">Audio Call</SelectItem>
            <SelectItem value="Direct Visit">Direct Visit</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[180px] justify-start text-left font-normal bg-white bg-opacity-80">
              <Calendar className="mr-2 h-4 w-4" />
              {filters.dateRange ? (
                filters.dateRange
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={filters.dateRange ? new Date(filters.dateRange) : undefined}
              onSelect={(date) => handleFilterChange("dateRange", date ? format(date, "yyyy-MM-dd") : "")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
