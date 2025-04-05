
import { useState } from "react";
import { DoctorLayout } from "@/components/DoctorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarRange, Users, CalendarCheck, PieChart, ArrowUp, ArrowDown, Bell } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock data for charts
const appointmentsData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 18 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 20 },
  { name: "Fri", value: 25 },
  { name: "Sat", value: 14 },
  { name: "Sun", value: 8 },
];

const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5200 },
];

const patientDemographics = [
  { name: "0-18", male: 20, female: 25 },
  { name: "19-35", male: 35, female: 45 },
  { name: "36-50", male: 30, female: 35 },
  { name: "51-65", male: 25, female: 20 },
  { name: "65+", male: 15, female: 18 },
];

// Upcoming appointments data
const upcomingAppointments = [
  {
    id: 1,
    patient: "Sarah Johnson",
    time: "09:00 AM",
    date: "Today",
    status: "Confirmed",
    type: "Follow-up",
  },
  {
    id: 2,
    patient: "Michael Brown",
    time: "10:30 AM",
    date: "Today",
    status: "Confirmed",
    type: "New Patient",
  },
  {
    id: 3,
    patient: "Emily Davis",
    time: "01:15 PM",
    date: "Today",
    status: "Pending",
    type: "Consultation",
  },
  {
    id: 4,
    patient: "Robert Wilson",
    time: "03:00 PM",
    date: "Tomorrow",
    status: "Confirmed",
    type: "Follow-up",
  },
];

// Recent notifications
const notifications = [
  {
    id: 1,
    message: "New appointment scheduled with Sarah Johnson",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    message: "Test results uploaded for patient Michael Brown",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    message: "Reminder: Meeting with Dr. Rogers at 4:00 PM",
    time: "3 hours ago",
    read: true,
  },
];

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Dr. Emily Johnson</p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Bell className="h-4 w-4 mr-2" />
              <span>Notifications</span>
              <span className="ml-2 bg-white text-purple-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold">
                3
              </span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                  <h3 className="text-2xl font-bold mt-1">8</h3>
                  <p className="flex items-center text-xs text-green-600 mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>12% from yesterday</span>
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CalendarRange className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Patients</p>
                  <h3 className="text-2xl font-bold mt-1">1,256</h3>
                  <p className="flex items-center text-xs text-green-600 mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>8% from last month</span>
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed Appointments</p>
                  <h3 className="text-2xl font-bold mt-1">145</h3>
                  <p className="flex items-center text-xs text-green-600 mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>5% from last month</span>
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CalendarCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Revenue (MTD)</p>
                  <h3 className="text-2xl font-bold mt-1">₹85,400</h3>
                  <p className="flex items-center text-xs text-red-600 mt-1">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    <span>3% from last month</span>
                  </p>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Appointment Statistics</CardTitle>
                <Tabs defaultValue="week" className="w-[250px]" onValueChange={setSelectedPeriod}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={appointmentsData}>
                    <defs>
                      <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorAppointments)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Demographics and Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Patient Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={patientDemographics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="male" fill="#8884d8" name="Male" />
                    <Bar dataKey="female" fill="#82ca9d" name="Female" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="font-semibold text-purple-700">
                          {appointment.patient.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{appointment.time}</span>
                          <span className="mx-2">•</span>
                          <span>{appointment.date}</span>
                          <span className="mx-2">•</span>
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Notifications</CardTitle>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    !notification.read ? "bg-blue-50" : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      !notification.read
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        !notification.read ? "font-medium" : "text-gray-700"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  );
};

export default Dashboard;
