
import { Braces, Building } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Branch } from "@/services/appointmentService";
import { useEffect } from "react";

interface ClinicSelectionStepProps {
  selectedClinic: Branch;
  setSelectedClinic: (branch: Branch | string) => void;
  branches: Branch[];
}

export function ClinicSelectionStep({ 
  selectedClinic, 
  setSelectedClinic, 
  branches 
}: ClinicSelectionStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Select Clinic
        </h3>
        
        <RadioGroup 
          value={selectedClinic?.id} 
          onValueChange={(value) => {
            // Find the branch object by id and pass it
            const branch = branches.find(branch => branch.id.toString() === value);
            setSelectedClinic(branch || value);
          }}
          className="space-y-3"
        >
          {branches?.map((branch) => (
            <div 
              key={branch.id} 
              className={`border rounded-lg p-4 transition-colors ${
                selectedClinic?.id === branch.id ? "border-primary" : "border-gray-200"
              }`}
            >
              <div className="flex items-start">
                <RadioGroupItem value={branch.id.toString()} id={`clinic-${branch.id}`} className="mt-1" />
                <Label htmlFor={`clinic-${branch.id}`} className="ml-2 cursor-pointer">
                  <div className="font-medium">{branch.name}</div>
                  <div className="text-sm text-gray-500">{`${branch.city}, ${branch.district.name}, ${branch.state.name}`}</div>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
