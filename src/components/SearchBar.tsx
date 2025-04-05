
import React, { useState, useRef, useEffect } from "react";
import { Search, Clock, X } from "lucide-react";
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
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [openLocationSelector, setOpenLocationSelector] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Mock suggestions - in a real app, these would come from an API
  const suggestions = [
    { text: "Cardiologist", type: "specialty", icon: <Clock className="h-4 w-4 text-gray-400" /> },
    { text: "Neurologist", type: "specialty", icon: <Clock className="h-4 w-4 text-gray-400" /> },
    { text: "Dermatologist", type: "specialty", icon: <Clock className="h-4 w-4 text-gray-400" /> },
    { text: "Pediatrician", type: "specialty", icon: <Clock className="h-4 w-4 text-gray-400" /> },
    { text: "Dr. Sarah Johnson", type: "doctor", icon: <Search className="h-4 w-4 text-gray-400" /> },
    { text: "Heart disease specialist", type: "keyword", icon: <Search className="h-4 w-4 text-gray-400" /> },
    { text: "Skin problems", type: "keyword", icon: <Search className="h-4 w-4 text-gray-400" /> }
  ];

  const filteredSuggestions = suggestions.filter(
    s => !searchQuery || s.text.toLowerCase().includes(searchQuery.toLowerCase())
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

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node) &&
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

  // Mobile layout needs extra handling
  const searchBarClasses = cn(
    "flex items-center w-full max-w-3xl mx-auto relative rounded-full shadow-lg",
    openSuggestions ? "rounded-b-none shadow-lg" : "shadow-md",
    "bg-white border border-gray-200"
  );

  return (
    <div ref={searchContainerRef} className="w-full max-w-3xl mx-auto relative">
      <div className={searchBarClasses}>
        {/* Location field */}
        <div className="relative w-[30%] sm:w-[35%] p-2 sm:p-3">
          <LocationSelector onOpenChange={(open) => setOpenLocationSelector(open)} />
        </div>
        
        {/* Search doctors field */}
        <div className="relative w-[70%] sm:w-[65%] pl-2 sm:pl-3 flex items-center h-12 sm:h-14">
          <div className="relative w-full flex items-center">
            <Search className="h-4 w-4 text-muted-foreground absolute left-2 top-1/2 transform -translate-y-1/2" />
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleDoctorSearch();
                }
              }}
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          <Button 
            className="rounded-full h-9 w-[100px] text-sm text-white bg-primary hover:bg-primary/90 ml-1"
            onClick={() => handleDoctorSearch()}
          >
            Search
          </Button>
        </div>
      </div>
      
      {/* Suggestions dropdown (Google-style) */}
      {openSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border-x border-b border-gray-200 rounded-b-xl shadow-lg z-50 max-h-[60vh] overflow-y-auto">
          <div className="py-2">
            {filteredSuggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center"
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                {suggestion.icon}
                <span className="ml-3 text-sm text-gray-700">{suggestion.text}</span>
              </div>
            ))}
            <div className="flex justify-center gap-2 p-3 border-t mt-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-8"
                onClick={() => handleDoctorSearch()}
              >
                Search Doctors
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-8"
              >
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
