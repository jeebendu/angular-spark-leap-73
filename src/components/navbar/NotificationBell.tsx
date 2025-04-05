
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationBell() {
  return (
    <Button variant="ghost" size="icon" className="text-muted-foreground relative hidden md:flex">
      <Bell className="h-5 w-5" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
    </Button>
  );
}
