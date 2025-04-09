
import React from "react";
import AdminLayout from "@/admin/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

const Schedule = () => {
  return (
    <AdminLayout>
      <div className="sticky-header">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Schedule</h1>
          <div className="flex items-center space-x-2">
            <Button className="rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">New Event</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <CalendarIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Calendar View Coming Soon</h3>
          <p className="text-gray-500 mb-4">The scheduling calendar feature is under development.</p>
          <Button className="rounded-full">Request Early Access</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Schedule;
