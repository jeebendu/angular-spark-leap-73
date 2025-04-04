
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Calendar, Users, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in as a doctor
    const user = authService.getCurrentUser();
    if (!user || user.userType !== "doctor") {
      navigate("/doctor/login");
      return;
    }
    
    setDoctorInfo(user);
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/doctor/login");
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, Dr. {doctorInfo?.name}</h1>
            <p className="text-gray-600">Manage your appointments and patient records</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold">12</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">3 new since yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">248</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">8 new this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Wait Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-2xl font-bold">18 min</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">2 min less than last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Reports Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-rose-500 mr-2" />
                <span className="text-2xl font-bold">7</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Due within 24 hours</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rahul Sharma</p>
                    <p className="text-sm text-gray-500">General Checkup • 10:00 AM</p>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium">Priya Patel</p>
                    <p className="text-sm text-gray-500">Follow-up • 11:30 AM</p>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium">Amit Kumar</p>
                    <p className="text-sm text-gray-500">Consultation • 12:45 PM</p>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium">Patient Query</p>
                  <p className="text-sm text-gray-500">Sunil Verma • 35 minutes ago</p>
                  <p className="text-sm mt-1">Doctor, I wanted to ask about the side effects...</p>
                </div>
                
                <div className="border-b pb-3">
                  <p className="font-medium">Lab Results</p>
                  <p className="text-sm text-gray-500">Lab Technician • 2 hours ago</p>
                  <p className="text-sm mt-1">The test results for Mrs. Mehra are ready...</p>
                </div>
                
                <div>
                  <p className="font-medium">Appointment Request</p>
                  <p className="text-sm text-gray-500">Reception • 3 hours ago</p>
                  <p className="text-sm mt-1">Emergency consultation requested by...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
