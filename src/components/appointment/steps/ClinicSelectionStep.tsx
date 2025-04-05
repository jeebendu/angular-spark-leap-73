
import { Building } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Branch } from "@/models/Branch";
import { Appointments } from "@/components/BookAppointmentModal";

interface ClinicSelectionStepProps {
  appointmentObj: Appointments;
  setSelectedClinic: (branch: Branch) => void;
  branches: Branch[];
}

export function ClinicSelectionStep({ 
  appointmentObj, 
  setSelectedClinic, 
  branches 
}: ClinicSelectionStepProps) {

  const handleClinicSelection = (branchId: string) => {
    const selectedBranch = branches.find(branch => branch.id === branchId);
    if (selectedBranch) {
      setSelectedClinic(selectedBranch);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Select Clinic
        </h3>
        
        <RadioGroup 
          value={appointmentObj?.branch?.id?.toString()} 
          onValueChange={handleClinicSelection}
          className="space-y-3"
        >
          {branches?.map((branch) => (
            <div 
              key={branch.id} 
              className={`border rounded-lg p-4 transition-colors ${
                appointmentObj?.branch?.id === branch.id ? "border-primary" : "border-gray-200"
              }`}
            >
              <div className="flex items-start">
                <RadioGroupItem value={branch.id.toString()} id={`clinic-${branch.id}`} className="mt-1" />
                <Label htmlFor={`clinic-${branch.id}`} className="cursor-pointer">
                  <div className="font-medium">{branch.name}</div>
                  <div className="text-sm text-gray-500">
                    {branch.city && branch.district?.name && branch.state?.name ? 
                      `${branch.city}, ${branch.district.name}, ${branch.state.name}` : 
                      branch.location || "Location not available"}
                  </div>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
