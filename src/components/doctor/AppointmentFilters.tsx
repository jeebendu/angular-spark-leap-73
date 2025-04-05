
import React from "react";
import { Search, Calendar, Filter, X, Download, Grid, List, ArrowUp, ArrowDown } from "lucide-react";
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

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full lg:w-auto lg:min-w-[320px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by patient name, mobile number..."
            className="pl-9 pr-4 h-10 rounded-lg"
            value={searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 h-10">
            <Calendar className="h-4 w-4" />
            {dateRange || `${new Date().toLocaleDateString()} - ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}`}
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
                  onClick={onClearFilters}
                >
                  Clear All
                </Button>
              </div>
              <div className="p-3 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Visit Type</label>
                  <Select 
                    value={visitTypeFilter} 
                    onValueChange={(value) => onFilterChange('visitTypeFilter', value)}
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
                      onValueChange={(value) => onFilterChange('sortField', value)}
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
                      onClick={onToggleSortDirection}
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
      
      {/* Azure-style filters */}
      <div className="bg-gray-100 mb-6 p-2 flex items-center rounded-md overflow-x-auto">
        <div className="flex items-center text-gray-500 px-2">
          <Filter className="h-4 w-4 mr-2" /> 
          Filter by:
        </div>
        
        <div className="flex space-x-1 overflow-x-auto pb-1">
          <Select 
            value={visitTypeFilter} 
            onValueChange={(value) => onFilterChange('visitTypeFilter', value)}
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
            onClick={() => onFilterChange('visitTypeFilter', 'all')}
            className="ml-auto flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </button>
        )}
      </div>
    </>
  );
}
