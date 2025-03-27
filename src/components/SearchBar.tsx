
import React, { useState, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchSuggestions } from "@/components/SearchSuggestions";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // In a real app, you would trigger a search here
  };

  // Create the input component that will be passed as the trigger
  const searchInput = (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search doctors, specialties, conditions..."
        className="pl-10 pr-12 py-6 h-12 md:h-10 bg-white"
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={() => searchQuery && setShowSuggestions(true)}
      />
    </div>
  );

  return (
    <div className="flex items-center gap-2 w-full max-w-2xl relative" ref={searchRef}>
      <SearchSuggestions
        isVisible={showSuggestions}
        searchQuery={searchQuery}
        onSuggestionClick={handleSuggestionClick}
        containerRef={searchRef}
        triggerElement={searchInput}
      />
      <Button type="submit" className="sky-button">
        <Search className="h-4 w-4" />
        <span className="ml-2 hidden md:inline">Search</span>
      </Button>
    </div>
  );
}
