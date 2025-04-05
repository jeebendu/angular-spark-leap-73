import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Star, X, HelpCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DoctorFiltersProps {
  selectedSpecialties: string[];
  selectedGenders: string[];
  selectedLanguages: string[];
  selectedExperience: string[];
  priceRange: [number, number];
  toggleSpecialty: (specialty: string) => void;
  toggleGender: (gender: string) => void;
  toggleLanguage: (language: string) => void;
  toggleExperience: (experience: string) => void;
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  applyFilters: () => void;
}

export const DoctorFilters = ({
  selectedSpecialties,
  selectedGenders,
  selectedLanguages,
  selectedExperience,
  priceRange,
  toggleSpecialty,
  toggleGender,
  toggleLanguage,
  toggleExperience,
  setPriceRange,
  applyFilters
}: DoctorFiltersProps) => {
  const specialties = [
    "All Specialties",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Internal Medicine",
    "Ophthalmology",
    "Dentistry",
    "Gynecology"
  ];

  const genders = ["Male", "Female"];
  const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"];
  const experienceRanges = ["0-5 years", "5-10 years", "10-15 years", "15+ years"];

  const getFilterHelp = (filterType: string) => {
    switch (filterType) {
      case 'specialty':
        return "Select specialties to find doctors with specific expertise";
      case 'gender':
        return "Filter doctors by gender preference";
      case 'experience':
        return "Find doctors with your preferred years of medical experience";
      case 'languages':
        return "Filter doctors who speak specific languages";
      case 'price':
        return "Set your budget range for consultation fees";
      case 'availability':
        return "Find doctors with appointments available soon";
      case 'rating':
        return "Filter by patient satisfaction ratings";
      default:
        return "Apply filters to refine your search";
    }
  };

  return (
    <Card className="sticky top-24 border-none card-shadow">
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-4 flex items-center justify-between">
          <span>Filters</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-64 text-xs">Apply filters to narrow down your search results</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Specialty</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">{getFilterHelp('specialty')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-xs ${selectedSpecialties.includes(specialty) ? 'bg-primary text-white' : 'bg-white'}`}
                  onClick={() => toggleSpecialty(specialty)}
                >
                  {specialty}
                  {selectedSpecialties.includes(specialty) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Gender</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">{getFilterHelp('gender')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-wrap gap-2">
              {genders.map((gender) => (
                <Button
                  key={gender}
                  variant={selectedGenders.includes(gender) ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-xs ${selectedGenders.includes(gender) ? 'bg-primary text-white' : 'bg-white'}`}
                  onClick={() => toggleGender(gender)}
                >
                  {gender}
                  {selectedGenders.includes(gender) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Experience</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">{getFilterHelp('experience')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-wrap gap-2">
              {experienceRanges.map((experience) => (
                <Button
                  key={experience}
                  variant={selectedExperience.includes(experience) ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-xs ${selectedExperience.includes(experience) ? 'bg-primary text-white' : 'bg-white'}`}
                  onClick={() => toggleExperience(experience)}
                >
                  {experience}
                  {selectedExperience.includes(experience) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Languages</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">{getFilterHelp('languages')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <Button
                  key={language}
                  variant={selectedLanguages.includes(language) ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-xs ${selectedLanguages.includes(language) ? 'bg-primary text-white' : 'bg-white'}`}
                  onClick={() => toggleLanguage(language)}
                >
                  {language}
                  {selectedLanguages.includes(language) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Price Range</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">{getFilterHelp('price')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="px-2">
              <Slider
                defaultValue={[500, 2000]}
                max={5000}
                step={100}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Availability</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">{getFilterHelp('availability')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Switch id="desktop-available-today" className="mr-2" />
                <label htmlFor="desktop-available-today" className="text-sm">
                  Available Today
                </label>
              </div>
              <div className="flex items-center">
                <Switch id="desktop-available-week" className="mr-2" />
                <label htmlFor="desktop-available-week" className="text-sm">
                  Available This Week
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Rating</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">{getFilterHelp('rating')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Switch id="desktop-rating-4-plus" className="mr-2" />
                <label htmlFor="desktop-rating-4-plus" className="text-sm flex items-center">
                  <span>4+</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                </label>
              </div>
              <div className="flex items-center">
                <Switch id="desktop-rating-3-plus" className="mr-2" />
                <label htmlFor="desktop-rating-3-plus" className="text-sm flex items-center">
                  <span>3+</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                </label>
              </div>
            </div>
          </div>
          
          <Button className="w-full sky-button" onClick={applyFilters}>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
};
