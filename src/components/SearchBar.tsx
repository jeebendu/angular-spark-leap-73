
import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { LocationSelector } from "@/components/LocationSelector";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Mock suggestions - in a real app, these would come from an API
  const suggestions = [
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedist",
    "Gynecologist",
    "Dr. Sarah Johnson - Cardiologist",
    "Dr. Michael Chen - Dermatologist",
    "Heart disease specialist",
    "Skin problems"
  ];

  const filteredSuggestions = suggestions.filter(
    s => !searchQuery || s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDoctorSearch = (term = "") => {
    const searchTerm = term || searchQuery;
    navigate(`/doctor-search${searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ""}`);
    setOpenSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleDoctorSearch(suggestion);
  };

  // Only close the suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-radix-popper-content-wrapper]')
      ) {
        setOpenSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container flex items-center w-full max-w-3xl mx-auto relative rounded-full shadow-lg p-1 sm:p-2">
      {/* Locality field (mobile: icon only, desktop: text) */}
      <div className="relative w-[30%] sm:w-[35%]">
        <LocationSelector />
      </div>
      
      {/* Search doctors field */}
      <div className="relative w-[70%] sm:w-[65%] pl-2 sm:pl-3 flex items-center">
        <Popover open={openSuggestions && filteredSuggestions.length > 0} onOpenChange={setOpenSuggestions}>
          <PopoverTrigger asChild>
            <div className="relative w-full">
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search doctors, specialties..." 
                className="border-0 px-0 py-0 h-10 focus-visible:ring-0 placeholder:text-muted-foreground pl-10 bg-transparent w-full"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenSuggestions(true);
                }}
                onFocus={() => setOpenSuggestions(true)}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[65vw] max-w-[500px]" align="start" sideOffset={5}>
            <div className="max-h-60 overflow-y-auto py-2">
              {filteredSuggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center">
                    <Search className="h-3 w-3 text-gray-500 mr-2" />
                    <span>{suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Button 
          className="rounded-full h-9 w-[100px] text-sm text-white bg-primary hover:bg-primary/90 ml-1"
          onClick={() => handleDoctorSearch()}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
