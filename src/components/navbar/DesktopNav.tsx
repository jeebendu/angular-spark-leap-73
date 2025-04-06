
import { Link } from "react-router-dom";
import { Building, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-medium hover:text-primary transition-colors">Providers</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[200px]">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/clinic-management"
                      className="flex items-center p-2 hover:bg-slate-100 rounded-md"
                    >
                      <Building className="mr-2 h-4 w-4" />
                      <span>Clinic</span>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/doctor"
                      className="flex items-center p-2 hover:bg-slate-100 rounded-md"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Doctors</span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
