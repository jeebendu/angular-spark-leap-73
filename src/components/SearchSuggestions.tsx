
import React from "react";
import { Search } from "lucide-react";

interface SearchSuggestionsProps {
  isVisible: boolean;
  searchQuery: string;
  onSuggestionClick: (suggestion: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function SearchSuggestions({ 
  isVisible, 
  searchQuery, 
  onSuggestionClick,
  containerRef
}: SearchSuggestionsProps) {
  // Mock suggestions - in a real app, these would come from an API
  const mockSuggestions = [
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

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
      style={{ width: "100%" }}
    >
      {mockSuggestions
        .filter(s => !searchQuery || s.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((suggestion, index) => (
          <div 
            key={index}
            className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
            onClick={() => onSuggestionClick(suggestion)}
          >
            <div className="flex items-center">
              <Search className="h-3 w-3 text-gray-500 mr-2" />
              <span>{suggestion}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
