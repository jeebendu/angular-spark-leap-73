
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Home,
  User,
  Clock,
  Settings,
  Menu,
  X,
  ChevronRight,
  Bell,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DoctorLayoutProps {
  children: ReactNode;
}

export function DoctorLayout({ children }: DoctorLayoutProps) {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [iconOnly, setIconOnly] = useState(false);
  const { toast } = useToast();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleIconOnly = () => setIconOnly(!iconOnly);
  
  const navigation = [
    { name: "Dashboard", href: "/doctor", icon: Home },
    { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
    { name: "Patients", href: "/doctor/patients", icon: User },
    { name: "Schedule", href: "/doctor/schedule", icon: Clock },
    { name: "Settings", href: "/doctor/settings", icon: Settings },
  ];
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    // In a real app, this would handle actual logout functionality
  };

  // Don't show the sidebar on the onboarding route
  const isOnboardingRoute = pathname.includes("/doctor/onboarding");
  if (isOnboardingRoute) {
    return (
      <div className="min-h-screen bg-background">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md rounded-full"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out bg-white border-r border-gray-100 shadow-lg",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          iconOnly ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                D
              </div>
              {!iconOnly && (
                <div className="ml-3 text-xl font-semibold text-gray-800 transition-opacity duration-200">
                  Doctor Hub
                </div>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex"
              onClick={toggleIconOnly}
            >
              {iconOnly ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <TooltipProvider delayDuration={200}>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center px-4 py-3 text-sm rounded-lg group transition-colors",
                          isActive
                            ? "bg-orange-500/10 text-orange-600"
                            : "text-gray-600 hover:bg-orange-500/5 hover:text-orange-600"
                        )}
                      >
                        <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-orange-500" : "text-gray-400 group-hover:text-orange-500")} />
                        {!iconOnly && (
                          <>
                            {item.name}
                            {isActive && (
                              <ChevronRight className="ml-auto h-4 w-4 text-orange-500" />
                            )}
                          </>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {iconOnly && (
                      <TooltipContent side="right">
                        {item.name}
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </nav>

          {/* User profile */}
          <div className={cn("p-4 border-t border-gray-100", iconOnly && "px-2")}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full flex items-center justify-between text-left hover:bg-gray-100 rounded-lg",
                    iconOnly ? "px-2 py-2" : "px-3 py-2"
                  )}
                >
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/200/eaf7fc/33C3F0?text=DR&font=montserrat" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    {!iconOnly && (
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">Dr. Emily Johnson</p>
                        <p className="text-xs text-gray-500">Cardiologist</p>
                      </div>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        sidebarOpen ? (iconOnly ? "md:ml-16" : "md:ml-64") : "ml-0"
      )}>
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
