
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  imageSrc: string;
  status: "upcoming" | "completed" | "cancelled";
}

export function AppointmentCard({ doctorName, specialty, date, time, imageSrc, status }: AppointmentCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img src={imageSrc} alt={doctorName} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{doctorName}</h3>
            <p className="text-muted-foreground text-xs">{specialty}</p>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">{time}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <div>
            {status === "upcoming" && <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Upcoming</span>}
            {status === "completed" && <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Completed</span>}
            {status === "cancelled" && <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">Cancelled</span>}
          </div>
          
          {status === "upcoming" && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs h-8">Reschedule</Button>
              <Button size="sm" className="text-xs h-8">Join</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
