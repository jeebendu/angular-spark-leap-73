
import { ClipboardCheck, User, Building, Calendar } from "lucide-react";
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border p-4 space-y-2">
          <div className="flex items-center mb-1">
            <User className="h-4 w-4 text-primary mr-2" />
            <h4 className="font-medium">Doctor</h4>
          </div>
          <p className="font-medium text-base pl-6">{doctorName || "Selected Doctor"}</p>
          {specialty && <p className="text-sm text-gray-600 pl-6">{specialty}</p>}
        </div>
        
        <div className="bg-white rounded-lg border p-4 space-y-2">
          <div className="flex items-center mb-1">
            <User className="h-4 w-4 text-purple-500 mr-2" />
            <h4 className="font-medium">Patient</h4>
          </div>
          <p className="font-medium text-base pl-6">{patient?.name}</p>
          <p className="text-sm text-gray-600 pl-6">{patient?.relationship}</p>
        </div>
        
        <div className="bg-white rounded-lg border p-4 space-y-2">
          <div className="flex items-center mb-1">
            <Building className="h-4 w-4 text-emerald-500 mr-2" />
            <h4 className="font-medium">Clinic</h4>
          </div>
          <p className="font-medium text-base pl-6">{clinic?.name}</p>
          <p className="text-sm text-gray-600 pl-6">{clinic?.address}</p>
        </div>
        
        <div className="bg-white rounded-lg border p-4 space-y-2">
          <div className="flex items-center mb-1">
            <Calendar className="h-4 w-4 text-amber-500 mr-2" />
            <h4 className="font-medium">Appointment</h4>
          </div>
          <p className="font-medium text-base pl-6">{formattedDate}</p>
          <p className="text-sm text-gray-600 pl-6">{selectedTime}</p>
        </div>
      </div>
      
      <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm">
        <p className="text-blue-700">Please verify all appointment details before proceeding to payment.</p>
      </div>
    </div>
  );
}
