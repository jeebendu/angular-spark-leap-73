
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Star, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

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
    "Gynecology"
  ];

  const genders = ["Male", "Female"];
  const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"];
  const experienceRanges = ["0-5 years", "5-10 years", "10-15 years", "15+ years"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-md modal-background">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Filters</span>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
          {/* Mobile filters */}
          <div className="space-y-2">
            <h3 className="font-medium">Specialty</h3>
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
          
          <div className="space-y-2">
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
          
          <div className="space-y-2">
            <h3 className="font-medium">Price Range</h3>
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
            <h3 className="font-medium">Availability</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Available Today</span>
                <Switch id="available-today" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Available This Week</span>
                <Switch id="available-week" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Rating</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center">
                  <span>4+</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                </span>
                <Switch id="rating-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center">
                  <span>3+</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                </span>
                <Switch id="rating-3" />
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full sky-button" onClick={() => {
              applyFilters();
              onOpenChange(false);
            }}>Apply Filters</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
