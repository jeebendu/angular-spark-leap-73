
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hello Dr.! Let's build your dedicated profile.</h1>
        <h2 className="text-lg font-medium mt-4 mb-2">Section A: Profile details</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <div className="flex border rounded-md overflow-hidden">
            <div className="bg-gray-50 p-2 border-r text-gray-500 flex items-center">
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
            <SelectTrigger>
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
            <SelectTrigger>
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
      
      <div className="pt-4">
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 font-medium"
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
      
      <div className="text-center text-sm text-blue-500">
        <p>If you are not a doctor and owns an establishment <a href="#" className="underline">Click here</a></p>
      </div>
    </div>
  );
};
