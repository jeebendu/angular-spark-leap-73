
// Shared appointment model used by both web and mobile platforms
export interface AppointmentBase {
  id: number;
  doctorId: number;
  patientId: number;
  branchId: number;
  slotId: number;
  appointmentDate: Date | string;
  status: AppointmentStatus;
  appointmentType?: AppointmentType;
  paymentStatus?: PaymentStatus;
}

export type AppointmentStatus = "UPCOMING" | "COMPLETED" | "CANCELLED" | "IN_PROGRESS";
export type AppointmentType = "DIRECT_VISIT" | "VIDEO_CALL" | "AUDIO_CALL";
export type PaymentStatus = "PAID" | "PENDING" | "FAILED";

export interface SlotBase {
  id: number;
  doctorId?: number;
  branchId?: number;
  date?: Date | string;
  startTime: string;
  endTime: string;
  availableSlots: number;
  duration?: number;
  status?: string;
}
