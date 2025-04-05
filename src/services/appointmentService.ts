import { Appointments, Slot } from "@/components/BookAppointmentModal";
import { Branch } from "@/models/Branch";
import { FamilyMember } from "@/models/Patient";
import { ToastHelpers } from "@/models/ToastHelpers";

// Mock data for family members
export const getFamilyMembers = (): FamilyMember[] => [
  { id: "1", name: "Sarah Smith", relationship: "Spouse" },
  { id: "2", name: "Alex Smith", relationship: "Child" },
  { id: "3", name: "Jane Smith", relationship: "Parent" }
];

// Available times
export const getAvailableTimes = (): string[] => [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

// Validation functions
export const validateClinicSelection = (selectedClinic: Branch, toastHelpers: ToastHelpers): boolean => {
  if (!selectedClinic?.id) {
    toastHelpers.toast({
      title: "Please select a clinic",
      description: "You need to select a clinic to proceed.",
      variant: "destructive"
    });
    return false;
  }
  return true;
};

export const validateDateTimeSelection = (
  selectedDate: string,
  selectedTime: string,
  toastHelpers: ToastHelpers
): boolean => {
  if (!selectedDate || !selectedTime) {
    toastHelpers.toast({
      title: "Required fields missing",
      description: "Please select both date and time for your appointment.",
      variant: "destructive"
    });
    return false;
  }
  return true;
};

export const validateSlotSelection = (slot: Slot, toastHelpers: ToastHelpers): boolean => {
  if (!slot?.id) {
    toastHelpers.toast({
      title: "Required fields missing",
      description: "Please select a valid slot for your appointment.",
      variant: "destructive"
    });
    return false;
  }
  return true;
};

// No validation needed for patient selection and review steps
export const validatePatientSelection = (): boolean => true;
export const validateReviewStep = (): boolean => true;

// Validate current step based on step number
export const validateCurrentStep = (
  step: number,
  appointmentDetails: Appointments,
  toastHelpers: ToastHelpers
): boolean => {
  switch (step) {
    case 1:
      return validateClinicSelection(appointmentDetails.selectedClinic, toastHelpers);
    case 2:
      return validateDateTimeSelection(appointmentDetails.selectedDate, appointmentDetails.selectedTime, toastHelpers);
    case 3:
      return validatePatientSelection();
    case 4:
      return validateReviewStep();
    default:
      return true;
  }
};

export const validateCurrentAppointmentStep = (
  step: number,
  appointment: Appointments,
  toastHelpers: ToastHelpers
): boolean => {
  switch (step) {
    case 1:
      return validateClinicSelection(appointment.branch, toastHelpers);
    case 2:
      return validateSlotSelection(appointment.slot, toastHelpers);
    case 3:
      return validatePatientSelection();
    case 4:
      return validateReviewStep();
    default:
      return true;
  }
};

// Book appointment function
export const bookAppointment = (
  appointmentDetails: AppointmentDetails,
  toastHelpers: ToastHelpers
): void => {
  toastHelpers.toast({
    title: "Appointment Booked!",
    description: `Your appointment has been confirmed for ${appointmentDetails.selectedDate} at ${appointmentDetails.selectedTime}.`,
  });

  console.log("Appointment booked:", appointmentDetails);
};

// Get family member by ID
export const getFamilyMemberById = (memberId: string): FamilyMember | undefined => {
  if (memberId === "self") {
    return { id: "self", name: "Yourself", relationship: "Self" };
  }
  return getFamilyMembers().find(member => member.id === memberId);
};

// Calculate appointment cost
export const calculateAppointmentCost = (): { consultationFee: number, platformFee: number, gst: number, total: number } => {
  const consultationFee = 800;
  const platformFee = 100;
  const gst = Math.round((consultationFee + platformFee) * 0.18);
  const total = consultationFee + platformFee + gst;

  return {
    consultationFee,
    platformFee,
    gst,
    total
  };
};