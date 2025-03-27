
import { useState, useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/components/ui/use-toast";

export function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const { location, setLocation } = useLocation();
  const { toast } = useToast();

  // Simulate Google Maps API location suggestions
  useEffect(() => {
    if (locationInput.length >= 3) {
      // This would be replaced with actual Google Maps API call
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
        // In a real app, we would get actual coordinates from Google Maps API
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

  return (
    <div className="relative w-full pr-2 border-r border-gray-200">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost"
            className="w-full justify-start px-3 py-0 h-10 text-left font-normal focus-visible:ring-0 text-sm"
          >
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span className="truncate">{location.locality || "Select your city..."}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-4 bg-white shadow-lg border border-gray-200 z-50" align="start" sideOffset={5}>
          <div className="space-y-4">
            <h3 className="font-medium flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              Select Your City
            </h3>
            
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Enter locality or PIN code" 
                className="border border-gray-300 rounded-md px-4 py-2 w-full bg-white"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />
              
              {locationSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {locationSuggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                      onClick={() => handleLocationSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 text-gray-500 mr-2" />
                        <span>{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
  );
}
