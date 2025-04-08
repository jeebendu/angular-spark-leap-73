
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FamilyMember } from "@/models/patient/Patient";
import { Plus, UserPlus, Edit2, Trash2, UserCircle } from "lucide-react";
import { fetchFamilyMembers, deleteFamilyMember } from "@/services/PatientService";
import { toast } from "@/hooks/use-toast";
import { FamilyMemberDialog } from "@/components/public/family/FamilyMemberDialog";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function FamilyMembers() {
  const { t } = useTranslation();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadFamilyMembers();
  }, []);

  const loadFamilyMembers = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would use actual data from the API
      // For now, we'll use mock data
      const mockData = [
        new FamilyMember(),
        new FamilyMember()
      ];

      // Configure the first mock member
      mockData[0].id = "1";
      mockData[0].firstname = "Sarah";
      mockData[0].lastname = "Johnson";
      mockData[0].dob = new Date("1990-05-15");
      mockData[0].gender = "Female";
      mockData[0].relationship = "Spouse";
      mockData[0].phoneNumber = "+1234567890";
      mockData[0].profileImage = "";

      // Configure the second mock member
      mockData[1].id = "2";
      mockData[1].firstname = "David";
      mockData[1].lastname = "Johnson";
      mockData[1].dob = new Date("2015-10-23");
      mockData[1].gender = "Male";
      mockData[1].relationship = "Child";
      mockData[1].phoneNumber = "";
      mockData[1].profileImage = "";
      
      // In real implementation: const response = await fetchFamilyMembers();
      // setFamilyMembers(response.data);
      setFamilyMembers(mockData);
    } catch (error) {
      console.error("Failed to load family members", error);
      toast({
        title: "Error",
        description: "Failed to load family members. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEdit = (member: FamilyMember | null) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMemberToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;
    
    try {
      // In a real implementation: await deleteFamilyMember(memberToDelete);
      setFamilyMembers(prev => prev.filter(member => member.id !== memberToDelete));
      toast({
        title: "Success",
        description: "Family member removed successfully",
      });
    } catch (error) {
      console.error("Failed to delete family member", error);
      toast({
        title: "Error",
        description: "Failed to delete family member. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  const onSave = (member: FamilyMember) => {
    if (member.id) {
      // Update existing member
      setFamilyMembers(prev => 
        prev.map(m => m.id === member.id ? member : m)
      );
    } else {
      // Add new member with generated ID
      const newMember = new FamilyMember();
      Object.assign(newMember, {
        ...member,
        id: Date.now().toString(),
      });
      setFamilyMembers(prev => [...prev, newMember]);
    }
    setIsDialogOpen(false);
  };

  const getInitials = (firstname: string, lastname: string) => {
    return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  };

  const calculateAge = (dob: Date) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#333]">{t('family.title', 'Family Members')}</h1>
            <Button onClick={() => handleAddEdit(null)} className="gap-2">
              <UserPlus className="h-4 w-4" />
              {t('family.addMember', 'Add Member')}
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>{t('common.loading', 'Loading...')}</p>
            </div>
          ) : familyMembers.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <UserPlus className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('family.noMembers', 'No Family Members')}</h3>
                <p className="text-gray-500 text-center mb-6">
                  {t('family.addMemberText', 'Add your family members to book appointments on their behalf')}
                </p>
                <Button onClick={() => handleAddEdit(null)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  {t('family.addFirst', 'Add Your First Family Member')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {familyMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <div className="bg-orange-50 p-4 flex items-center">
                        <Avatar className="h-16 w-16 mr-4">
                          {member.profileImage ? (
                            <AvatarImage src={member.profileImage} alt={`${member.firstname} ${member.lastname}`} />
                          ) : null}
                          <AvatarFallback className="bg-primary text-white text-lg">
                            {getInitials(member.firstname, member.lastname)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-lg">{`${member.firstname} ${member.lastname}`}</h3>
                          <p className="text-gray-500 text-sm">{member.relationship}</p>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Age</p>
                            <p>{calculateAge(member.dob)} years</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Gender</p>
                            <p>{member.gender}</p>
                          </div>
                          {member.phoneNumber && (
                            <div className="col-span-2">
                              <p className="text-gray-500">Phone</p>
                              <p>{member.phoneNumber}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-2 border-t">
                          <Button variant="outline" size="sm" onClick={() => handleAddEdit(member)} className="gap-1">
                            <Edit2 className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(member.id)} className="gap-1 text-destructive hover:text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Family Member Add/Edit Dialog */}
      <FamilyMemberDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        member={selectedMember}
        onSave={onSave}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this family member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
