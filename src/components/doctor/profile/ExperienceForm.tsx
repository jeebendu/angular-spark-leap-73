
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Building, CalendarRange, Loader } from "lucide-react";

type Experience = {
  id: string;
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
};

export const ExperienceForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      organization: "Memorial Hospital",
      position: "Senior Cardiologist",
      startDate: "2018-03-01",
      endDate: "",
      description: "Led a team of 5 cardiologists and performed over 500 successful heart surgeries.",
      current: true,
    },
    {
      id: "2",
      organization: "City Medical Center",
      position: "Cardiologist",
      startDate: "2015-06-01",
      endDate: "2018-02-28",
      description: "Specialized in diagnosing and treating complex cardiovascular conditions.",
      current: false,
    },
  ]);

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      organization: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    };
    setExperiences([...experiences, newExperience]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleInputChange = (id: string, name: string, value: string | boolean) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === id) {
        return { ...exp, [name]: value };
      }
      return exp;
    }));
  };

  const handleCurrentChange = (id: string, checked: boolean) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === id) {
        return { 
          ...exp, 
          current: checked,
          endDate: checked ? "" : exp.endDate 
        };
      }
      return exp;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Experience Updated",
        description: "Your professional experience has been updated successfully."
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Professional Experience</CardTitle>
            <CardDescription>Add your previous and current work experiences</CardDescription>
          </div>
          <Button 
            type="button" 
            onClick={handleAddExperience} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">Experience {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveExperience(experience.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`org-${experience.id}`}>Organization</Label>
                  <div className="relative">
                    <Input
                      id={`org-${experience.id}`}
                      value={experience.organization}
                      onChange={(e) => handleInputChange(experience.id, "organization", e.target.value)}
                      className="pl-10"
                    />
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`position-${experience.id}`}>Position</Label>
                  <Input
                    id={`position-${experience.id}`}
                    value={experience.position}
                    onChange={(e) => handleInputChange(experience.id, "position", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`start-${experience.id}`}>Start Date</Label>
                  <div className="relative">
                    <Input
                      id={`start-${experience.id}`}
                      type="date"
                      value={experience.startDate}
                      onChange={(e) => handleInputChange(experience.id, "startDate", e.target.value)}
                      className="pl-10"
                    />
                    <CalendarRange className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={`end-${experience.id}`}>End Date</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`current-${experience.id}`}
                        checked={experience.current}
                        onChange={(e) => handleCurrentChange(experience.id, e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`current-${experience.id}`} className="text-sm">
                        Current
                      </Label>
                    </div>
                  </div>
                  <Input
                    id={`end-${experience.id}`}
                    type="date"
                    value={experience.endDate}
                    onChange={(e) => handleInputChange(experience.id, "endDate", e.target.value)}
                    disabled={experience.current}
                  />
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor={`desc-${experience.id}`}>Description</Label>
                <Textarea
                  id={`desc-${experience.id}`}
                  value={experience.description}
                  onChange={(e) => handleInputChange(experience.id, "description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
          
          {experiences.length === 0 && (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <p className="text-gray-500">No experience added yet. Click the "Add Experience" button to add your work history.</p>
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
