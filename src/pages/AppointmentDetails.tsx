
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAppointmentById } from "@/services/AppointmentServiceHandler";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { useToast } from "@/components/ui/use-toast";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        if (id) {
          const data = await getAppointmentById(id);
          setAppointment(data);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load appointment details",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, toast]);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-2"
          onClick={() => navigate("/appointments")}
        >
          <ArrowLeft size={16} />
          Back to Appointments
        </Button>

        <h1 className="text-2xl font-bold mb-6">Appointment Details</h1>

        {loading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
        ) : appointment ? (
          <Card>
            <CardHeader>
              <CardTitle>Appointment #{id}</CardTitle>
              <CardDescription>
                {appointment.status === "confirmed" ? (
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                    Confirmed
                  </span>
                ) : (
                  <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium">
                    {appointment.status || "Pending"}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="text-gray-500 w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Doctor</p>
                  <p className="text-gray-600">
                    {appointment.doctor?.name || "Dr. Name not available"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="text-gray-500 w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-gray-600">
                    {appointment.date || "Date not available"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="text-gray-500 w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-gray-600">
                    {appointment.time || "Time not available"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="text-gray-500 w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-gray-600">
                    {appointment.clinic?.name || "Clinic not available"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {appointment.clinic?.address || "Address not available"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/appointments")}>Back</Button>
              {appointment.status !== "cancelled" && (
                <Button variant="destructive">Cancel Appointment</Button>
              )}
            </CardFooter>
          </Card>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-600">Appointment not found.</p>
            <Button className="mt-4" onClick={() => navigate("/appointments")}>
              View All Appointments
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AppointmentDetails;
