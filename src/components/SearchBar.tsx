
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="search-container flex items-center w-full max-w-3xl mx-auto">
      <div className="relative flex items-center px-3 border-r border-gray-200">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <MapPin className="text-primary h-4 w-4 mr-2 flex-shrink-0" />
              <Input 
                type="text" 
                placeholder="Locality, Pincode..." 
                className="border-0 px-0 py-0 h-9 focus-visible:ring-0 placeholder:text-muted-foreground min-w-[140px] cursor-pointer"
                readOnly
                onClick={() => setIsOpen(true)}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0" align="start">
            <div className="p-3 space-y-2">
              <h3 className="font-medium text-sm">Search by</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-2 hover:bg-accent rounded-md text-sm">Search by City</button>
                <button className="w-full text-left p-2 hover:bg-accent rounded-md text-sm">Nearby Location</button>
                <button className="w-full text-left p-2 hover:bg-accent rounded-md text-sm">Search by Pincode</button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex-1 px-3">
        <Input 
          type="text" 
          placeholder="Search doctors, specialties..." 
          className="border-0 px-0 py-0 h-9 focus-visible:ring-0 placeholder:text-muted-foreground"
        />
      </div>
      
      <Button className="rounded-full sky-button h-9 w-9 p-0">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
