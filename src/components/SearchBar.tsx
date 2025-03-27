
import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleDoctorSearch = () => {
    navigate("/doctor-search");
  };

  return (
    <div className="search-container flex items-center w-full max-w-xl mx-auto">
      {/* Locality field (30%) */}
      <div className="relative w-[30%] pr-2 border-r border-gray-200">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Input 
              type="text" 
              placeholder="Locality, Pincode..." 
              className="border-0 px-3 py-0 h-10 focus-visible:ring-0 placeholder:text-muted-foreground cursor-pointer"
              readOnly
              onClick={() => setIsOpen(true)}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[350px] p-4 bg-white" align="start">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Search City or PIN</h3>
              
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Enter locality or PIN code" 
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md">
                <Navigation className="h-4 w-4 text-primary" />
                Use current location
              </Button>
              
              <div className="pt-2">
                <h4 className="font-medium text-sm mb-3">Popular Locations</h4>
                <div className="grid grid-cols-1 gap-y-2">
                  <button className="text-left px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium text-sm hover:text-primary flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-2 text-gray-500" />
                    Koramangala, Bangalore
                  </button>
                  <button className="text-left px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium text-sm hover:text-primary flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-2 text-gray-500" />
                    Indiranagar, Bangalore
                  </button>
                  <button className="text-left px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium text-sm hover:text-primary flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-2 text-gray-500" />
                    HSR Layout, Bangalore
                  </button>
                  <button className="text-left px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium text-sm hover:text-primary flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-2 text-gray-500" />
                    Whitefield, Bangalore
                  </button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Search doctors field (70%) */}
      <div className="relative w-[70%] pl-3">
        <Input 
          type="text" 
          placeholder="Search doctors, specialties..." 
          className="border-0 px-0 py-0 h-10 focus-visible:ring-0 placeholder:text-muted-foreground pl-0"
          onClick={handleDoctorSearch}
          readOnly
        />
        {!isMobile && (
          <Button 
            className="rounded-full sky-button h-9 w-9 p-0 absolute right-0 top-0.5"
            onClick={handleDoctorSearch}
          >
            <span className="sr-only">Search</span>
          </Button>
        )}
      </div>
    </div>
  );
}
