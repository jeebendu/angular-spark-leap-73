
import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, MessageSquare, Search, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileNavigation() {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  if (!isMobile) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t py-2 md:hidden shadow-lg">
      <nav className="flex items-center justify-around">
        <Link to="/" className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/tests" className={`flex flex-col items-center p-2 ${location.pathname === '/tests' ? 'text-primary' : 'text-muted-foreground'}`}>
          <Search className="w-5 h-5" />
          <span className="text-xs mt-1">Tests</span>
        </Link>
        <Link to="/reports" className={`flex flex-col items-center p-2 ${location.pathname === '/reports' ? 'text-primary' : 'text-muted-foreground'}`}>
          <Calendar className="w-5 h-5" />
          <span className="text-xs mt-1">Reports</span>
        </Link>
        <Link to="/chat" className={`flex flex-col items-center p-2 ${location.pathname === '/chat' ? 'text-primary' : 'text-muted-foreground'}`}>
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link to="/account" className={`flex flex-col items-center p-2 ${location.pathname === '/account' ? 'text-primary' : 'text-muted-foreground'}`}>
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </nav>
    </div>
  );
}
