
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X } from "lucide-react";
import { FamilyMember } from "@/models/patient/Patient";

interface FamilyMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: FamilyMember | null;
  onSave: (member: FamilyMember) => void;
}

export function FamilyMemberDialog({ 
  open, 
  onOpenChange, 
  member, 
  onSave 
}: FamilyMemberDialogProps) {
  const [formData, setFormData] = useState<Partial<FamilyMember>>({
    id: null,
    name: "",
    age: null,
    gender: "Male",
    relationship: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (member) {
      setFormData({
        ...member
      });
      setImagePreview(member.profileImage || null);
    } else {
      resetForm();
    }
  }, [member, open]);

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      age: null,
      gender: "Male",
      relationship: "",
      phone: "",
    });
    setFormErrors({});
    setImagePreview(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when field is changed
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }));
    if (formErrors.age) {
      setFormErrors(prev => ({ ...prev, age: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload this to your server and get a URL back
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImagePreview(imageUrl);
        setFormData(prev => ({ ...prev, profileImage: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, profileImage: "" }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.age) {
      errors.age = "Age is required";
    }
    
    if (!formData.relationship?.trim()) {
      errors.relationship = "Relationship is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData as FamilyMember);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {member ? "Edit Family Member" : "Add Family Member"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                {imagePreview ? (
                  <AvatarImage src={imagePreview} />
                ) : null}
                <AvatarFallback className="bg-gray-200 text-gray-500 text-lg">
                  {formData.name ? 
                    `${formData.name.charAt(0)}`.toUpperCase() : 
                    "FM"}
                </AvatarFallback>
              </Avatar>
              
              <div className="mt-2 flex items-center justify-center gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => document.getElementById('profile-upload')?.click()}
                  className="text-xs"
                >
                  <Upload className="h-3 w-3 mr-1" />
                  Upload
                </Button>
                
                {imagePreview && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={removeImage}
                    className="text-xs text-destructive"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                )}
                
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input 
                id="name" 
                name="name" 
                value={String(formData.name) || ''} 
                onChange={handleChange} 
              />
              {formErrors.name && (
                <p className="text-sm text-destructive">{formErrors.name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input 
                id="age" 
                type="number" 
                name="age"
                value={formData.age || ''} 
                onChange={handleChange} 
              />
              {formErrors.age && (
                <p className="text-sm text-destructive">{formErrors.age}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Gender *</Label>
              <RadioGroup 
                value={String(formData.gender)} 
                onValueChange={handleRadioChange}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship *</Label>
            <Input 
              id="relationship" 
              name="relationship" 
              value={String(formData.relationship) || ''} 
              onChange={handleChange} 
              placeholder="e.g. Spouse, Child, Parent, Sibling"
            />
            {formErrors.relationship && (
              <p className="text-sm text-destructive">{formErrors.relationship}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={String(formData.phone) || ''} 
              onChange={handleChange} 
              placeholder="(Optional)"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
