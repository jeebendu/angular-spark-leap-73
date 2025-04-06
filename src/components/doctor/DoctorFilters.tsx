
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, HelpCircle, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
    "Gynecology",
    "ENT Specialist",
    "Psychiatry",
    "Urology",
    "Gastroenterology",
    "Endocrinology",
    "Nephrology",
    "Oncology",
    "Pulmonology",
    "Rheumatology",
    "General Surgery"
  ];

  const genders = ["Male", "Female"];
  const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"];
  const experienceRanges = ["0-5 years", "5-10 years", "10-15 years", "15+ years"];
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const [specialtySearch, setSpecialtySearch] = useState("");

  const visibleSpecialties = specialties
    .filter(specialty => specialty.toLowerCase().includes(specialtySearch.toLowerCase()))
    .slice(0, showAllSpecialties ? undefined : 10);

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
      default:
        return "Apply filters to refine your search";
    }
  };

  return (
    <Card className="sticky top-24 border-none shadow-md bg-white">
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
        
        <ScrollArea className="h-[calc(100vh-250px)] pr-4">
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
              
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search specialties" 
                  value={specialtySearch}
                  onChange={(e) => setSpecialtySearch(e.target.value)}
                  className="pl-8 py-1 h-8"
                />
              </div>
              
              <div className="space-y-2">
                {visibleSpecialties.map((specialty) => (
                  <div key={specialty} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`specialty-${specialty}`} 
                      checked={selectedSpecialties.includes(specialty)}
                      onCheckedChange={() => toggleSpecialty(specialty)}
                    />
                    <label 
                      htmlFor={`specialty-${specialty}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {specialty}
                    </label>
                  </div>
                ))}
              </div>
              
              {specialties.length > 10 && specialtySearch === "" && (
                <Button 
                  variant="link" 
                  className="text-xs p-0 h-auto text-[#0ABAB5]"
                  onClick={() => setShowAllSpecialties(!showAllSpecialties)}
                >
                  {showAllSpecialties ? "Show fewer specialties" : "See more specialties"}
                </Button>
              )}
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
                    className={`rounded-full text-xs ${selectedGenders.includes(gender) ? 'bg-[#0ABAB5] text-white' : 'bg-white'}`}
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
                    className={`rounded-full text-xs ${selectedExperience.includes(experience) ? 'bg-[#0ABAB5] text-white' : 'bg-white'}`}
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
                    className={`rounded-full text-xs ${selectedLanguages.includes(language) ? 'bg-[#0ABAB5] text-white' : 'bg-white'}`}
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
            
            <Button className="w-full bg-[#0ABAB5] hover:bg-[#09a09b] text-white" onClick={applyFilters}>Apply Filters</Button>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
