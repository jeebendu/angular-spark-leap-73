
import React, { useState } from "react";
import { Users, Plus, X } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

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
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRelationship, setNewMemberRelationship] = useState("");
  const { toast } = useToast();

  const handleAddFamilyMember = () => {
    // In a real app, this would make an API call to save the new family member
    // For now, just show a toast that we'd add the member
    if (newMemberName && newMemberRelationship) {
      toast({
        title: "Family member added",
        description: `${newMemberName} (${newMemberRelationship}) has been added to your family members.`
      });
      
      setIsAddingMember(false);
      setNewMemberName("");
      setNewMemberRelationship("");
    } else {
      toast({
        title: "Please fill all fields",
        description: "Both name and relationship are required.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Patient Details
        </h3>
        
        <Label className="block mb-4">Who is this appointment for?</Label>
        
        <RadioGroup 
          value={selectedMember} 
          onValueChange={setSelectedMember}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
            <RadioGroupItem value="self" id="self" />
            <Label htmlFor="self" className="cursor-pointer">Myself</Label>
          </div>
          
          {familyMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
              <RadioGroupItem value={member.id} id={`member-${member.id}`} />
              <Label htmlFor={`member-${member.id}`} className="cursor-pointer">
                {member.name} ({member.relationship})
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full border-dashed flex items-center justify-center"
            onClick={() => setIsAddingMember(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add a new family member
          </Button>
        </div>
      </div>

      <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
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
