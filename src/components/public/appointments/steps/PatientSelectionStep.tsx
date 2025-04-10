import React, { useEffect, useState } from "react";
import { Users, Plus, X, UserCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewPatientRelation } from "@/services/appointmentService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Appointment } from "@/models/appointment/Appointment";
import { FamilyMember } from "@/models/patient/Patient";

interface PatientSelectionStepProps {
  appointmentObj: Appointment;
  familyMembers: FamilyMember[];
  reloadFamilyMember(): void;
  handleMemberSelection(member: FamilyMember | null): void;
}

export function PatientSelectionStep({ 
  appointmentObj,
  familyMembers,
  reloadFamilyMember,
  handleMemberSelection
}: PatientSelectionStepProps) {
  const [isAddingMember, setIsAddingMember] = useState(false);
  
  const [familymember, setFamilymember] = useState({
    name: "",
    relationship: "",
    age: "",
    phone: "",
    gender: "",
    patient: null
  });

  useEffect(() => {
    setFamilymember((prev) => ({...prev, patient: appointmentObj?.patient}));
  }, []);
  
  const { toast } = useToast();

  const handleAddFamilyMember = async () => {
    const data = await createNewPatientRelation(familymember);
    
    if (data.status) {
      toast({
        title: "Family member added",
        description: `${familymember.name} (${familymember.relationship}) has been added to your family members.`
      });
      
      reloadFamilyMember();
      setIsAddingMember(false);
      setFamilymember({ name: "", relationship: "", age: "", phone: "", gender: "", patient: null });
    } else {
      toast({
        title: "Something went wrong",
        description: `Some error during add family member`
      });
    }
 
    setIsAddingMember(false);
    setFamilymember({ name: "", relationship: "", age: "", phone: "", gender: "", patient: null });
  };

  const familyMemberInputChange = (e: any) => {
    setFamilymember({ ...familymember, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <RadioGroup
        value={appointmentObj?.familyMember?.id || "self"}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {/* Add "Myself" as the default option */}
        <div
          key="self"
          className={`border rounded-lg p-3 transition-colors flex items-center cursor-pointer ${
            !appointmentObj?.familyMember?.id ? "border-primary bg-slate-50" : "border-gray-200"
          }`}
          onClick={() =>
            handleMemberSelection(null)
          }
        >
          <RadioGroupItem
            value="self"
            id="member-self"
            className="mr-3"
            checked={!appointmentObj?.familyMember?.id}
          />
          <Label htmlFor="member-self" className="cursor-pointer flex-1">
            <div className="flex items-center">
              <UserCircle className="h-8 w-8 mr-2 text-gray-400" />
              <div>
                <div className="font-medium">Myself</div>
                <div className="text-xs text-gray-500">Primary Account</div>
              </div>
            </div>
          </Label>
        </div>

        {/* Map through family members */}
        {familyMembers.map((member) => (
          <div
            key={member.id}
            className={`border rounded-lg p-3 transition-colors flex items-center cursor-pointer ${
              appointmentObj?.familyMember?.id === member.id ? "border-primary bg-slate-50" : "border-gray-200"
            }`}
            onClick={() => handleMemberSelection(member)}
          >
            <RadioGroupItem
              value={member.id}
              id={`member-${member.id}`}
              className="mr-3"
              checked={appointmentObj?.familyMember?.id === member.id}
            />
            <Label htmlFor={`member-${member.id}`} className="cursor-pointer flex-1">
              <div className="flex items-center">
                <UserCircle className="h-8 w-8 mr-2 text-gray-400" />
                <div>
                  <div className="font-medium">{member.name || `${member.firstname} ${member.lastname}`}</div>
                  <div className="text-xs text-gray-500">{member.relationship}</div>
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full border-dashed flex items-center justify-center h-12"
          onClick={() => setIsAddingMember(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a new family member
        </Button>
      </div>

      <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={familymember.name}
                onChange={(e) => familyMemberInputChange(e)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship" className="text-right">
                Age
              </Label>
              <Input
                id="age"
                name="age"
                value={familymember.age}
                onChange={(e) => familyMemberInputChange(e)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship" className="text-right">
                Phone
              </Label>
              <Input
               id="phone"
               name="phone"
               value={familymember.phone}
               onChange={(e) => familyMemberInputChange(e)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">Gender</Label>
              <div className="flex items-center gap-4">
                <Label htmlFor="male">Male</Label>
                <Input id="male" type="radio" style={{ height: "20px" }} value="Male" checked={familymember?.gender == "Male"} name="gender" onChange={(e) => familyMemberInputChange(e)} />
                <Label htmlFor="female">Female</Label>
                <Input id="female" style={{ height: "20px" }} type="radio" value="Female" checked={familymember?.gender == "Female"} name="gender" onChange={(e) => familyMemberInputChange(e)} />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship" className="text-right">
                Relationship
              </Label>
              <Input
                id="relationship"
                name="relationship"
                value={familymember.relationship}
                onChange={(e) => familyMemberInputChange(e)}
                className="col-span-3"
                placeholder="e.g. Spouse, Child, Parent"
              />
            </div>

          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingMember(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFamilyMember}>
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
