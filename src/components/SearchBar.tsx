
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
      <Input 
        type="text" 
        placeholder="Search tests, packages, health concerns..." 
        className="pl-10 bg-background border-input pr-4 h-11 w-full md:w-[350px] lg:w-[450px] rounded-full"
      />
    </div>
  );
}
