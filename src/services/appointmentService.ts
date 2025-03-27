
import { useToast } from "@/components/ui/use-toast";

// Types
export interface Clinic {
  id: string;
  name: string;
  address: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

interface AppointmentDetails {
  selectedClinic: string;
  selectedDate: string;
  selectedTime: string;
  selectedMember: string;
  doctorName?: string;
  specialty?: string;
}

// Mock data for family members
export const getFamilyMembers = (): FamilyMember[] => [
  { id: "1", name: "Sarah Smith", relationship: "Spouse" },
  { id: "2", name: "Alex Smith", relationship: "Child" },
  { id: "3", name: "Jane Smith", relationship: "Parent" }
];

// Mock data for clinics
export const getClinics = (): Clinic[] => [
  { id: "1", name: "HealthFirst Clinic, Indiranagar", address: "100 Main St, Indiranagar, Bangalore" },
  { id: "2", name: "MediCare Center, Koramangala", address: "200 Park Ave, Koramangala, Bangalore" },
  { id: "3", name: "WellBeing Hospital, HSR Layout", address: "300 Oak Rd, HSR Layout, Bangalore" }
];

// Available times
export const getAvailableTimes = (): string[] => [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

// Validation functions
export const validateClinicSelection = (selectedClinic: string, toast: ReturnType<typeof useToast>): boolean => {
  if (!selectedClinic) {
    toast.toast({
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
  toast: ReturnType<typeof useToast>
): boolean => {
  if (!selectedDate || !selectedTime) {
    toast.toast({
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
  appointmentDetails: AppointmentDetails,
  toast: ReturnType<typeof useToast>
): boolean => {
  switch(step) {
    case 1:
      return validateClinicSelection(appointmentDetails.selectedClinic, toast);
    case 2:
      return validateDateTimeSelection(appointmentDetails.selectedDate, appointmentDetails.selectedTime, toast);
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
  toast: ReturnType<typeof useToast>
): void => {
  // In a real app, this would make an API call to save the appointment
  toast.toast({
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
