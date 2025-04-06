
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";

export function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground ml-1">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Providers</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/clinic-management" className="flex items-center w-full">
            <Building className="mr-2 h-4 w-4" />
            <span>Clinic</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/doctor" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Doctor Dashboard</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
