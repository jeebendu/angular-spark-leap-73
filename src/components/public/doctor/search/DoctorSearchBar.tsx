
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Filter, LayoutList, Mic, Rows, Search, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { MobileDoctorFilters } from "./MobileDoctorFilters";
import { parseQueryAndApplyFilters } from "@/utils/doctorFilterUtils";

interface DoctorSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (value: "grid" | "list") => void;
  filterOpen: boolean;
  setFilterOpen: (value: boolean) => void;
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
  // Adding the missing setter functions
  setSelectedSpecialties: Dispatch<SetStateAction<string[]>>;
  setSelectedGenders: Dispatch<SetStateAction<string[]>>;
  setSelectedLanguages: Dispatch<SetStateAction<string[]>>;
  setSelectedExperience: Dispatch<SetStateAction<string[]>>;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function DoctorSearchBar({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  filterOpen,
  setFilterOpen,
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
}: DoctorSearchBarProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);

  // Calculate total selected filters
  const totalFilters =
    selectedSpecialties.length +
    selectedGenders.length +
    selectedLanguages.length +
    selectedExperience.length;

  const clearSearch = () => {
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Function to analyze the search query and apply relevant filters
  const analyzeSearchQuery = () => {
    if (!searchTerm) return;
    
    // Import mock data for filter parsing until we have real data
    const mockSpecializations = [
      { id: 1, name: "Cardiologist" },
      { id: 2, name: "Neurologist" },
      { id: 3, name: "Orthopedist" },
      { id: 4, name: "Dermatologist" },
      { id: 5, name: "Pediatrician" },
      { id: 6, name: "Ophthalmologist" },
      { id: 7, name: "Dentist" },
      { id: 8, name: "Gynecologist" },
      { id: 9, name: "ENT Specialist" },
      { id: 10, name: "Psychiatrist" },
    ];
    
    const mockLanguages = [
      { id: 1, name: "English" },
      { id: 2, name: "Hindi" },
      { id: 3, name: "Tamil" },
      { id: 4, name: "Telugu" },
      { id: 5, name: "Bengali" },
    ];
    
    const genderOptions = [
      { key: "male", value: "Male" },
      { key: "female", value: "Female" },
    ];
    
    const experienceRangeOptions = [
      { key: "0-5", value: "0-5" },
      { key: "5-10", value: "5-10" },
      { key: "10-15", value: "10-15" },
      { key: "15+", value: "15+" },
    ];
    
    // Clear previous filter selections
    setSelectedSpecialties([]);
    setSelectedGenders([]);
    setSelectedLanguages([]);
    setSelectedExperience([]);
    
    // Parse the search query and apply filters
    parseQueryAndApplyFilters(
      searchTerm,
      mockSpecializations,
      mockLanguages,
      genderOptions,
      experienceRangeOptions,
      toggleSpecialty,
      toggleGender,
      toggleLanguage,
      toggleExperience
    );
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Search Unavailable",
        description: "Voice search is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      toast({
        title: "Voice Search Unavailable",
        description: "Voice search is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }
    
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    setIsListening(true);
    setShowVoiceOverlay(true);
    setVoiceText("Listening...");
    
    recognition.start();
    
    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setVoiceText(transcript);
      
      if (event.results[current].isFinal) {
        setSearchTerm(transcript);
        setIsListening(false);
        
        toast({
          title: "Voice Recognized",
          description: `Searching for: "${transcript}"`,
        });
        
        // Apply filters immediately after successful voice recognition
        setTimeout(() => {
          handleSearch(transcript);
          setShowVoiceOverlay(false);
        }, 1000);
      }
    };
    
    recognition.onerror = (event: any) => {
      setIsListening(false);
      setShowVoiceOverlay(false);
      toast({
        title: "Voice Search Error",
        description: `Error: ${event.error}`,
        variant: "destructive",
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => {
        if (showVoiceOverlay) {
          setShowVoiceOverlay(false);
        }
      }, 500);
    };
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  // Function to handle search submission with analysis and filter application
  const handleSearch = (searchValue?: string) => {
    const valueToSearch = searchValue || searchTerm;
    setSearchTerm(valueToSearch);
    analyzeSearchQuery();
    applyFilters();
  };

  // Handle pressing Enter key in the search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-3">
      {/* Voice Recognition Overlay */}
      {showVoiceOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-morphism p-10 rounded-3xl max-w-md w-full mx-4 text-center">
            <div className="bg-pink-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic className={cn(
                "h-16 w-16 transition-all",
                isListening ? "text-primary animate-pulse" : "text-gray-400"
              )} />
            </div>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">Speak now</h2>
            <p className="text-gray-600 mb-6 text-lg font-medium animate-pulse">
              {voiceText}
            </p>
            <Button 
              variant="outline" 
              onClick={() => setShowVoiceOverlay(false)}
              className="rounded-full px-6"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          {/* Updated Search Icon */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search by doctor name, specialty, condition..."
            className="pl-12 pr-16 py-2 bg-white rounded-[30px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {searchTerm && (
              <Button 
                onClick={clearSearch}
                className="p-1 h-8 w-8 rounded-full" 
                variant="ghost"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </Button>
            )}
            {/* Updated Voice Icon */}
            <Button
              onClick={handleVoiceSearch}
              className="p-1 h-10 w-10 rounded-full"
              variant="ghost"
              disabled={isListening}
            >
              <Mic
                className={cn(
                  "h-6 w-6 transition-transform transform hover:scale-110",
                  isListening
                    ? "text-[#0ABAB5] animate-pulse"
                    : "text-gray-400 hover:text-[#0ABAB5]"
                )}
              />
            </Button>
            {/* Search button after the voice button */}
            <Button
              variant="default"
              className="h-9 w-9 p-0 rounded-full flex items-center justify-center bg-[#0ABAB5] hover:bg-[#09a09b]"
              onClick={() => handleSearch()}
            >
              <Search className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-2 border border-gray-200 bg-white h-10 w-10 p-0 rounded-full"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Filter className="h-4 w-4" />
        </Button>
        
        <div className="md:flex hidden gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
            </SelectContent>
          </Select>
          
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")}>
            <ToggleGroupItem value="grid" aria-label="Grid view" className="rounded-l-full">
              <LayoutList className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view" className="rounded-r-full">
              <Rows className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {/* Mobile Doctor Filters */}
        {isMobile && (
          <MobileDoctorFilters 
            open={filterOpen}
            onOpenChange={setFilterOpen}
            selectedSpecialties={selectedSpecialties}
            selectedGenders={selectedGenders}
            selectedLanguages={selectedLanguages}
            selectedExperience={selectedExperience}
            priceRange={priceRange}
            toggleSpecialty={toggleSpecialty}
            toggleGender={toggleGender}
            toggleLanguage={toggleLanguage}
            toggleExperience={toggleExperience}
            setPriceRange={setPriceRange}
            applyFilters={applyFilters}
            setSelectedSpecialties={setSelectedSpecialties}
            setSelectedGenders={setSelectedGenders}
            setSelectedLanguages={setSelectedLanguages}
            setSelectedExperience={setSelectedExperience}
          />
        )}
      </div>

      {/* Selected filters display */}
      {totalFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSpecialties.map((specialty) => (
            <Badge
              key={`specialty-${specialty}`}
              variant="outline"
              className="bg-white rounded-full pl-2 pr-1 py-0.5 flex items-center gap-1 text-xs"
            >
              {specialty}
              <Button
                size="sm"
                variant="ghost"
                className="h-5 w-5 p-0 rounded-full hover:bg-gray-100"
                onClick={() => toggleSpecialty(specialty)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {selectedGenders.map((gender) => (
            <Badge
              key={`gender-${gender}`}
              variant="outline"
              className="bg-white rounded-full pl-2 pr-1 py-0.5 flex items-center gap-1 text-xs"
            >
              {gender}
              <Button
                size="sm"
                variant="ghost"
                className="h-5 w-5 p-0 rounded-full hover:bg-gray-100"
                onClick={() => toggleGender(gender)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {selectedLanguages.map((language) => (
            <Badge
              key={`language-${language}`}
              variant="outline"
              className="bg-white rounded-full pl-2 pr-1 py-0.5 flex items-center gap-1 text-xs"
            >
              {language}
              <Button
                size="sm"
                variant="ghost"
                className="h-5 w-5 p-0 rounded-full hover:bg-gray-100"
                onClick={() => toggleLanguage(language)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {selectedExperience.map((exp) => (
            <Badge
              key={`exp-${exp}`}
              variant="outline"
              className="bg-white rounded-full pl-2 pr-1 py-0.5 flex items-center gap-1 text-xs"
            >
              {exp} years
              <Button
                size="sm"
                variant="ghost"
                className="h-5 w-5 p-0 rounded-full hover:bg-gray-100"
                onClick={() => toggleExperience(exp)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {totalFilters > 1 && (
            <Button
              variant="link"
              className="text-xs py-0 h-6 text-primary"
              onClick={() => {
                setSelectedSpecialties([]);
                setSelectedGenders([]);
                setSelectedLanguages([]);
                setSelectedExperience([]);
                applyFilters();
              }}
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
