
import { Calendar, Clock, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Appointment } from "@/admin/modules/appointments/types/appointment";
import { cancelAppointment } from "@/services/appointmentService";

// interface Appointment {
//   id: string;
//   doctorName: string;
//   specialty: string;
//   date: string;
//   time: string;
//   clinicName?: string;
//   location?: string;
//   status: string;
//   imageSrc: string;
// }

interface AppointmentCardProps {
  appointment: Appointment;
  className?: string;
  forUser?: string;
}

export function AppointmentCard({
  appointment,
  className,
  forUser = "You"
}: AppointmentCardProps) {
  // const { doctorName, specialty, date, time, imageSrc, status } = appointment;

  // Generate initials from the doctor's name
  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = getInitials(appointment.doctorClinic?.doctor?.firstname);



  const handleCancel = async (id: number) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) {
      return; // Exit if the user cancels the confirmation dialog
    }
    try {
      const data = await cancelAppointment(id);
      alert("Appointment cancelled successfully!");
      console.log("Appointment cancelled successfully:", data);
      window.location.reload(); // Reload the page after successful cancellation

    } catch (error) {
      console.error("Error in to cancel appointment:", error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className={cn(
        "overflow-hidden border-none card-shadow",
        appointment.status?.toLowerCase() === "cancelled" && "border-l-4 border-l-red-500"
      )}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarImage src={appointment.doctorClinic?.doctor?.image} alt={appointment.doctorClinic?.doctor?.firstname} />
              <AvatarFallback className="bg-primary text-white">{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h3 className="font-semibold text-sm"> {appointment.doctorClinic?.doctor?.firstname} {appointment.doctorClinic?.doctor?.lastname}</h3>
              <p className="text-muted-foreground text-xs">{appointment.doctorClinic?.doctor?.specialization}</p>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-primary" />
                  <span className="text-xs">
                    {appointment.slot?.date ? new Date(appointment.slot.date).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-primary" />
                  <span className="text-xs">
                    {appointment.slot?.startTime
                      ? new Date(`1970-01-01T${appointment.slot.startTime}`).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t">
            <div className="flex items-center gap-2">
              {appointment.status?.toLowerCase() === "upcoming" && <span className="text-xs px-2 py-1 bg-blue-50 text-primary rounded-full">Upcoming</span>}
              {appointment.status?.toLowerCase() === "completed" && <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Completed</span>}
              {appointment.status?.toLowerCase() === "cancelled" && <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">Cancelled</span>}
              {status === "confirmed" && <span className="text-xs px-2 py-1 bg-blue-50 text-primary rounded-full">Confirmed</span>}

              {forUser !== "You" && (
                <span className="text-xs text-gray-500">For: {forUser}</span>
              )}
            </div>


            {(appointment.status?.toLowerCase() === "upcoming" || appointment.status?.toLowerCase() === "confirmed") && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs h-8 rounded-full">Reschedule</Button>
              </div>
            )}

            {appointment.status?.toLowerCase() === "upcoming" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-8 rounded-full border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => handleCancel(appointment.id)}
                >
                  Cancel
                </Button>
              </div>
            )}



          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
