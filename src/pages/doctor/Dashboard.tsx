import React from "react";
import { DoctorLayout } from "@/components/DoctorLayout";

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
        
        {/* Dashboard content would go here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
            <p className="text-3xl font-bold text-primary">8</p>
            <p className="text-gray-600">Next appointment in 45 mins</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Pending Reports</h2>
            <p className="text-3xl font-bold text-amber-500">3</p>
            <p className="text-gray-600">Due by end of day</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Patient Messages</h2>
            <p className="text-3xl font-bold text-green-500">2</p>
            <p className="text-gray-600">New messages to respond</p>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DashboardPage;
