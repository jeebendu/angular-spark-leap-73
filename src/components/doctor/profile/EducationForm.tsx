
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GraduationCap, CalendarClock, Loader } from "lucide-react";
import { Education } from "@/models/doctor/Doctor";

export const EducationForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [educations, setEducations] = useState<Education[]>([
    {
      id: 1,
      name: "MD in Cardiology",
      degree: "MD in Cardiology",
      institute: "Harvard Medical School",
      year: "2010-2014",
    },
    {
      id: 2,
      name: "MBBS",
      degree: "MBBS",
      institute: "Johns Hopkins University",
      year: "2005-2009",
    },
  ]);

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: Date.now(),
      name: "",
      degree: "",
      institute: "",
      year: "",
    };
    setEducations([...educations, newEducation]);
  };

  const handleRemoveEducation = (id: number) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const handleInputChange = (id: number, name: string, value: string) => {
    setEducations(educations.map(edu => {
      if (edu.id === id) {
        // If the degree field is being updated, also update the name field with the same value
        if (name === "degree") {
          return { ...edu, [name]: value, name: value };
        }
        return { ...edu, [name]: value };
      }
      return edu;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Education Updated",
        description: "Your educational information has been updated successfully."
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Education</CardTitle>
            <CardDescription>Add your academic qualifications</CardDescription>
          </div>
          <Button 
            type="button" 
            onClick={handleAddEducation} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {educations.map((education, index) => (
            <div key={education.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">Education {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveEducation(education.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                  <div className="relative">
                    <Input
                      id={`degree-${education.id}`}
                      value={education.degree}
                      onChange={(e) => handleInputChange(education.id, "degree", e.target.value)}
                      className="pl-10"
                    />
                    <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`institute-${education.id}`}>Institute</Label>
                  <Input
                    id={`institute-${education.id}`}
                    value={education.institute}
                    onChange={(e) => handleInputChange(education.id, "institute", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`year-${education.id}`}>Year</Label>
                  <div className="relative">
                    <Input
                      id={`year-${education.id}`}
                      value={education.year}
                      onChange={(e) => handleInputChange(education.id, "year", e.target.value)}
                      placeholder="e.g., 2010-2014"
                      className="pl-10"
                    />
                    <CalendarClock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {educations.length === 0 && (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <p className="text-gray-500">No education added yet. Click the "Add Education" button to add your academic qualifications.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
