
import { ClipboardCheck } from "lucide-react";
import { getClinicById, getFamilyMemberById, type Clinic, type FamilyMember } from "@/services/appointmentService";

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

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <ClipboardCheck className="mr-2 h-5 w-5" />
        Review Appointment Details
      </h3>
      
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Doctor</h4>
          <div className="bg-white p-3 rounded-md">
            <p className="font-medium">{doctorName || "Selected Doctor"}</p>
            {specialty && <p className="text-sm text-gray-500">{specialty}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Clinic</h4>
          <div className="bg-white p-3 rounded-md">
            <p className="font-medium">{clinic?.name}</p>
            <p className="text-sm text-gray-500">{clinic?.address}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Date & Time</h4>
          <div className="bg-white p-3 rounded-md">
            <p className="font-medium">{selectedDate}</p>
            <p className="text-sm text-gray-500">{selectedTime}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Patient</h4>
          <div className="bg-white p-3 rounded-md">
            <p className="font-medium">{patient?.name}</p>
            <p className="text-sm text-gray-500">{patient?.relationship}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
