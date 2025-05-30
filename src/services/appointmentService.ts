import { Appointment, ClinicReference } from "@/models/appointment/Appointment";
import { Clinic } from "@/models/clinic/Clinic";
import { FamilyMember } from "@/models/patient/Patient";
import http from "@/lib/JwtInterceptor";

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

// Mock data for family members - Updated to include all required properties
export const getFamilyMembers = (): FamilyMember[] => [
  { 
    id: "1", 
    name: "Sarah Smith", 
    relationship: "Spouse", 
    age: 35, 
    gender: "Female", 
    phone: "123-456-7890" 
  },
  { 
    id: "2", 
    name: "Alex Smith", 
    relationship: "Child", 
    age: 10, 
    gender: "Male", 
    phone: "123-456-7891" 
  },
  { 
    id: "3", 
    name: "Jane Smith", 
    relationship: "Parent", 
    age: 65, 
    gender: "Female", 
    phone: "123-456-7892" 
  }
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

// Available times - Updated to include more slots and match the image
export const getAvailableTimes = (): string[] => [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
];

// Updated validation function to accept ClinicReference instead of Clinic
export const validateClinicSelection = (selectedClinic: ClinicReference | string, toastHelpers: ToastHelpers): boolean => {
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
  selectedDate: Date, 
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

// Validate current step based on step number - Updated to handle ClinicReference
export const validateCurrentStep = (
  step: number,
  appointment: Appointment,
  toastHelpers: ToastHelpers
): boolean => {
  switch(step) {
    case 1:
      return validateClinicSelection(appointment?.doctorClinic?.clinic, toastHelpers);
    case 2:
      return validateDateTimeSelection(appointment?.slot.date,appointment?.slot?.startTime, toastHelpers);
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
  // // In a real app, this would make an API call to save the appointment
  // toastHelpers.toast({
  //   title: "Appointment Booked!",
  //   description: `Your appointment has been confirmed for ${appointmentDetails.selectedDate} at ${appointmentDetails.selectedTime}.`,
  // });
  
  // // Return success - in a real app, you might return a Promise with the result
  // console.log("Appointment booked:", appointmentDetails);
};

// Get clinic by ID
export const getClinicById = (clinicId: string): Clinic | undefined => {
  return getClinics().find(clinic => clinic.id === clinicId);
};

// Get family member by ID - Updated to include all required FamilyMember properties
export const getFamilyMemberById = (memberId: string): FamilyMember | undefined => {
  // Handle the "self" case
  if (memberId === "self") {
    return { 
      id: "self", 
      name: "Yourself", 
      relationship: "Self", 
      age: 0, 
      gender: "Not specified", 
      phone: "" 
    };
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

export const saveAppointment = async (appointment: Appointment) => {
  return await http.post(`/v1/appointments/saveOrUpdate`, appointment);
};

export const slotByDrAndBranchId = async (slotFilter: any) => {
  return await http.post(`/v1/public/doctor/slots/list-filtered`, slotFilter);
};

export const getAllAppointmentList = async (name: any) => {
  return await http.get(`/v1/appointments/patient/appointments/${name}`);
};
  
export const getPatietRelationList = async (id: any) => {
  return await http.get(`/v1/patient/relation-with/list/patient/${id}`);
};

export const createNewPatientRelation = async (familymember: any) => {
  return await http.post(`/v1/patient/relation-with/saveOrUpdate`, familymember);
};

export const cancelAppointment = async (id: number) => {
  return await http.post(`/v1/appointments/updateStatusToCancelled/id/${id}`);
}
