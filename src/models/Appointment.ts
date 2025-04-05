import { Branch } from "./Branch";

export interface AppointmentDetails {
  selectedClinic: Branch;
  selectedDate: string;
  selectedTime: string;
  selectedMember: string;
  doctorName?: string;
  specialty?: string;
}