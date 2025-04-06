
import { Building } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { type Clinic } from "@/models/Clinic";

interface ClinicSelectionStepProps {
  selectedClinic: string; // This is a clinic ID
  setSelectedClinic: (clinicId: string) => void;
  clinics: Clinic[];
}

export function ClinicSelectionStep({ 
  selectedClinic, 
  setSelectedClinic, 
  clinics 
}: ClinicSelectionStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Select Clinic
        </h3>
        
        <RadioGroup 
          value={selectedClinic} 
          onValueChange={setSelectedClinic}
          className="space-y-3"
        >
          {clinics.map((clinic) => (
            <div 
              key={clinic.id} 
              className={`border rounded-lg p-4 transition-colors ${
                selectedClinic === clinic.id ? "border-primary" : "border-gray-200"
              }`}
            >
              <div className="flex items-start">
                <RadioGroupItem value={clinic.id} id={`clinic-${clinic.id}`} className="mt-1" />
                <Label htmlFor={`clinic-${clinic.id}`} className="ml-2 cursor-pointer">
                  <div className="font-medium">{clinic.name}</div>
                  <div className="text-sm text-gray-500">{clinic.address}</div>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
