
import { useState } from "react";
import { Search, MapPin, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="search-container flex flex-col sm:flex-row items-center w-full max-w-3xl mx-auto">
      {/* In mobile, we swap the order of the fields */}
      <div className={`relative flex-1 px-3 w-full ${isMobile ? 'order-2' : 'order-1'}`}>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Input 
              type="text" 
              placeholder="Locality, Pincode..." 
              className="border-0 px-0 py-0 h-9 focus-visible:ring-0 placeholder:text-muted-foreground min-w-[140px] cursor-pointer"
              readOnly
              onClick={() => setIsOpen(true)}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[350px] p-4" align="start">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Search City or PIN</h3>
              
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Enter city name or PIN code" 
                  className="border border-gray-300 rounded-full px-4 py-2 w-full"
                />
              </div>
              
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full">
                <Navigation className="h-4 w-4 text-primary" />
                Use current location
              </Button>
              
              <div className="pt-2">
                <h4 className="font-medium text-sm mb-3">Popular Cities</h4>
                <div className="grid grid-cols-2 gap-y-4">
                  <button className="text-left font-medium text-sm hover:text-primary">Delhi</button>
                  <button className="text-left font-medium text-sm hover:text-primary">Mumbai</button>
                  <button className="text-left font-medium text-sm hover:text-primary">Bangalore</button>
                  <button className="text-left font-medium text-sm hover:text-primary">Hyderabad</button>
                  <button className="text-left font-medium text-sm hover:text-primary">Chennai</button>
                  <button className="text-left font-medium text-sm hover:text-primary">Kolkata</button>
                  <button className="text-left font-medium text-sm hover:text-primary">Bhubaneswar</button>
                  <button className="text-left font-medium text-sm hover:text-primary">Pune</button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className={`relative flex items-center w-full sm:w-auto px-3 border-t sm:border-t-0 sm:border-l border-gray-200 mt-2 sm:mt-0 pt-2 sm:pt-0 ${isMobile ? 'order-1' : 'order-2'}`}>
        <Input 
          type="text" 
          placeholder="Search doctors, specialties..." 
          className="border-0 px-0 py-0 h-9 focus-visible:ring-0 placeholder:text-muted-foreground"
        />
      </div>
      
      <Button className="rounded-full sky-button h-9 w-9 p-0 mt-2 sm:mt-0 ml-auto sm:ml-0 order-3">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
