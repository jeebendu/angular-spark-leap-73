
import { Slot } from "@/models/appointment/Slot";
import { Doctor } from "@/models/doctor/Doctor";
import { DoctorClinic } from "@/models/doctorClinic/DoctorClinic";
import { FamilyMember, Patient } from "@/models/patient/Patient";
import { Branch } from "@/models/shared/Branch";

export type AppointmentType = "direct-visit" | "video-call" | "audio-call";
export type AppointmentStatus = "upcoming" | "completed" | "cancelled" | "new";
export type VisitType = "new" | "follow-up" | "emergency" | "routine";

export interface Appointment {
  id: number;
  appointmentDate: Date;
  status: AppointmentStatus;
  branch: Branch;
  patient: Patient;
  doctor: Doctor;
  slot: Slot;
  familyMember: FamilyMember;
  doctorClinic: DoctorClinic;
  appointmentType?: AppointmentType;
}
