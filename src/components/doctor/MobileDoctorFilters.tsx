
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, X, Search, Filter } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface MobileDoctorFiltersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export const MobileDoctorFilters = ({
  open,
  onOpenChange,
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
  applyFilters,
}: MobileDoctorFiltersProps) => {
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
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  
  const visibleSpecialties = specialties
    .filter(specialty => specialty.toLowerCase().includes(specialtySearch.toLowerCase()))
    .slice(0, showAllSpecialties ? undefined : 10);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-white sm:max-w-md modal-background p-0">
          <DialogHeader className="sticky top-0 z-10 bg-white p-4 border-b">
            <DialogTitle className="flex justify-between items-center">
              <span className="text-lg font-semibold">Filters</span>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh] px-4">
            <div className="space-y-4 py-4">
              {/* Mobile filters */}
              <div className="space-y-2">
                <h3 className="font-medium">Specialty</h3>
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
                        id={`mobile-specialty-${specialty}`} 
                        checked={selectedSpecialties.includes(specialty)}
                        onCheckedChange={() => toggleSpecialty(specialty)}
                      />
                      <label 
                        htmlFor={`mobile-specialty-${specialty}`}
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
                    className="text-xs p-0 h-auto text-primary"
                    onClick={() => setShowAllSpecialties(!showAllSpecialties)}
                  >
                    {showAllSpecialties ? "Show fewer specialties" : "See more specialties"}
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Gender</h3>
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
                <h3 className="font-medium">Experience</h3>
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
              
              <div className="space-y-2 pb-20">
                <h3 className="font-medium">Languages</h3>
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
            </div>
          </ScrollArea>
          
          <div className="sticky bottom-0 p-4 bg-white border-t">
            <Button 
              className="w-full bg-[#0ABAB5] hover:bg-[#09a09b] text-white" 
              onClick={() => {
                applyFilters();
                onOpenChange(false);
              }}
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Fixed filter button for mobile */}
      <Button
        variant="default"
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 rounded-full bg-[#0ABAB5] text-white shadow-lg px-6 py-6 h-auto md:hidden flex items-center gap-2"
        onClick={() => onOpenChange(true)}
      >
        <Filter className="h-5 w-5" />
        <span className="font-medium">Filters</span>
      </Button>
    </>
  );
};
