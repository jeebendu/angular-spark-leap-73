
import React from "react";
import { StaffLayout } from "@/components/StaffLayout";
import { 
  BarChart3, 
  Users, 
  CalendarRange, 
  FileText,
  TrendingUp,
  Calendar,
  PlusCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleAddPatient = () => {
    navigate("/staff/add-patient");
  };

  return (
    <StaffLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Staff Dashboard</h1>
            <p className="text-gray-600">Welcome back, Reception Staff!</p>
          </div>
          <Button 
            onClick={handleAddPatient}
            className="bg-primary hover:bg-primary/90"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Today's Appointments</p>
                  <h3 className="text-3xl font-bold text-primary">12</h3>
                  <p className="text-xs text-muted-foreground mt-1">Next in 15 mins</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Patient Check-ins</p>
                  <h3 className="text-3xl font-bold text-amber-500">8</h3>
                  <p className="text-xs text-muted-foreground mt-1">Out of 12 appointments</p>
                </div>
                <div className="bg-amber-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">New Registrations</p>
                  <h3 className="text-3xl font-bold text-green-500">3</h3>
                  <p className="text-xs text-muted-foreground mt-1">Today</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {['AS', 'KJ', 'RP'][item - 1]}
                      </div>
                      <div>
                        <p className="font-medium">{['Adrian Smith', 'Kelly Johnson', 'Robert Parker'][item - 1]}</p>
                        <p className="text-sm text-muted-foreground">
                          {['Dr. Emily Johnson • 10:45 AM', 'Dr. Michael Chen • 11:50 AM', 'Dr. Sarah Williams • 1:30 PM'][item - 1]}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Check in</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleAddPatient}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Patient
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffDashboard;
