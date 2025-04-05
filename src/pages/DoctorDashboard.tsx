
import React, { useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const { auth, isDoctor } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/doctor/login");
      return;
    }

    if (!isDoctor) {
      navigate("/dashboard");
      return;
    }
  }, [auth.isAuthenticated, isDoctor, navigate]);

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Today's Appointments</h2>
            <p className="text-3xl font-bold text-primary">8</p>
            <p className="text-sm text-gray-500 mt-2">2 more than yesterday</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Upcoming Consultations</h2>
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-sm text-gray-500 mt-2">For next 7 days</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Patient Reviews</h2>
            <p className="text-3xl font-bold text-primary">4.8</p>
            <p className="text-sm text-gray-500 mt-2">Based on 124 reviews</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">General Checkup</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">10:00 AM</p>
                  <p className="text-sm text-gray-500">30 min</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-sm text-gray-500">Follow-up</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">11:30 AM</p>
                  <p className="text-sm text-gray-500">30 min</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Mike Johnson</p>
                  <p className="text-sm text-gray-500">Consultation</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">2:00 PM</p>
                  <p className="text-sm text-gray-500">45 min</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Patients</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-medium text-primary">RS</span>
                </div>
                <div>
                  <p className="font-medium">Robert Smith</p>
                  <p className="text-sm text-gray-500">Last Visit: Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="font-medium text-green-600">KJ</span>
                </div>
                <div>
                  <p className="font-medium">Karen Johnson</p>
                  <p className="text-sm text-gray-500">Last Visit: 3 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="font-medium text-purple-600">DM</span>
                </div>
                <div>
                  <p className="font-medium">David Miller</p>
                  <p className="text-sm text-gray-500">Last Visit: 5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
