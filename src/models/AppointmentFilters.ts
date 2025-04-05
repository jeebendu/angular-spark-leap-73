
import { FilterOption } from "./Appointment";

export interface AppointmentFilterState {
  searchQuery: string;
  dateRange: string;  // Format: "YYYY-MM-DD - YYYY-MM-DD"
  visitTypeFilter: string;
  sortField: "date" | "name";
  sortDirection: "asc" | "desc";
  viewMode: "list" | "grid";
}

export const defaultFilters: AppointmentFilterState = {
  searchQuery: "",
  dateRange: "",
  visitTypeFilter: "all",
  sortField: "date",
  sortDirection: "asc",
  viewMode: "list"
};
