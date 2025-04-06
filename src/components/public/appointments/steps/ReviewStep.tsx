
import { ClipboardCheck, User, Building, Calendar, Clock } from "lucide-react";
import { getClinicById, getFamilyMemberById, type Clinic, type FamilyMember } from "@/services/appointmentService";
import { format } from "date-fns";

interface ReviewStepProps {
  doctorName?: string;
  specialty?: string;
  selectedClinic: string; // This is a clinic ID
  clinics: Clinic[];
  selectedDate: string;
  selectedTime: string;
  selectedMember: string;
  familyMembers: FamilyMember[];
}

export function ReviewStep({ 
  doctorName, 
  specialty, 
  selectedClinic, 
  clinics, 
  selectedDate, 
  selectedTime, 
  selectedMember, 
  familyMembers 
}: ReviewStepProps) {
  const clinic = getClinicById(selectedClinic);
  const patient = getFamilyMemberById(selectedMember);
  
  // Format date for better display
  let formattedDate = "";
  if (selectedDate) {
    try {
      const date = new Date(selectedDate);
      formattedDate = format(date, "EEEE, MMMM d, yyyy");
    } catch (e) {
      formattedDate = selectedDate;
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <ClipboardCheck className="mr-2 h-5 w-5" />
        Review Appointment Details
      </h3>
      
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex border-b pb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Doctor</p>
            <p className="font-medium text-lg">{doctorName || "Selected Doctor"}</p>
            {specialty && <p className="text-sm text-primary">{specialty}</p>}
          </div>
        </div>
        
        <div className="flex border-b pb-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
            <Building className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Clinic</p>
            <p className="font-medium text-lg">{clinic?.name}</p>
            <p className="text-sm">{clinic?.address}</p>
          </div>
        </div>
        
        <div className="flex border-b pb-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
            <Calendar className="h-6 w-6 text-amber-600" />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between w-full">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{selectedTime}</p>
            </div>
          </div>
        </div>
        
        <div className="flex">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
            <User className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Patient</p>
            <p className="font-medium text-lg">{patient?.name}</p>
            <p className="text-sm">{patient?.relationship}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700">
          Please verify all appointment details before proceeding to payment. Rescheduling may be subject to availability.
        </p>
      </div>
    </div>
  );
}
