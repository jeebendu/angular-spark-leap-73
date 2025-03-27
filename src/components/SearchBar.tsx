
import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/components/ui/use-toast";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setShowSuggestions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { location, setLocation } = useLocation();
  const { toast } = useToast();

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchInputRef.current && 
          !searchInputRef.current.contains(event.target as Node) &&
          suggestionsRef.current && 
          !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const detectCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode to get the address
          // For now, let's simulate getting a locality
          const mockLocality = "Indiranagar, Bangalore";
          
          setLocation({
            locality: mockLocality,
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
          
          toast({
            title: "Location Detected",
            description: `Your location: ${mockLocality}`,
          });
          
          setIsLoadingLocation(false);
          setIsOpen(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to detect your location. Please enter it manually.",
            variant: "destructive",
          });
          setIsLoadingLocation(false);
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
      setIsLoadingLocation(false);
    }
  };

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

  return (
    <div className="search-container flex items-center w-full max-w-xl mx-auto">
      {/* Locality field (30%) */}
      <div className="relative w-[30%] pr-2 border-r border-gray-200">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Input 
              type="text" 
              placeholder="Location..." 
              className="border-0 px-3 py-0 h-10 focus-visible:ring-0 placeholder:text-muted-foreground cursor-pointer text-sm"
              readOnly
              onClick={() => setIsOpen(true)}
              value={location.locality || ""}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-4 bg-white modal-background" align="start">
            <div className="space-y-4">
              <h3 className="font-medium">Search City or PIN</h3>
              
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Enter locality or PIN code" 
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md"
                onClick={detectCurrentLocation}
                disabled={isLoadingLocation}
              >
                <Navigation className="h-4 w-4 text-primary" />
                {isLoadingLocation ? "Detecting..." : "Use current location"}
              </Button>
              
              <div className="pt-2">
                <h4 className="font-medium text-sm mb-3">Popular Locations</h4>
                <div className="grid grid-cols-1 gap-y-2">
                  <button 
                    className="text-left px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium text-sm hover:text-primary flex items-center"
                    onClick={() => {
                      setLocation({
                        locality: "Koramangala, Bangalore",
                        coordinates: { latitude: 12.9352, longitude: 77.6245 }
                      });
                      setIsOpen(false);
                    }}
                  >
                    <MapPin className="h-3.5 w-3.5 mr-2 text-gray-500" />
                    Koramangala, Bangalore
                  </button>
                  <button 
                    className="text-left px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium text-sm hover:text-primary flex items-center"
                    onClick={() => {
                      setLocation({
                        locality: "Indiranagar, Bangalore",
                        coordinates: { latitude: 12.9784, longitude: 77.6408 }
                      });
                      setIsOpen(false);
                    }}
                  >
                    <MapPin className="h-3.5 w-3.5 mr-2 text-gray-500" />
                    Indiranagar, Bangalore
                  </button>
                  <button 
                    className="text-left px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium text-sm hover:text-primary flex items-center"
                    onClick={() => {
                      setLocation({
                        locality: "HSR Layout, Bangalore",
                        coordinates: { latitude: 12.9116, longitude: 77.6474 }
                      });
                      setIsOpen(false);
                    }}
                  >
                    <MapPin className="h-3.5 w-3.5 mr-2 text-gray-500" />
                    HSR Layout, Bangalore
                  </button>
                  <button 
                    className="text-left px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium text-sm hover:text-primary flex items-center"
                    onClick={() => {
                      setLocation({
                        locality: "Whitefield, Bangalore",
                        coordinates: { latitude: 12.9698, longitude: 77.7499 }
                      });
                      setIsOpen(false);
                    }}
                  >
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
      <div className="relative w-[70%] pl-3 flex items-center">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input 
          ref={searchInputRef}
          type="text" 
          placeholder="Search doctors, specialties..." 
          className="border-0 px-0 py-0 h-10 focus-visible:ring-0 placeholder:text-muted-foreground pl-8"
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
        
        {/* Auto-suggestions dropdown */}
        {suggestions && (
          <div 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {mockSuggestions
              .filter(s => !searchQuery || s.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((suggestion, index) => (
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
        )}
      </div>
    </div>
  );
}
