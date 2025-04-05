
import React from "react";
import { Search, Calendar, Filter, X, Grid, List, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterOption, visitTypeOptions } from "@/models/Appointment";
import { AppointmentFilterState } from "@/models/AppointmentFilters";
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
import { 
  Popover as DateRangePopover,
  PopoverContent as DateRangePopoverContent,
  PopoverTrigger as DateRangePopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, isAfter, isBefore, isValid, parse } from "date-fns";

interface AppointmentFiltersProps {
  filters: AppointmentFilterState;
  onFilterChange: (key: keyof AppointmentFilterState, value: string) => void;
  onToggleSortDirection: () => void;
  onClearFilters: () => void;
  onToggleViewMode: () => void;
}

export function AppointmentFilters({
  filters,
  onFilterChange,
  onToggleSortDirection,
  onClearFilters,
  onToggleViewMode
}: AppointmentFiltersProps) {
  const { searchQuery, dateRange, visitTypeFilter, sortField, sortDirection, viewMode } = filters;
  
  // Parse the date range safely
  const dateRangeParts = dateRange ? dateRange.split(' - ') : ['', ''];
  const startDateStr = dateRangeParts[0] || '';
  const endDateStr = dateRangeParts.length > 1 ? dateRangeParts[1] : '';
  
  // Safely parse dates, ensuring they're valid
  const parseDate = (dateStr: string) => {
    if (!dateStr) return undefined;
    try {
      const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date());
      return isValid(parsedDate) ? parsedDate : undefined;
    } catch (e) {
      console.error("Invalid date format:", dateStr);
      return undefined;
    }
  };

  const [date, setDate] = React.useState<Date | undefined>(parseDate(startDateStr));
  const [endDateValue, setEndDateValue] = React.useState<Date | undefined>(parseDate(endDateStr));

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    
    if (!date) {
      setDate(selectedDate);
    } else if (!endDateValue || isBefore(selectedDate, date)) {
      setDate(selectedDate);
      setEndDateValue(undefined);
    } else {
      setEndDateValue(selectedDate);
      
      const formattedStartDate = format(date, 'yyyy-MM-dd');
      const formattedEndDate = format(selectedDate, 'yyyy-MM-dd');
      onFilterChange('dateRange', `${formattedStartDate} - ${formattedEndDate}`);
    }
  };

  const getDisplayDateRange = () => {
    if (!date) return "Select date range";
    
    const formattedStartDate = format(date, 'MMM dd, yyyy');
    
    if (!endDateValue) return `From ${formattedStartDate}`;
    
    const formattedEndDate = format(endDateValue, 'MMM dd, yyyy');
    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  return (
    <div className="filter-section">
      <div className="flex flex-wrap gap-2 items-center bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Search input */}
        <div className="relative flex-grow px-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Filter by keyword"
            className="border-0 focus-visible:ring-0 pl-9 h-10 bg-transparent"
            value={searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          />
        </div>
        
        {/* Filter options */}
        <div className="flex items-center gap-1 px-1 border-l border-gray-200">
          <Select 
            value={visitTypeFilter} 
            onValueChange={(value) => onFilterChange('visitTypeFilter', value)}
          >
            <SelectTrigger className="border-0 focus:ring-0 bg-transparent h-10 px-3 font-normal">
              <span className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Visit Type</span>
              </span>
            </SelectTrigger>
            <SelectContent>
              {visitTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <DateRangePopover>
            <DateRangePopoverTrigger asChild>
              <Button variant="ghost" className="h-10 px-3 font-normal">
                <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-gray-600 text-sm">Date</span>
              </Button>
            </DateRangePopoverTrigger>
            <DateRangePopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
                footer={
                  <div className="px-4 pb-3 pt-1 flex justify-between items-center">
                    <div className="text-sm">
                      {date && <span>From: {format(date, 'MMM dd, yyyy')}</span>}
                      {endDateValue && <span> To: {format(endDateValue, 'MMM dd, yyyy')}</span>}
                    </div>
                    {dateRange && (
                      <Button variant="ghost" size="sm" onClick={() => {
                        setDate(undefined);
                        setEndDateValue(undefined);
                        onFilterChange('dateRange', '');
                      }}>
                        Clear
                      </Button>
                    )}
                  </div>
                }
              />
            </DateRangePopoverContent>
          </DateRangePopover>
          
          <Select 
            value={sortField} 
            onValueChange={(value) => onFilterChange('sortField', value as "date" | "name")}
          >
            <SelectTrigger className="border-0 focus:ring-0 bg-transparent h-10 px-3 font-normal">
              <span className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Sort: {sortField === 'date' ? 'Date' : 'Name'}</span>
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date and Time</SelectItem>
              <SelectItem value="name">Patient Name</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-10 w-10 p-0"
            onClick={onToggleSortDirection}
          >
            {sortDirection === "asc" ? 
              <ArrowUp className="h-4 w-4 text-gray-600" /> : 
              <ArrowDown className="h-4 w-4 text-gray-600" />
            }
          </Button>
        </div>
        
        {/* View toggle and clear filters */}
        <div className="flex items-center gap-1 px-1 border-l border-gray-200">
          <div className="flex border rounded-md h-8 overflow-hidden">
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className={`${viewMode === "list" ? "bg-primary text-white" : "bg-transparent text-gray-600"} rounded-r-none px-3 h-8`}
              onClick={() => onFilterChange('viewMode', 'list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className={`${viewMode === "grid" ? "bg-primary text-white" : "bg-transparent text-gray-600"} rounded-l-none px-3 h-8`}
              onClick={() => onFilterChange('viewMode', 'grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
          
          {(visitTypeFilter !== "all" || dateRange) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-primary hover:text-primary/80 h-8"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {/* Active filters display */}
      {(visitTypeFilter !== "all" || dateRange) && (
        <div className="flex items-center gap-2 mt-2 text-sm">
          <span className="text-gray-500">Active filters:</span>
          
          {visitTypeFilter !== "all" && (
            <div className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded">
              {visitTypeOptions.find(option => option.value === visitTypeFilter)?.label}
              <button
                onClick={() => onFilterChange('visitTypeFilter', 'all')}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {dateRange && date && (
            <div className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded">
              {endDateValue ? `${format(date, 'MMM dd, yyyy')} - ${format(endDateValue, 'MMM dd, yyyy')}` : `From ${format(date, 'MMM dd, yyyy')}`}
              <button
                onClick={() => {
                  onFilterChange('dateRange', '');
                  setDate(undefined);
                  setEndDateValue(undefined);
                }}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
