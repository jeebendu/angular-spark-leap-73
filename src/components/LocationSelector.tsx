
import { useState, useEffect } from "react";
import { MapPin, Navigation, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface LocationSelectorProps {
  onOpenChange?: (open: boolean) => void;
}

export function LocationSelector({ onOpenChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const { location, setLocation } = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Notify parent component when open state changes
  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  // Simulate location suggestions
  useEffect(() => {
    if (locationInput.length >= 2) {
      // This would be replaced with actual API call
      const mockLocations = [
        `${locationInput} North, Bangalore`,
        `${locationInput} South, Bangalore`,
        `${locationInput} East, Delhi`,
        `${locationInput} West, Mumbai`,
      ];
      setLocationSuggestions(mockLocations);
    } else {
      setLocationSuggestions([]);
    }
  }, [locationInput]);

  const handleLocationSuggestionClick = (suggestion: string) => {
    setLocationInput("");
    setLocation({
      locality: suggestion,
      coordinates: {
        // In a real app, we would get actual coordinates
        latitude: 12.9716 + Math.random() * 0.05,
        longitude: 77.5946 + Math.random() * 0.05
      }
    });
    setLocationSuggestions([]);
    setIsOpen(false);
  };

  const detectCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode to get the address
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

  return (
    <div className="relative w-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost" 
            className="h-9 w-full flex items-center justify-start gap-2 p-0 hover:bg-transparent"
          >
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            <span className={cn("truncate text-sm", isMobile ? "max-w-[80px]" : "")}>
              {location.locality || "Select location"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0 bg-white shadow-lg border-0 rounded-lg overflow-hidden" align="start">
          <div className="border-b p-3">
            <h3 className="font-medium text-sm mb-2">
              Select Your Location
            </h3>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search for area, street name..." 
                className="border border-gray-300 pl-10 pr-2 py-2 w-full bg-transparent h-10 text-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                autoFocus
              />
              <MapPin className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          {locationSuggestions.length > 0 && (
            <div className="max-h-[220px] overflow-y-auto py-1">
              {locationSuggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm flex items-center"
                  onClick={() => handleLocationSuggestionClick(suggestion)}
                >
                  <Clock className="h-4 w-4 text-gray-400 mr-3" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="border-t p-3">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 h-10 text-sm border-blue-500 text-blue-500 hover:bg-blue-50"
              onClick={detectCurrentLocation}
              disabled={isLoadingLocation}
            >
              <Navigation className="h-4 w-4" />
              {isLoadingLocation ? "Detecting..." : "Use my current location"}
            </Button>
          </div>
          
          <div className="bg-gray-50 py-3 px-4">
            <h4 className="font-medium text-xs mb-2 text-gray-500">POPULAR LOCATIONS</h4>
            <div className="grid grid-cols-1 gap-1">
              {["Koramangala, Bangalore", "Indiranagar, Bangalore", 
                "HSR Layout, Bangalore", "Whitefield, Bangalore"].map((city, index) => (
                <button 
                  key={index}
                  className="text-left px-2 py-1.5 rounded-md hover:bg-gray-100 text-sm hover:text-primary flex items-center"
                  onClick={() => {
                    setLocation({
                      locality: city,
                      coordinates: { latitude: 12.9352 + (index * 0.01), longitude: 77.6245 + (index * 0.01) }
                    });
                    setIsOpen(false);
                  }}
                >
                  <MapPin className="h-3 w-3 mr-2 text-gray-500" />
                  {city}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
