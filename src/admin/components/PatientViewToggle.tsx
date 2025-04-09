
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid, List } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PatientViewToggleProps {
  view: "list" | "card";
  onChange: (view: "list" | "card") => void;
}

const PatientViewToggle = ({ view, onChange }: PatientViewToggleProps) => {
  return (
    <ToggleGroup type="single" value={view} onValueChange={(value) => value && onChange(value as "list" | "card")}>
      <ToggleGroupItem value="list" aria-label="List view" className="px-2 sm:px-3 text-[#00b8ab]">
        <List className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">List</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="card" aria-label="Card view" className="px-2 sm:px-3 text-[#00b8ab]">
        <Grid className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Cards</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default PatientViewToggle;
