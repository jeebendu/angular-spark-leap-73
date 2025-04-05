
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRound } from "lucide-react";

interface ProfileData {
  name: string;
  specialization: string;
  gender: string;
  city: string;
}

interface ProfileStepProps {
  data: ProfileData;
  onUpdate: (data: Partial<ProfileData>) => void;
  onNext: () => void;
}

export const ProfileStep: React.FC<ProfileStepProps> = ({ 
  data, 
  onUpdate, 
  onNext 
}) => {
  const [errors, setErrors] = useState<Partial<ProfileData>>({});

  const validateForm = () => {
    const newErrors: Partial<ProfileData> = {};
    
    if (!data.name) newErrors.name = "Name is required";
    if (!data.specialization) newErrors.specialization = "Specialization is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.city) newErrors.city = "City is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <UserRound size={28} className="text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold">Hello Doctor! Let's build your profile</h1>
        <p className="text-gray-600 mt-2">Enter your basic information to get started</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <div className="flex border rounded-md overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-primary/30 focus-within:border-primary transition-all">
            <div className="bg-gray-50 p-2 border-r text-gray-500 flex items-center text-sm">
              Dr./Mr./Ms.
            </div>
            <Input
              id="name"
              className="border-none flex-1"
              placeholder="Please enter your Name"
              value={data.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="specialization">Specialization</Label>
          <Select 
            value={data.specialization} 
            onValueChange={(value) => onUpdate({ specialization: value })}
          >
            <SelectTrigger className="focus:ring-primary/30">
              <SelectValue placeholder="Select Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="psychiatry">Psychiatry</SelectItem>
            </SelectContent>
          </Select>
          {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
        </div>

        <div>
          <Label>Gender</Label>
          <RadioGroup 
            value={data.gender} 
            onValueChange={(value) => onUpdate({ gender: value })}
            className="flex gap-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Select 
            value={data.city} 
            onValueChange={(value) => onUpdate({ city: value })}
          >
            <SelectTrigger className="focus:ring-primary/30">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="kolkata">Kolkata</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
      </div>
      
      <div className="pt-6">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 font-medium py-6"
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
      
      <div className="text-center text-sm text-primary">
        <p>If you are not a doctor and own an establishment <a href="#" className="underline">Click here</a></p>
      </div>
    </div>
  );
};
