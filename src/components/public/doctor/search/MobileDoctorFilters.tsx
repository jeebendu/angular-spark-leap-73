
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { genderOptions, experienceRangeOptions } from "@/constants/doctorFilterConstants";
import { fetchLanguages, fetchSpecializations } from "@/utils/doctorFilterUtils";

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
  setSelectedSpecialties?: Dispatch<SetStateAction<string[]>>;
  setSelectedGenders?: Dispatch<SetStateAction<string[]>>;
  setSelectedLanguages?: Dispatch<SetStateAction<string[]>>;
  setSelectedExperience?: Dispatch<SetStateAction<string[]>>;
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
  setSelectedSpecialties,
  setSelectedGenders,
  setSelectedLanguages,
  setSelectedExperience,
}: MobileDoctorFiltersProps) => {
  const genders = genderOptions;
  const experienceRanges = experienceRangeOptions;
  
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>([]);
  const [specializations, setSpecializations] = useState<{ id: number; name: string }[]>([]);
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  
  // Fetch languages and specializations using the shared utility functions
  useEffect(() => {
    const loadData = async () => {
      const langData = await fetchLanguages();
      const specData = await fetchSpecializations();
      
      setLanguages(langData);
      setSpecializations(specData);
    };
    
    loadData();
  }, []);
  
  const visibleSpecialties = specializations
    .filter(specialty => specialty.name.toLowerCase().includes(specialtySearch.toLowerCase()))
    .slice(0, showAllSpecialties ? undefined : 10);

  // Function to clear all selected filters
  const clearAllFilters = () => {
    if (setSelectedSpecialties) setSelectedSpecialties([]);
    if (setSelectedGenders) setSelectedGenders([]);
    if (setSelectedLanguages) setSelectedLanguages([]);
    if (setSelectedExperience) setSelectedExperience([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-md modal-background p-0">
        <DialogHeader className="sticky top-0 z-10 bg-white p-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">Filters</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] px-4">
          <div className="space-y-4 py-4">
            {/* Specialties section */}
            <div className="space-y-2">
              <h3 className="font-medium">Specialty</h3>
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search specialties" 
                  value={specialtySearch}
                  onChange={(e) => setSpecialtySearch(e.target.value)}
                  className="pl-8 py-1 h-8 rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                {visibleSpecialties.map((specialty) => (
                  <div key={specialty.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`mobile-specialty-${specialty.id}`} 
                      checked={selectedSpecialties.includes(specialty.name)}
                      onCheckedChange={() => toggleSpecialty(specialty.name)}
                    />
                    <label 
                      htmlFor={`mobile-specialty-${specialty.id}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {specialty.name}
                    </label>
                  </div>
                ))}
              </div>
              
              {specializations.length > 10 && specialtySearch === "" && (
                <Button 
                  variant="link" 
                  className="text-xs p-0 h-auto text-primary"
                  onClick={() => setShowAllSpecialties(!showAllSpecialties)}
                >
                  {showAllSpecialties ? "Show fewer specialties" : "See more specialties"}
                </Button>
              )}
            </div>
            
            {/* Gender section */}
            <div className="space-y-2">
              <h3 className="font-medium">Gender</h3>
              <div className="flex flex-wrap gap-2">
                {genders.map((gender) => (
                  <Button
                    key={gender.key}
                    variant={selectedGenders.includes(gender.key) ? "default" : "outline"}
                    size="sm"
                    className={`rounded-lg text-xs ${selectedGenders.includes(gender.key) ? 'bg-primary text-white' : 'bg-white'}`}
                    onClick={() => toggleGender(gender.key)}
                  >
                    {gender.value}
                    {selectedGenders.includes(gender.key) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Experience section */}
            <div className="space-y-2">
              <h3 className="font-medium">Experience</h3>
              <div className="flex flex-wrap gap-2">
                {experienceRanges.map((experience) => (
                  <Button
                    key={experience.key}
                    variant={selectedExperience.includes(experience.key) ? "default" : "outline"}
                    size="sm"
                    className={`rounded-lg text-xs ${selectedExperience.includes(experience.key) ? 'bg-primary text-white' : 'bg-white'}`}
                    onClick={() => toggleExperience(experience.key)}
                  >
                    {experience.value}
                    {selectedExperience.includes(experience.key) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Languages section */}
            <div className="space-y-2 pb-6">
              <h3 className="font-medium">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <Button
                    key={language.id}
                    variant={selectedLanguages.includes(language.name) ? "default" : "outline"}
                    size="sm"
                    className={`rounded-lg text-xs ${selectedLanguages.includes(language.name) ? 'bg-primary text-white' : 'bg-white'}`}
                    onClick={() => toggleLanguage(language.name)}
                  >
                    {language.name}
                    {selectedLanguages.includes(language.name) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear all filters section - if filters are selected */}
            {(selectedSpecialties.length > 0 || 
              selectedGenders.length > 0 || 
              selectedLanguages.length > 0 || 
              selectedExperience.length > 0) && (
                <div className="border-t pt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full text-sm border-gray-300"
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )
            }
          </div>
        </ScrollArea>
        
        {/* Added extra space before Apply button with mt-4 */}
        <div className="sticky bottom-0 p-4 bg-white border-t mt-4">
          <Button 
            className="w-full bg-[#0ABAB5] hover:bg-[#09a09b] text-white rounded-lg" 
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
  );
};
