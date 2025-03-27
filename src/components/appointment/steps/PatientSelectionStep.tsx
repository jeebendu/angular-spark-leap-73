
import { Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
            className="w-full border-dashed"
          >
            + Add a new family member
          </Button>
        </div>
      </div>
    </div>
  );
}
