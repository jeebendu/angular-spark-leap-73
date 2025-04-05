
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

// This is a placeholder until the proper API is implemented
const getAppointmentById = async (id: string) => {
  // Mock API response
  return {
    id: id,
    date: new Date(),
    time: '10:00 AM',
    status: 'Confirmed',
    doctor: {
      name: 'Dr. Emily Johnson',
      specialty: 'Cardiologist'
    },
    clinic: {
      name: 'Heart Care Center',
      address: '123 Medical Plaza, New York, NY 10001',
      phone: '+1 (555) 123-4567'
    },
    patient: {
      name: 'John Doe'
    }
  };
};

export default function AppointmentDetails() {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }

    async function fetchAppointment() {
      try {
        if (id) {
          const data = await getAppointmentById(id);
          setAppointment(data);
        }
      } catch (error) {
        console.error('Error fetching appointment:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointment();
  }, [id, auth.isAuthenticated, navigate]);

  if (loading) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8 px-4 flex justify-center">
          <p>Loading appointment details...</p>
        </div>
      </AppLayout>
    );
  }

  if (!appointment) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8 px-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Appointment Not Found</h1>
          <p className="mb-4">The appointment you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate('/appointments')}>Back to Appointments</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Appointment Details</h1>
          <Button variant="outline" onClick={() => navigate('/appointments')}>Back to Appointments</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Appointment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Date</p>
                      <p>{format(appointment.date, 'MMMM d, yyyy')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Time</p>
                      <p>{appointment.time}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">Status</h3>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                    {appointment.status}
                  </span>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">Doctor Information</h3>
                  <p className="font-medium">{appointment.doctor.name}</p>
                  <p className="text-gray-600">{appointment.doctor.specialty}</p>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">Patient Information</h3>
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                    <p>{appointment.patient.name}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clinic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-medium">{appointment.clinic.name}</h3>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <p className="text-gray-600">{appointment.clinic.address}</p>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <p className="text-gray-600">{appointment.clinic.phone}</p>
                </div>
                <div className="pt-4">
                  <Button className="w-full">Get Directions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
