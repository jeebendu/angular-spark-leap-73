
import { useState, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { LocationSelector } from "@/components/LocationSelector";
import { SearchSuggestions } from "@/components/SearchSuggestions";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleDoctorSearch = (term = "") => {
    const searchTerm = term || searchQuery;
    navigate(`/doctor-search${searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ""}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleDoctorSearch(suggestion);
  };

  return (
    <div ref={containerRef} className="search-container flex items-center w-full max-w-3xl mx-auto relative">
      {/* Locality field (30% - increased from 20%) */}
      <div className="relative w-[30%]">
        <LocationSelector />
      </div>
      
      {/* Search doctors field (70% - reduced from 80%) */}
      <div className="relative w-[70%] pl-3 flex items-center">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input 
          ref={searchInputRef}
          type="text" 
          placeholder="Search doctors, specialties..." 
          className="border-0 px-0 py-0 h-10 focus-visible:ring-0 placeholder:text-muted-foreground pl-8 bg-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleSearchFocus}
        />
        <Button 
          className="rounded-full sky-button h-9 w-9 p-0 absolute right-0 top-0.5 md:flex hidden"
          onClick={() => handleDoctorSearch()}
        >
          <Search className="h-4 w-4 text-white" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      
      {/* Auto-suggestions dropdown */}
      <SearchSuggestions 
        isVisible={showSuggestions}
        searchQuery={searchQuery}
        onSuggestionClick={handleSuggestionClick}
        containerRef={suggestionsRef}
      />
    </div>
  );
}
