
import React, { useEffect, useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Building, Store } from "lucide-react";
import { Clinic } from "@/admin/types/clinic";
import { Branch } from "@/admin/types/branch";
import { Country } from "@/admin/types/country";
import { State } from "@/admin/types/state";
import { District } from "@/admin/types/district";
import { Features } from "@/admin/types/features";
import { Module } from "@/admin/types/role";

// Mock data - In a real application, you would fetch these from an API
const mockModule: Module = { id: 1, name: "Basic Module" };
const mockFeatures: Features = { id: 1, module: mockModule, print: true };

const mockClinics: Clinic[] = [
  { id: 1, uid: "c1", name: "Main Clinic", email: "main@example.com", contact: "1234567890", address: "123 Main St", plan: { features: mockFeatures } },
  { id: 2, uid: "c2", name: "Downtown Clinic", email: "downtown@example.com", contact: "1234567891", address: "456 Downtown", plan: { features: mockFeatures } },
];

// Create country object to use in state and district objects
const mockCountry: Country = { id: 1, name: "Country 1" };

interface ClinicBranchFilterProps {
  className?: string;
}

export const ClinicBranchFilter: React.FC<ClinicBranchFilterProps> = ({ className }) => {
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [branches, setBranches] = useState<Branch[]>([]);
  
  // Load saved preferences from localStorage on component mount
  useEffect(() => {
    const savedClinic = localStorage.getItem("selectedClinic");
    const savedBranch = localStorage.getItem("selectedBranch");
    
    if (savedClinic) {
      setSelectedClinic(savedClinic);
    } else if (mockClinics.length > 0) {
      // Set default clinic if none is saved
      setSelectedClinic(mockClinics[0].uid);
      localStorage.setItem("selectedClinic", mockClinics[0].uid);
    }
    
    if (savedBranch) {
      setSelectedBranch(savedBranch);
    }
  }, []);

  // Fetch branches when selected clinic changes (mock implementation)
  useEffect(() => {
    if (!selectedClinic) return;
    
    // Create proper State object that includes the required country property
    const mockState: State = { id: 1, name: "State 1", country: mockCountry };
    
    // Create proper District object that includes the required state property
    const mockDistrict: District = { id: 1, name: "District 1", state: mockState };
    
    // In a real app, you would fetch branches for the selected clinic from an API
    // This is a mock implementation
    const mockBranches: Branch[] = [
      { id: 1, name: "Main Branch", code: "MB", location: "Central", active: true, state: mockState, district: mockDistrict, country: mockCountry, city: "City 1", mapUrl: "", pincode: 123456, image: "", latitude: 0, longitude: 0 },
      { id: 2, name: "Secondary Branch", code: "SB", location: "East", active: true, state: mockState, district: mockDistrict, country: mockCountry, city: "City 1", mapUrl: "", pincode: 123456, image: "", latitude: 0, longitude: 0 },
    ];
    
    setBranches(mockBranches);
    
    // If no branch is selected or the previously selected branch doesn't belong to this clinic,
    // select the first branch
    if (!selectedBranch && mockBranches.length > 0) {
      setSelectedBranch(mockBranches[0].id.toString());
      localStorage.setItem("selectedBranch", mockBranches[0].id.toString());
    }
  }, [selectedClinic]);

  const handleClinicChange = (value: string) => {
    setSelectedClinic(value);
    localStorage.setItem("selectedClinic", value);
    // Reset branch selection when clinic changes
    setSelectedBranch("");
    localStorage.removeItem("selectedBranch");
  };

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);
    localStorage.setItem("selectedBranch", value);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        <Building className="mr-2 h-4 w-4 text-muted-foreground" />
        <Select value={selectedClinic} onValueChange={handleClinicChange}>
          <SelectTrigger className="w-[140px] md:w-[180px] text-xs md:text-sm h-8">
            <SelectValue placeholder="Select Clinic" />
          </SelectTrigger>
          <SelectContent>
            {mockClinics.map(clinic => (
              <SelectItem key={clinic.uid} value={clinic.uid}>
                {clinic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center">
        <Store className="mr-2 h-4 w-4 text-muted-foreground" />
        <Select value={selectedBranch} onValueChange={handleBranchChange} disabled={!selectedClinic || branches.length === 0}>
          <SelectTrigger className="w-[140px] md:w-[180px] text-xs md:text-sm h-8">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.map(branch => (
              <SelectItem key={branch.id} value={branch.id.toString()}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ClinicBranchFilter;
