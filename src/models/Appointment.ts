
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
}
