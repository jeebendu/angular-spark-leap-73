
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  return (
    <div className="search-container flex items-center w-full max-w-3xl mx-auto">
      <div className="flex-1 px-3">
        <Input 
          type="text" 
          placeholder="Search doctors, specialties..." 
          className="border-0 px-0 py-0 h-9 focus-visible:ring-0 placeholder:text-muted-foreground"
        />
      </div>
      <div className="relative flex items-center px-3 border-l border-gray-200">
        <MapPin className="text-primary h-4 w-4 mr-2 flex-shrink-0" />
        <Input 
          type="text" 
          placeholder="Locality, Pincode..." 
          className="border-0 px-0 py-0 h-9 focus-visible:ring-0 placeholder:text-muted-foreground min-w-[140px]"
        />
      </div>
      <Button className="rounded-full sky-button h-9 w-9 p-0">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
