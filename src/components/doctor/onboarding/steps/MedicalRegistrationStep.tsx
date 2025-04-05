
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

interface MedicalRegistrationData {
  registrationNumber: string;
  registrationCouncil: string;
  registrationYear: string;
}

interface MedicalRegistrationStepProps {
  data: MedicalRegistrationData;
  onUpdate: (data: Partial<MedicalRegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MedicalRegistrationStep: React.FC<MedicalRegistrationStepProps> = ({ 
  data, 
  onUpdate, 
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Partial<MedicalRegistrationData>>({});

  const validateForm = () => {
    const newErrors: Partial<MedicalRegistrationData> = {};
    
    if (!data.registrationNumber) newErrors.registrationNumber = "Registration number is required";
    if (!data.registrationCouncil) newErrors.registrationCouncil = "Registration council is required";
    if (!data.registrationYear) newErrors.registrationYear = "Registration year is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Medical Registration</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            id="registrationNumber"
            value={data.registrationNumber}
            onChange={(e) => onUpdate({ registrationNumber: e.target.value })}
            placeholder="Type registration number"
          />
          {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>}
        </div>

        <div>
          <Label htmlFor="registrationCouncil">Registration Council</Label>
          <Select 
            value={data.registrationCouncil} 
            onValueChange={(value) => onUpdate({ registrationCouncil: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type & select registration council" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mci">Medical Council of India (MCI)</SelectItem>
              <SelectItem value="dci">Dental Council of India (DCI)</SelectItem>
              <SelectItem value="nmc">National Medical Commission (NMC)</SelectItem>
              <SelectItem value="state-karnataka">Karnataka Medical Council</SelectItem>
              <SelectItem value="state-delhi">Delhi Medical Council</SelectItem>
            </SelectContent>
          </Select>
          {errors.registrationCouncil && <p className="text-red-500 text-sm mt-1">{errors.registrationCouncil}</p>}
        </div>

        <div>
          <Label htmlFor="registrationYear">Registration Year</Label>
          <Select 
            value={data.registrationYear} 
            onValueChange={(value) => onUpdate({ registrationYear: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type registration year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.registrationYear && <p className="text-red-500 text-sm mt-1">{errors.registrationYear}</p>}
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
