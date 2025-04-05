
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

interface EducationData {
  degree: string;
  college: string;
  completionYear: string;
  yearsOfExperience: string;
}

interface EducationStepProps {
  data: EducationData;
  onUpdate: (data: Partial<EducationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const EducationStep: React.FC<EducationStepProps> = ({ 
  data, 
  onUpdate, 
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Partial<EducationData>>({});

  const validateForm = () => {
    const newErrors: Partial<EducationData> = {};
    
    if (!data.degree) newErrors.degree = "Degree is required";
    if (!data.college) newErrors.college = "College/Institute is required";
    if (!data.completionYear) newErrors.completionYear = "Year of completion is required";
    if (!data.yearsOfExperience) newErrors.yearsOfExperience = "Years of experience is required";
    
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
      <div>
        <h1 className="text-2xl font-bold">Education Qualification</h1>
        <p className="text-gray-600 mt-1">Please enter your base level qualification.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="degree">Degree</Label>
          <Select 
            value={data.degree} 
            onValueChange={(value) => onUpdate({ degree: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mbbs">MBBS</SelectItem>
              <SelectItem value="md">MD</SelectItem>
              <SelectItem value="ms">MS</SelectItem>
              <SelectItem value="bds">BDS</SelectItem>
              <SelectItem value="mds">MDS</SelectItem>
              <SelectItem value="msc">MSc - Nutrition and Dietetics</SelectItem>
            </SelectContent>
          </Select>
          {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
        </div>

        <div>
          <Label htmlFor="college">College/Institute</Label>
          <Select 
            value={data.college} 
            onValueChange={(value) => onUpdate({ college: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select College/Institute" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aiims">All India Institute of Medical Sciences</SelectItem>
              <SelectItem value="cmch">Christian Medical College, Vellore</SelectItem>
              <SelectItem value="jipmer">Jawaharlal Institute of Postgraduate Medical Education and Research</SelectItem>
              <SelectItem value="kashmir">MBBS (university of kashmir)</SelectItem>
            </SelectContent>
          </Select>
          {errors.college && <p className="text-red-500 text-sm mt-1">{errors.college}</p>}
        </div>

        <div>
          <Label htmlFor="completionYear">Year of completion</Label>
          <Select 
            value={data.completionYear} 
            onValueChange={(value) => onUpdate({ completionYear: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.completionYear && <p className="text-red-500 text-sm mt-1">{errors.completionYear}</p>}
        </div>

        <div>
          <Label htmlFor="yearsOfExperience">Year of experience</Label>
          <Input
            id="yearsOfExperience"
            value={data.yearsOfExperience}
            onChange={(e) => onUpdate({ yearsOfExperience: e.target.value })}
            type="number"
            min="0"
            placeholder="Enter years of experience"
          />
          {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        Note: You'll be able to add more qualifications later.
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
