
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft } from "lucide-react";

interface PracticeData {
  type: string;
}

interface PracticeStepProps {
  data: PracticeData;
  onUpdate: (data: Partial<PracticeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PracticeStep: React.FC<PracticeStepProps> = ({ 
  data, 
  onUpdate, 
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Partial<PracticeData>>({});

  const validateForm = () => {
    const newErrors: Partial<PracticeData> = {};
    
    if (!data.type) newErrors.type = "Please select one option";
    
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
        <h1 className="text-2xl font-bold">Connect a practice</h1>
        <p className="text-gray-600 mt-2">Please select any one of the following:</p>
      </div>

      <div className="space-y-4">
        <RadioGroup 
          value={data.type} 
          onValueChange={(value) => onUpdate({ type: value })}
        >
          <div className="border rounded-lg p-4 hover:border-primary transition-colors">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="own" id="own" />
              <Label htmlFor="own" className="font-medium cursor-pointer">I own a establishment</Label>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:border-primary transition-colors">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="visit" id="visit" />
              <Label htmlFor="visit" className="font-medium cursor-pointer">I visit a establishment</Label>
            </div>
          </div>
        </RadioGroup>
        {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
      </div>

      <div className="text-sm text-gray-500 mt-2">
        Note: You can add multiple establishments one by one.
      </div>

      <div className="border-t pt-4 mt-4 flex justify-between">
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
