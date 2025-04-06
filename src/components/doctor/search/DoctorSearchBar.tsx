
import React from "react";
import { Search, Filter, Rows, LayoutList, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MobileDoctorFilters } from "@/components/doctor/MobileDoctorFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dispatch, SetStateAction } from "react";

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

  return (
    <div className="flex items-center gap-2 mb-6">
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
      
      <div className="flex gap-2">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px] md:flex hidden">
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
          <ToggleGroupItem value="grid" aria-label="Grid view" className="md:flex hidden">
            <LayoutList className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view" className="md:flex hidden">
            <Rows className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        
        {!isMobile && (
          <Button 
            variant={filterOpen ? "default" : "outline"}
            className={`flex items-center gap-2 ${filterOpen ? 'bg-[#0ABAB5] text-white' : 'border border-gray-200 bg-white'}`}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        )}

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
    </div>
  );
}
