
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
import { useToast } from "@/components/ui/use-toast";

interface DoctorLayoutProps {
  children: ReactNode;
}

export function DoctorLayout({ children }: DoctorLayoutProps) {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
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
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-white border-r border-gray-100 shadow-lg",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                D
              </div>
              <div className="ml-3 text-xl font-semibold text-gray-800">
                Doctor Hub
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-lg group transition-colors",
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                  )}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-purple-700" : "text-gray-400 group-hover:text-purple-600")} />
                  {item.name}
                  {isActive && (
                    <ChevronRight className="ml-auto h-4 w-4 text-purple-700" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-gray-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-between text-left px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/200/eaf7fc/33C3F0?text=DR&font=montserrat" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">Dr. Emily Johnson</p>
                      <p className="text-xs text-gray-500">Cardiologist</p>
                    </div>
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
        sidebarOpen ? "md:ml-64" : "ml-0"
      )}>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
