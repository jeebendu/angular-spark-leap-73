
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

interface EstablishmentData {
  name: string;
  city: string;
  locality: string;
}

interface EstablishmentStepProps {
  data: EstablishmentData;
  onUpdate: (data: Partial<EstablishmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const EstablishmentStep: React.FC<EstablishmentStepProps> = ({ 
  data, 
  onUpdate, 
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Partial<EstablishmentData>>({});

  const validateForm = () => {
    const newErrors: Partial<EstablishmentData> = {};
    
    if (!data.name) newErrors.name = "Establishment name is required";
    if (!data.city) newErrors.city = "City is required";
    if (!data.locality) newErrors.locality = "Locality is required";
    
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
      <h1 className="text-2xl font-bold">Establishment basic details</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Establishment name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Type establishment name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Select 
            value={data.city} 
            onValueChange={(value) => onUpdate({ city: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type & select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <Label htmlFor="locality">Locality</Label>
          <Select 
            value={data.locality} 
            onValueChange={(value) => onUpdate({ locality: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select locality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indiranagar">Indiranagar</SelectItem>
              <SelectItem value="koramangala">Koramangala</SelectItem>
              <SelectItem value="jayanagar">Jayanagar</SelectItem>
              <SelectItem value="whitefield">Whitefield</SelectItem>
              <SelectItem value="electronic-city">Electronic City</SelectItem>
            </SelectContent>
          </Select>
          {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality}</p>}
        </div>
      </div>

      <div className="border-t pt-4 mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 px-8"
          onClick={handleSubmit}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
