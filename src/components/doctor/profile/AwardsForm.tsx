
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Award, CalendarDays, Loader } from "lucide-react";

type Award = {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
};

export const AwardsForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [awards, setAwards] = useState<Award[]>([
    {
      id: "1",
      title: "Excellence in Cardiology",
      organization: "American Heart Association",
      year: "2019",
      description: "Awarded for pioneering research in preventive cardiology.",
    },
    {
      id: "2",
      title: "Best Medical Researcher",
      organization: "National Medical Research Council",
      year: "2017",
      description: "Recognized for innovative approach to cardiac treatment methodologies.",
    },
  ]);

  const handleAddAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      title: "",
      organization: "",
      year: "",
      description: "",
    };
    setAwards([...awards, newAward]);
  };

  const handleRemoveAward = (id: string) => {
    setAwards(awards.filter(award => award.id !== id));
  };

  const handleInputChange = (id: string, name: string, value: string) => {
    setAwards(awards.map(award => {
      if (award.id === id) {
        return { ...award, [name]: value };
      }
      return award;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Awards Updated",
        description: "Your awards and recognitions have been updated successfully."
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Awards & Recognitions</CardTitle>
            <CardDescription>Add your professional awards and recognitions</CardDescription>
          </div>
          <Button 
            type="button" 
            onClick={handleAddAward} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Award
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {awards.map((award, index) => (
            <div key={award.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">Award {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveAward(award.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${award.id}`}>Award Title</Label>
                  <div className="relative">
                    <Input
                      id={`title-${award.id}`}
                      value={award.title}
                      onChange={(e) => handleInputChange(award.id, "title", e.target.value)}
                      className="pl-10"
                    />
                    <Award className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`organization-${award.id}`}>Awarding Organization</Label>
                  <Input
                    id={`organization-${award.id}`}
                    value={award.organization}
                    onChange={(e) => handleInputChange(award.id, "organization", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`year-${award.id}`}>Year</Label>
                  <div className="relative">
                    <Input
                      id={`year-${award.id}`}
                      value={award.year}
                      onChange={(e) => handleInputChange(award.id, "year", e.target.value)}
                      placeholder="e.g., 2019"
                      className="pl-10"
                    />
                    <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor={`desc-${award.id}`}>Description</Label>
                <Textarea
                  id={`desc-${award.id}`}
                  value={award.description}
                  onChange={(e) => handleInputChange(award.id, "description", e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          ))}
          
          {awards.length === 0 && (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <p className="text-gray-500">No awards added yet. Click the "Add Award" button to add your professional recognitions.</p>
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
