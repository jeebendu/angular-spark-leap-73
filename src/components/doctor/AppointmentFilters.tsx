
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
    <div className="flex flex-col gap-4 mb-6 sticky top-0 pt-6 pb-4 bg-transparent z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:w-auto lg:flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by patient name, mobile number..."
            className="pl-9 pr-4 h-10 rounded-lg"
            value={searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full lg:w-auto justify-end">
          <DateRangePopover>
            <DateRangePopoverTrigger asChild>
              <Button variant="outline" className="gap-2 h-10">
                <Calendar className="h-4 w-4" />
                {dateRange && date && (endDateValue || date) ? getDisplayDateRange() : "Select date range"}
              </Button>
            </DateRangePopoverTrigger>
            <DateRangePopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="range"
                selected={{
                  from: date,
                  to: endDateValue
                }}
                onSelect={(range) => {
                  if (range?.from) {
                    setDate(range.from);
                    setEndDateValue(range.to);
                    
                    const formattedStartDate = format(range.from, 'yyyy-MM-dd');
                    if (range.to) {
                      const formattedEndDate = format(range.to, 'yyyy-MM-dd');
                      onFilterChange('dateRange', `${formattedStartDate} - ${formattedEndDate}`);
                    } else {
                      onFilterChange('dateRange', formattedStartDate);
                    }
                  }
                }}
                initialFocus
                className="p-3 pointer-events-auto bg-white"
                classNames={{
                  day_selected: "bg-primary text-primary-foreground",
                  day_range_start: "bg-primary text-primary-foreground",
                  day_range_end: "bg-primary text-primary-foreground",
                  day_range_middle: "bg-primary/20 text-primary-foreground"
                }}
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
            value={visitTypeFilter} 
            onValueChange={(value) => onFilterChange('visitTypeFilter', value)}
          >
            <SelectTrigger className="h-10 min-w-40">
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="truncate">
                  {visitTypeFilter === 'all' 
                    ? 'All Visit Types' 
                    : visitTypeOptions.find(option => option.value === visitTypeFilter)?.label || 'Visit Type'}
                </span>
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Visit Types</SelectItem>
              {visitTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={sortField} 
            onValueChange={(value) => onFilterChange('sortField', value as "date" | "name")}
          >
            <SelectTrigger className="h-10 min-w-32">
              <span className="flex items-center gap-2">
                <span className="truncate">Sort by: {sortField === 'date' ? 'Date' : 'Name'}</span>
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date and Time</SelectItem>
              <SelectItem value="name">Patient Name</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10"
            onClick={onToggleSortDirection}
          >
            {sortDirection === "asc" ? 
              <ArrowUp className="h-4 w-4" /> : 
              <ArrowDown className="h-4 w-4" />
            }
          </Button>
          
          <div className="flex border rounded-md h-10">
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"}
              className="rounded-r-none px-3"
              onClick={() => onFilterChange('viewMode', 'list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"}
              className="rounded-l-none px-3"
              onClick={() => onFilterChange('viewMode', 'grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {(visitTypeFilter !== "all" || dateRange) && (
        <div className="flex items-center gap-2 text-sm">
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
          
          <button
            onClick={onClearFilters}
            className="ml-auto text-primary hover:text-primary/80 text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
