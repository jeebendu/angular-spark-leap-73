
import { Doctor } from "../doctor/Doctor";
import { DoctorClinic } from "../doctorClinic/DoctorClinic";
import { FamilyMember, Patient } from "../patient/Patient";
import { Branch } from "../shared/Branch";
import { Slot } from "./Slot";


// Define a simplified clinic reference for appointments
export interface ClinicReference {
  id: string;
  name: string;
  address: string;
}

export interface Appointment {
  id: number;
  appointmentDate: Date;
  status: string;
  branch: Branch;
  patient: Patient;
  doctor: Doctor;
  // appointmentType: AppointmentType;
  // visitType: VisitType;
  slot: Slot;
  familyMember: FamilyMember;
  doctorClinic: DoctorClinic;

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

// Add the AppointmentDetails interface that many components depend on
export interface AppointmentDetails {
  id: string;
  appointmentNumber: string;
  patientName: string;
  status: "upcoming" | "completed" | "cancelled";
  
  // UI-specific fields used in components
  selectedDate: string;
  selectedTime: string;
  visitType: "General Visit" | "Video Call" | "Audio Call" | "Direct Visit";
  email?: string;
  phone?: string;
  isNew?: boolean;
  age?: number;
  gender?: "Male" | "Female" | "Other";
  lastVisitDate?: string;
  nextVisitDate?: string;
  consultationFee?: number;
  selectedClinic: ClinicReference;
  selectedMember: string;
  
  // Add the vitalSigns property to match what's used in AppointmentDetailsDialog
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
