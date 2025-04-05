
import { FilterOption } from "./Appointment";

export interface AppointmentFilterState {
  searchQuery: string;
  dateRange: string;  // Format: "YYYY-MM-DD - YYYY-MM-DD" or empty string
  visitTypeFilter: string;
  sortField: "date" | "name";
  sortDirection: "asc" | "desc";
  viewMode: "list" | "grid";
}

export const defaultFilters: AppointmentFilterState = {
  searchQuery: "",
  dateRange: "", // Empty string is safer than an invalid date format
  visitTypeFilter: "all",
  sortField: "date",
  sortDirection: "asc",
  viewMode: "list"
};
