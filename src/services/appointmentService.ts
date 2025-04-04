import { Appointments, Slot } from "@/components/BookAppointmentModal";
import { Country, District, State } from "@/pages/DoctorSearch";

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

export class Patient {
  id: number;
  branch: Branch;
  user: User;
  uid?: string;
  firstname: string;
  lastname: string;
  dob?: Date;
  age?: number;
  gender?: string;
  alternativeContact?: string;
  whatsappNo?: string;
  address?: string;
  city?: string;
  country?: Country;
  state?: State;
  district?: District;

}
export interface User {
  id: number;
  branch: Branch;
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  effectiveTo?: Date;
  effectiveFrom?: Date;
  role: Role;

}

export interface Role {
  id: number;
  name: string;
}

export interface Clinic {
  id: string; // Corresponds to Long in Java
  name: string;
  email: string;
  contact: string;
  address: string;
  branchList: Branch[]; 
}

export class Branch {
  id: string; // Corresponds to Long in Java
  name: string;
  code: string;
  location: string;
  active: boolean;
  state: State; // Assuming State is another model class
  district: District; // Assuming District is another model class
  country: Country; // Assuming Country is another model class
  city: string;
  mapurl: string;
  pincode: number;
  image: string;
  latitude: number;
  longitude: number;
}



export interface FamilyMember {
  id: string;
  relationship: string;
  name: string;
}

interface AppointmentDetails {
  selectedClinic: Branch;
  selectedDate: string;
  selectedTime: string;
  selectedMember: string;
  doctorName?: string;
  specialty?: string;
}

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

// // Mock data for clinics
// export const getClinics = (): Clinic[] => [
//   { id: "1", name: "HealthFirst Clinic, Indiranagar", address: "100 Main St, Indiranagar, Bangalore" },
//   { id: "2", name: "MediCare Center, Koramangala", address: "200 Park Ave, Koramangala, Bangalore" },
//   { id: "3", name: "WellBeing Hospital, HSR Layout", address: "300 Oak Rd, HSR Layout, Bangalore" }
// ];

// Available times
export const getAvailableTimes = (): string[] => [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

// Validation functions
export const validateClinicSelection = (selectedClinic: Branch, toastHelpers: ToastHelpers): boolean => {
  console.log(selectedClinic);
  if (!selectedClinic.id) {
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

export const validateSlotSelection = (
  slot: Slot, 
  toastHelpers: ToastHelpers
): boolean => {
  if (!slot?.id) {
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
  appointmentDetails: AppointmentDetails,
  toastHelpers: ToastHelpers
): boolean => {
  switch(step) {
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
  console.log(appointment)
  switch(step) {
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
  // In a real app, this would make an API call to save the appointment
  toastHelpers.toast({
    title: "Appointment Booked!",
    description: `Your appointment has been confirmed for ${appointmentDetails.selectedDate} at ${appointmentDetails.selectedTime}.`,
  });
  
  // Return success - in a real app, you might return a Promise with the result
  console.log("Appointment booked:", appointmentDetails);
};

// // Get clinic by ID
// export const getClinicById = (clinicId: string): Clinic | undefined => {
//   return getClinics().find(clinic => clinic.id === clinicId);
// };

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
