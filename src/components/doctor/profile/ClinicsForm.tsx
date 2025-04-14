
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader, MapPin, Plus, Building, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clinic } from "@/models/clinic/Clinic";
import { Doctor } from "@/models/doctor/Doctor";
import ClinicBranchFilter from "@/admin/components/ClinicBranchFilter";

export const ClinicsForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState<Partial<Doctor>>({});
  const [availableClinics, setAvailableClinics] = useState<Clinic[]>([
    {
      id: "1",
      name: "Main Medical Center",
      email: "info@mainmedical.com",
      contact: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      branchList: [],
      days: "Monday-Friday",
      timings: "9:00 AM - 5:00 PM",
    },
    {
      id: "2",
      name: "Downtown Health Clinic",
      email: "contact@downtownhealth.com",
      contact: "+1 (555) 987-6543",
      address: "456 Park Ave, New York, NY 10002",
      branchList: [],
      days: "Monday-Saturday",
      timings: "8:00 AM - 8:00 PM",
    },
    {
      id: "3",
      name: "Uptown Medical",
      email: "info@uptownmedical.com",
      contact: "+1 (555) 321-7654",
      address: "789 Broadway, New York, NY 10003",
      branchList: [],
      days: "Monday-Sunday",
      timings: "24 hours",
    },
  ]);
  
  const [selectedClinics, setSelectedClinics] = useState<string[]>(["1", "3"]);

  const toggleClinicSelection = (clinicId: string) => {
    setSelectedClinics(prev => 
      prev.includes(clinicId)
        ? prev.filter(id => id !== clinicId)
        : [...prev, clinicId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Clinics Updated",
        description: "Your associated clinics have been updated successfully."
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Associated Clinics</CardTitle>
          <CardDescription>Select the clinics where you practice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="mb-4">
            <ClinicBranchFilter />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {availableClinics.map((clinic) => (
              <div key={clinic.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <Checkbox 
                  id={`clinic-${clinic.id}`} 
                  checked={selectedClinics.includes(clinic.id)}
                  onCheckedChange={() => toggleClinicSelection(clinic.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {clinic.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Label htmlFor={`clinic-${clinic.id}`} className="font-medium text-base">
                        {clinic.name}
                      </Label>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{clinic.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4 ml-1 text-sm">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Days:</span>
                      <span>{clinic.days}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Hours:</span>
                      <span>{clinic.timings}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Contact:</span>
                      <span>{clinic.contact}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Email:</span>
                      <span>{clinic.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 h-16 border-dashed"
          >
            <Plus className="h-4 w-4" />
            Add New Clinic
          </Button>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
