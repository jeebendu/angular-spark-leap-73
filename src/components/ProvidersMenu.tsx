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

export function ProvidersMenu() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleDoctorLogin = () => {
    // In a real app, this would handle authentication
    // For now, just navigate to the doctor dashboard
    setOpenDialog(false);
    navigate("/doctor");
  };

  const handleDoctorSignup = () => {
    setOpenDialog(false);
    navigate("/doctor/onboarding");
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Providers</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/40 p-6 no-underline outline-none focus:shadow-md"
                      to="/clinic-management"
                    >
                      <Building className="h-6 w-6 text-primary" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Clinic Management Platform
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Register your clinic or access your existing clinic portal for comprehensive healthcare management
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                
                <ListItem onClick={() => setOpenDialog(true)} title="For Doctors" icon={<UserRound className="h-4 w-4 mr-2 text-primary" />}>
                  Register as a healthcare provider to join our network
                </ListItem>
                
                <ListItem href="/clinic-management" title="Existing Provider">
                  Access your provider dashboard to manage patients
                </ListItem>
                
                <ListItem href="/clinic-management" title="Clinic Solutions">
                  Explore comprehensive solutions for your healthcare practice
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Doctor Portal</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="login" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="doctor@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="flex justify-between items-center text-sm">
                <Label htmlFor="remember" className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="remember" className="rounded text-primary focus:ring-primary" />
                  Remember me
                </Label>
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Button 
                onClick={handleDoctorLogin} 
                className="w-full sky-button"
              >
                Login
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 py-4">
              <p className="text-sm text-gray-600">
                Join our network of healthcare providers to access our comprehensive suite of tools.
              </p>
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" placeholder="Dr. John Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" placeholder="doctor@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" placeholder="e.g. Cardiology, Pediatrics" />
              </div>
              <Button 
                onClick={handleDoctorSignup} 
                className="w-full sky-button"
              >
                Start Onboarding
              </Button>
              <p className="text-xs text-center text-gray-500">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode, onClick?: () => void }
>(({ className, title, children, icon, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
            className
          )}
          onClick={onClick}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon && icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
