import { useEffect } from "react";
import { Building, MapPin, Navigation } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { type Clinic } from "@/models/clinic/Clinic";
import { Appointment } from "@/models/appointment/Appointment";
import { Branch } from "@/models/shared/Branch";

interface ClinicSelectionStepProps {
  appointment: Appointment; // This is a clinic ID
  onBranchSelect: (branch: Branch) => void;
  branchList: Branch[];
}

export function ClinicSelectionStep({ 
  appointment, 
  onBranchSelect, 
  branchList 
}: ClinicSelectionStepProps) {
  // Find primary clinic (first in the list) and other locations
  // const primaryClinic = clinics[0];
  // const otherClinics = clinics.slice(1);

  // Auto-select the primary clinic on component load
  // useEffect(() => {
  //   if (primaryClinic && !selectedClinic) {
  //     setSelectedClinic(primaryClinic.id);
  //   }
  // }, [primaryClinic, selectedClinic, setSelectedClinic]);

  const handleClinicSelection = (branchId: string) => {
    const selectedBranch = branchList.find(branch => branch.id == branchId);
    if (selectedBranch) {
      onBranchSelect(selectedBranch);
      
    }
  };
  const otherBranches = branchList.filter(branch => branch.id !== appointment?.branch?.id);


  return (
    <div className="space-y-6">
      <div>
        {appointment.branch && (
          <>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Location</h4>
              <RadioGroup 
                value={appointment?.branch?.id} 
                onValueChange={handleClinicSelection}
                className="space-y-3"
              >
                <div 
                  className={`bg-slate-50 rounded-lg p-4 transition-colors ${
                    appointment?.branch?.id ? "border-2 border-primary shadow-sm" : "border border-gray-100"
                  }`}
                >
                  <div className="flex items-start">
                    <RadioGroupItem value={appointment?.branch?.id} id={`clinic-${appointment?.branch?.id}`} className="mt-1" />
                    <Label htmlFor={`clinic-${appointment?.branch?.id}`} className="ml-3 cursor-pointer flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-teal-500 mr-1 flex-shrink-0" />
                            <div className="font-medium text-lg">{appointment.branch.name}</div>
                          </div>
                          <div className="text-sm text-gray-500 ml-5">{appointment.branch.address}</div>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Navigation className="h-4 w-4 mr-1" />
                          <span className="text-sm">2.3 km</span>
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            {otherBranches.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Also Available At</h4>
                <RadioGroup 
                  value={appointment.branch.id} 
                  onValueChange={handleClinicSelection}
                  className="space-y-3"
                >
                  {otherBranches.map((clinic) => (
                    <div 
                      key={clinic.id} 
                      className={`bg-slate-50 rounded-lg p-4 transition-colors ${
                        appointment?.branch?.id === clinic.id ? "border-2 border-primary shadow-sm" : "border border-gray-100"
                      }`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem value={clinic.id} id={`clinic-${clinic.id}`} className="mt-1" />
                        <Label htmlFor={`clinic-${clinic.id}`} className="ml-3 cursor-pointer flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-sky-500 mr-1 flex-shrink-0" />
                                <div className="font-medium text-lg">{clinic.name}</div>
                              </div>
                              <div className="text-sm text-gray-500 ml-5">{clinic.address}</div>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Navigation className="h-4 w-4 mr-1" />
                              <span className="text-sm">5.1 km</span>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}