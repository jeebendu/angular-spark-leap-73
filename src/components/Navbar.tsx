import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { SearchBar } from "@/components/SearchBar";
import { LocationSelector } from "@/components/LocationSelector";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleLogout = () => {
    console.log("User logged out");
    // In a real app, you would handle logout here
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-gray-200 bg-white">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild className="lg:hidden block">
            <Button variant="ghost" size="icon" className="-ml-3 h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <nav className="flex flex-col h-full py-6 border-r bg-white">
              <div className="px-3 py-2">
                <Link to="/" className="flex items-center">
                  <img 
                    src="https://placehold.co/200x60/eaf7fc/33C3F0?text=logo&font=montserrat" 
                    alt="ClinicHub Logo" 
                    className="h-8"
                  />
                </Link>
              </div>
              <div className="space-y-1 px-3 mt-4">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                >
                  Home
                </Link>
                <Link
                  to="/doctor-search"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                >
                  Find Doctors
                </Link>
                <Link
                  to="/appointments"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                >
                  Appointments
                </Link>
                <Link
                  to="/tests"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                >
                  Tests
                </Link>
                <Link
                  to="/reports"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                >
                  Reports
                </Link>
                <Link
                  to="/chat"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                >
                  Chat
                </Link>
              </div>
              <Separator className="my-4" />
              <div className="space-y-1 px-3">
                <Link
                  to="/account"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                >
                  Account
                </Link>
                <button
                  className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        
        <Link to="/" className="flex items-center">
          <img 
            src="https://placehold.co/200x60/eaf7fc/33C3F0?text=logo&font=montserrat" 
            alt="ClinicHub Logo" 
            className="h-8"
          />
        </Link>
        
        <nav className="hidden lg:flex mx-6 items-center space-x-2">
          <Link
            to="/"
            className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            to="/doctor-search"
            className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Find Doctors
          </Link>
          <Link
            to="/appointments"
            className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Appointments
          </Link>
          <Link
            to="/tests"
            className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Tests
          </Link>
          <Link
            to="/reports"
            className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Reports
          </Link>
          <Link
            to="/chat"
            className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100"
          >
            Chat
          </Link>
        </nav>
        
        <div className="flex-1 flex items-center justify-end space-x-4">
          <div className="w-full max-w-xl flex items-center mx-auto hidden md:flex">
            <div className="w-full flex items-center">
              <LocationSelector />
              <div className="flex-1">
                <SearchBar />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <Link to="/account">
                  <DropdownMenuItem>Account</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
