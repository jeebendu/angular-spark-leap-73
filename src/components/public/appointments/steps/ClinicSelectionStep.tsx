
import { Building, MapPin, Navigation } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { type Clinic } from "@/models/clinic/Clinic";

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
  // Find primary clinic (first in the list) and other locations
  const primaryClinic = clinics[0];
  const otherClinics = clinics.slice(1);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Select Clinic
        </h3>
        
        {primaryClinic && (
          <>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Primary Location</h4>
              <RadioGroup 
                value={selectedClinic} 
                onValueChange={setSelectedClinic}
                className="space-y-3"
              >
                <div 
                  className={`bg-slate-50 rounded-lg p-4 transition-colors ${
                    selectedClinic === primaryClinic.id ? "border-2 border-primary shadow-sm" : "border border-gray-100"
                  }`}
                >
                  <div className="flex items-start">
                    <RadioGroupItem value={primaryClinic.id} id={`clinic-${primaryClinic.id}`} className="mt-1" />
                    <Label htmlFor={`clinic-${primaryClinic.id}`} className="ml-3 cursor-pointer flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-teal-500 mr-1 flex-shrink-0" />
                            <div className="font-medium text-lg">{primaryClinic.name}</div>
                          </div>
                          <div className="text-sm text-gray-500 ml-5">{primaryClinic.address}</div>
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
            
            {otherClinics.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Also Available At</h4>
                <RadioGroup 
                  value={selectedClinic} 
                  onValueChange={setSelectedClinic}
                  className="space-y-3"
                >
                  {otherClinics.map((clinic) => (
                    <div 
                      key={clinic.id} 
                      className={`bg-slate-50 rounded-lg p-4 transition-colors ${
                        selectedClinic === clinic.id ? "border-2 border-primary shadow-sm" : "border border-gray-100"
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
