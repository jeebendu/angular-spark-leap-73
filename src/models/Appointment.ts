
import { Branch } from "./Branch";

export interface AppointmentDetails {
  selectedClinic: Branch;
  selectedDate: string;
  selectedTime: string;
  selectedMember: string;
  doctorName?: string;
  specialty?: string;
  status?: "upcoming" | "completed" | "cancelled";
  reason?: string;
  patientName?: string;
  appointmentType?: string;
  id?: string;
  email?: string;
  phone?: string;
  appointmentNumber?: string;
  visitType?: "General Visit" | "Video Call" | "Audio Call" | "Direct Visit";
  isNew?: boolean;
  lab?: string;
  testType?: string;
  age?: number;
  gender?: "Male" | "Female" | "Other";
  lastVisitDate?: string;
  nextVisitDate?: string;
  consultationFee?: number;
  patientId?: string;
  vitalSigns?: {
    temperature?: string;
    pulse?: string;
    respiratoryRate?: string;
    spo2?: string;
    height?: string;
    weight?: string;
    bmi?: string;
  };
}

export interface FilterOption {
  label: string;
  value: string;
}

export const visitTypeOptions: FilterOption[] = [
  { label: "General Visit", value: "General Visit" },
  { label: "Video Call", value: "Video Call" },
  { label: "Audio Call", value: "Audio Call" },
  { label: "Direct Visit", value: "Direct Visit" },
];

export const statusOptions: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];
