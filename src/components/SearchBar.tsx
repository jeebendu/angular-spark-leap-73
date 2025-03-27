
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  return (
    <div className="search-container flex items-center w-full max-w-3xl mx-auto">
      <div className="relative flex items-center px-3 border-r border-gray-200">
        <MapPin className="text-primary h-4 w-4 mr-2 flex-shrink-0" />
        <Select defaultValue="bangalore">
          <SelectTrigger className="border-0 px-0 py-0 h-auto min-w-[120px] bg-transparent focus:ring-0 font-medium">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
          </SelectContent>
        </Select>
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
