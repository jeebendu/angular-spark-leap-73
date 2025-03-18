
import { Link } from "react-router-dom";
import { Bell, Calendar, MessageSquare, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b bg-white py-3 px-4 md:px-6 sticky top-0 z-30 shadow-sm">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="orange-gradient rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          <span className="font-semibold text-lg hidden md:block">OrangeHealth</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Tests
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Health Packages
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Reports
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            <Button className="orange-button rounded-full ml-2">
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
