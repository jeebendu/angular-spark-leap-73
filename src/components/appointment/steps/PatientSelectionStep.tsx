
import React, { useEffect, useState } from "react";
import { Users, Plus} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewPatientRelation } from "@/services/UserSeviceHandler";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Appointments, FamilyMember } from "@/components/BookAppointmentModal";






interface PatientSelectionStepProps {
  appointmentObj: Appointments;
  // setSelectedMember: (memberId: string) => void;
  familyMembers: FamilyMember[];
  reloadFamilyMember();
  handleMemberSelection(member: FamilyMember): void;
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
    patient:null
  });

  useEffect(() => {
    setFamilymember((prev)=>({...prev,patient:appointmentObj?.patient}));
  },[]);
  const { toast } = useToast();







  const handleAddFamilyMember = async () => {

    const data = await createNewPatientRelation(familymember)
    if (data.status) {

      toast({
        title: "Family member added",
        description: `${familymember.name} (${familymember.relationship}) has been added to your family members.`
      });
      reloadFamilyMember();
      setIsAddingMember(false);
      setFamilymember({ name: "", relationship: "", age: "", phone: "", gender: "",patient:null });


    } else {
      toast({
        title: "Something went wrog",
        description: `Some error during add family member`
      });
    }
 
    setIsAddingMember(false);
    setFamilymember({ name: "", relationship: "", age: "", phone: "", gender: "",patient:null });

  };

  const familyMemberInputChange = (e: any) => {
    setFamilymember({ ...familymember, [e.target.name]: e.target.value })
  }


const familyMemberHandler = (member: FamilyMember) => {
handleMemberSelection(member);
}

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Patient Details
        </h3>

        <Label className="block mb-4">Who is this appointment for?</Label>

        <RadioGroup
          value={appointmentObj?.familyMember?.id || "self"} 
          className="space-y-3"
        >
          <div className="border rounded-lg p-4 transition-colors flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50" onClick={() => familyMemberHandler(new FamilyMember())}>
            <RadioGroupItem value="self" id="self" />
            <Label htmlFor="self" className="cursor-pointer">Myself</Label>
          </div>
           
          {familyMembers.map((member) => (
            <div key={member.id} className=" border rounded-lg p-4 transition-colors flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50" onClick={() => familyMemberHandler(member)} >
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
          <div className="grid  gap-4 py-6">
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
              <Label htmlFor="age" className="text-right">
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
              <Label htmlFor="phone" className="text-right">
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
