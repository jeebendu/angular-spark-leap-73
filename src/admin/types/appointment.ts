import { Slot } from "@/models/appointment/Slot";
import { Doctor, DoctorClinic } from "@/models/doctor/Doctor";
import { FamilyMember, Patient } from "@/models/patient/Patient";
import { Branch } from "@/models/shared/Branch";

export type AppointmentType = "direct-visit" | "video-call" | "audio-call";
export type AppointmentStatus = "upcoming" | "completed" | "cancelled" | "new";
export type VisitType = "new" | "follow-up" | "emergency" | "routine";
// export type AppointmentStatus = "upcoming" | "completed" | "cancelled" | "new";

// export interface Appointment {
//   id: string;
//   patientId: string;
//   patientName: string;
//   patientEmail: string;
//   patientPhone: string;
//   patientAddress?: string;
//   patientAge?: number;
//   patientGender?: string;
//   appointmentId: string;
//   date: string;
//   time: string;
//   type: AppointmentType;
//   status: AppointmentStatus;
//   cost: number;
//   lastVisit?: string;
//   nextVisit?: string;
// }


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

}

