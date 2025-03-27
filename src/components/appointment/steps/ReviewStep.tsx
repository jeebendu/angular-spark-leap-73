
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Clinic {
  id: string;
  name: string;
  address: string;
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

interface ReviewStepProps {
  doctorName?: string;
  specialty?: string;
  selectedClinic: string;
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
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Review Appointment Details</h3>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-gray-500">Doctor</span>
          <span className="font-medium">{doctorName || "Dr. Sarah Johnson"}</span>
        </div>
        
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-gray-500">Specialty</span>
          <span className="font-medium">{specialty || "Cardiologist"}</span>
        </div>
        
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-gray-500">Clinic</span>
          <span className="font-medium">
            {clinics.find(c => c.id === selectedClinic)?.name || "Not selected"}
          </span>
        </div>
        
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-gray-500">Date</span>
          <span className="font-medium">{selectedDate || "Not selected"}</span>
        </div>
        
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-gray-500">Time</span>
          <span className="font-medium">{selectedTime || "Not selected"}</span>
        </div>
        
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-gray-500">Patient</span>
          <span className="font-medium">
            {selectedMember === "self" 
              ? "You" 
              : familyMembers.find(m => m.id === selectedMember)?.name || "Not selected"}
          </span>
        </div>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <Label className="block mb-2">Reason for Visit (Optional)</Label>
        <Input 
          placeholder="Enter the reason for your visit" 
          className="bg-transparent"
        />
      </div>
    </div>
  );
}
