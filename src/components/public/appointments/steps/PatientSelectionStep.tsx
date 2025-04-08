
import React, { useState } from "react";
import { Users, Plus, X, UserCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FamilyMember } from "@/models/patient/Patient";

interface PatientSelectionStepProps {
  selectedMember: string;
  setSelectedMember: (memberId: string) => void;
  familyMembers: FamilyMember[];
}

export function PatientSelectionStep({ 
  selectedMember, 
  setSelectedMember, 
  familyMembers 
}: PatientSelectionStepProps) {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberFirstname, setNewMemberFirstname] = useState("");
  const [newMemberLastname, setNewMemberLastname] = useState("");
  const [newMemberRelationship, setNewMemberRelationship] = useState("");
  const [formError, setFormError] = useState("");
  const { toast } = useToast();

  const handleAddFamilyMember = () => {
    // Clear previous errors
    setFormError("");
    
    if (newMemberFirstname && newMemberRelationship) {
      toast({
        title: "Family member added",
        description: `${newMemberFirstname} ${newMemberLastname} (${newMemberRelationship}) has been added to your family members.`
      });
      
      setIsAddingMember(false);
      setNewMemberFirstname("");
      setNewMemberLastname("");
      setNewMemberRelationship("");
    } else {
      setFormError("Both name and relationship are required.");
    }
  };

  // Prepare family members to display, including self
  const selfMember = new FamilyMember();
  selfMember.id = "self";
  selfMember.firstname = "Myself";
  selfMember.lastname = "";
  selfMember.relationship = "Primary Account";
  selfMember.dob = new Date();
  selfMember.gender = "";
  selfMember.phoneNumber = "";
  
  const allPatients = [
    selfMember,
    ...familyMembers
  ];

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedMember} onValueChange={setSelectedMember} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {allPatients.map((member) => (
          <div 
            key={member.id} 
            className={`border rounded-lg p-3 transition-colors flex items-center cursor-pointer ${
              selectedMember === member.id ? "border-primary bg-slate-50" : "border-gray-200"
            }`}
            onClick={() => setSelectedMember(member.id)}
          >
            <RadioGroupItem 
              value={member.id} 
              id={`member-${member.id}`} 
              className="mr-3" 
              checked={selectedMember === member.id}
            />
            <Label htmlFor={`member-${member.id}`} className="cursor-pointer flex-1">
              <div className="flex items-center">
                <UserCircle className="h-8 w-8 mr-2 text-gray-400" />
                <div>
                  <div className="font-medium">{`${member.firstname} ${member.lastname}`.trim()}</div>
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
          
          {formError && (
            <div className="p-3 rounded bg-red-50 text-red-600 text-sm">
              {formError}
            </div>
          )}
          
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                First Name
              </Label>
              <Input
                id="firstname"
                value={newMemberFirstname}
                onChange={(e) => setNewMemberFirstname(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastname"
                value={newMemberLastname}
                onChange={(e) => setNewMemberLastname(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship" className="text-right">
                Relationship
              </Label>
              <Input
                id="relationship"
                value={newMemberRelationship}
                onChange={(e) => setNewMemberRelationship(e.target.value)}
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
