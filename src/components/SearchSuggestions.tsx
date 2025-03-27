
import React from "react";
import { Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchSuggestionsProps {
  isVisible: boolean;
  searchQuery: string;
  onSuggestionClick: (suggestion: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  triggerElement: React.ReactNode;
}

export function SearchSuggestions({ 
  isVisible, 
  searchQuery, 
  onSuggestionClick,
  containerRef,
  triggerElement
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

  const filteredSuggestions = mockSuggestions
    .filter(s => !searchQuery || s.toLowerCase().includes(searchQuery.toLowerCase()));

  if (filteredSuggestions.length === 0) return null;

  return (
    <Popover open={isVisible}>
      <PopoverTrigger asChild>
        {triggerElement}
      </PopoverTrigger>
      <PopoverContent 
        ref={containerRef}
        className="w-full p-0 shadow-lg border border-gray-200 bg-white z-50"
        align="start"
        sideOffset={5}
      >
        <div className="max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
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
      </PopoverContent>
    </Popover>
  );
}
