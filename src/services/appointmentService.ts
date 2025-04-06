
import { Appointment, ClinicReference } from "@/models/Appointment";
import { Clinic } from "@/models/Clinic";
import { FamilyMember } from "@/models/Patient";

// We need to manually define the ToasterToast type since it's not exported from the module
interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  variant?: "default" | "destructive";
  open?: boolean;
  dismiss?: () => void;
}

// Export the types needed by other components
export type { Clinic, FamilyMember, ClinicReference };

export interface ToastHelpers {
  toast: (props: any) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void };
  dismiss: (toastId?: string) => void;
  toasts: ToasterToast[];
}

// Mock data for family members
export const getFamilyMembers = (): FamilyMember[] => [
  { id: "1", name: "Sarah Smith", relationship: "Spouse" },
  { id: "2", name: "Alex Smith", relationship: "Child" },
  { id: "3", name: "Jane Smith", relationship: "Parent" }
];

// Mock data for clinics - Now returning proper Clinic objects
export const getClinics = (): Clinic[] => [
  {
    id: "1",
    name: "Main Clinic",
    email: "main@clinic.com",
    contact: "+1 123 456 7890",
    address: "123 Main St",
    branchList: [],
    days: "Mon-Fri",
    timings: "9:00 AM - 5:00 PM"
  },
  {
    id: "2",
    name: "Downtown Clinic",
    email: "downtown@clinic.com",
    contact: "+1 123 456 7891",
    address: "456 Central Ave",
    branchList: [],
    days: "Mon-Sat",
    timings: "8:00 AM - 7:00 PM"
  },
  {
    id: "3",
    name: "East Side Clinic",
    email: "eastside@clinic.com",
    contact: "+1 123 456 7892",
    address: "789 East Blvd",
    branchList: [],
    days: "Mon-Sun",
    timings: "24/7"
  }
];

// Available times
export const getAvailableTimes = (): string[] => [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

// Validation functions
export const validateClinicSelection = (selectedClinic: Clinic, toastHelpers: ToastHelpers): boolean => {
  if (!selectedClinic) {
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

// No validation needed for patient selection and review steps
export const validatePatientSelection = (): boolean => true;
export const validateReviewStep = (): boolean => true;

// Validate current step based on step number
export const validateCurrentStep = (
  step: number,
  appointment: Appointment,
  toastHelpers: ToastHelpers
): boolean => {
  switch(step) {
    case 1:
      return validateClinicSelection(appointment.selectedClinic, toastHelpers);
    case 2:
      return validateDateTimeSelection(appointment.selectedDate, appointment.selectedTime, toastHelpers);
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
  appointmentDetails: Appointment,
  toastHelpers: ToastHelpers
): void => {
  // In a real app, this would make an API call to save the appointment
  toastHelpers.toast({
    title: "Appointment Booked!",
    description: `Your appointment has been confirmed for ${appointmentDetails.selectedDate} at ${appointmentDetails.selectedTime}.`,
  });
  
  // Return success - in a real app, you might return a Promise with the result
  console.log("Appointment booked:", appointmentDetails);
};

// Get clinic by ID
export const getClinicById = (clinicId: string): Clinic | undefined => {
  return getClinics().find(clinic => clinic.id === clinicId);
};

// Get family member by ID
export const getFamilyMemberById = (memberId: string): FamilyMember | undefined => {
  // Handle the "self" case
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
