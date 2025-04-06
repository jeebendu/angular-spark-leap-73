
import React from "react";
import { Search, Filter, Rows, LayoutList, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MobileDoctorFilters } from "@/components/doctor/MobileDoctorFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";

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
  applyFilters
}: DoctorSearchBarProps) {
  const isMobile = useIsMobile();

  // Calculate total selected filters
  const totalFilters = selectedSpecialties.length + selectedGenders.length + 
                        selectedLanguages.length + selectedExperience.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by doctor name, specialty, condition..."
            className="pl-10 pr-4 py-2 bg-white rounded-[30px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
            <SelectTrigger className="w-[160px]">
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
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutList className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
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
          />
        )}
      </div>

      {/* Selected filters display */}
      {totalFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSpecialties.map(specialty => (
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
          
          {selectedGenders.map(gender => (
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
          
          {selectedLanguages.map(language => (
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
          
          {selectedExperience.map(exp => (
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
