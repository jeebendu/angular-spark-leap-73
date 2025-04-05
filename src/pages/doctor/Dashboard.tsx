
import React from "react";
import { DoctorLayout } from "@/components/DoctorLayout";
import { 
  BarChart3, 
  Users, 
  CalendarRange, 
  FileText,
  TrendingUp,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const DashboardPage = () => {
  return (
    <DoctorLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome back, Dr. Smith!</p>
          </div>
          <img 
            src="https://res.cloudinary.com/dzxuxfagt/image/upload/h_100/assets/logo.png" 
            alt="Clinic Hub" 
            className="h-10"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Today's Appointments</p>
                  <h3 className="text-3xl font-bold text-primary">8</h3>
                  <p className="text-xs text-muted-foreground mt-1">Next in 45 mins</p>
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
                  <p className="text-sm font-medium text-muted-foreground mb-1">Pending Reports</p>
                  <h3 className="text-3xl font-bold text-amber-500">3</h3>
                  <p className="text-xs text-muted-foreground mt-1">Due by end of day</p>
                </div>
                <div className="bg-amber-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Patient Messages</p>
                  <h3 className="text-3xl font-bold text-green-500">2</h3>
                  <p className="text-xs text-muted-foreground mt-1">New messages</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Patient Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">New Patients</span>
                  </div>
                  <span className="text-sm font-medium">24</span>
                </div>
                <Progress value={65} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Return Visits</span>
                  </div>
                  <span className="text-sm font-medium">42</span>
                </div>
                <Progress value={85} className="h-1.5 bg-amber-100" indicatorClassName="bg-amber-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Virtual Consultations</span>
                  </div>
                  <span className="text-sm font-medium">18</span>
                </div>
                <Progress value={35} className="h-1.5 bg-green-100" indicatorClassName="bg-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[220px] p-6">
              <div className="w-full h-full flex items-center justify-center">
                <BarChart3 className="h-32 w-full text-muted-foreground/70" />
                {/* This would be replaced with a real chart component in a production app */}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
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
                          {['Video Call • 10:45 AM', 'Audio Call • 11:50 AM', 'Direct Visit • 1:30 PM'][item - 1]}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-medium">At a Glance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <CalendarRange className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Weekly Appointments</p>
                    <p className="text-xl font-bold">32</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <Users className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Patients</p>
                    <p className="text-xl font-bold">248</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Visit Growth</p>
                    <p className="text-xl font-bold">+12%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DashboardPage;
