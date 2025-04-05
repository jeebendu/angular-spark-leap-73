import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Building, UserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// This component is deprecated and replaced by the updated navigation in Navbar.tsx
// Keeping this file for reference but it's no longer actively used in the application
export function ProvidersMenu() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleDoctorLogin = () => {
    setOpenDialog(false);
    navigate("/doctor");
  };

  const handleDoctorSignup = () => {
    setOpenDialog(false);
    navigate("/doctor/onboarding");
  };

  return (
    <>
      {/* Component functionality has been moved to Navbar.tsx */}
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode, onClick?: () => void }
>(({ className, title, children, icon, onClick, ...props }, ref) => {
  return (
    <li>
      {/* Component functionality has been moved to Navbar.tsx */}
    </li>
  );
});
ListItem.displayName = "ListItem";
