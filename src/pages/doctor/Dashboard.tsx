
import { DoctorLayout } from "@/components/DoctorLayout";

const DashboardPage = () => {
  return (
    <DoctorLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <h3 className="font-medium text-gray-600">Total Appointments</h3>
            <div className="flex justify-between items-end mt-2">
              <span className="text-3xl font-bold">124</span>
              <span className="text-green-600 text-sm">+12% this week</span>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <h3 className="font-medium text-gray-600">Today's Appointments</h3>
            <div className="flex justify-between items-end mt-2">
              <span className="text-3xl font-bold">8</span>
              <span className="text-primary font-medium text-sm">4 pending</span>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <h3 className="font-medium text-gray-600">Total Revenue</h3>
            <div className="flex justify-between items-end mt-2">
              <span className="text-3xl font-bold">$8,540</span>
              <span className="text-green-600 text-sm">+5% this month</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Recent Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Patient</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Date & Time</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Adrian Smith</td>
                  <td className="py-3 px-4">16 Nov, 10:45 AM</td>
                  <td className="py-3 px-4">Video Call</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">Upcoming</span></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Kelly Johnson</td>
                  <td className="py-3 px-4">15 Nov, 11:50 AM</td>
                  <td className="py-3 px-4">Audio Call</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">Upcoming</span></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Samuel Wilson</td>
                  <td className="py-3 px-4">14 Nov, 09:30 AM</td>
                  <td className="py-3 px-4">Video Call</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs">Completed</span></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Catherine Lee</td>
                  <td className="py-3 px-4">13 Nov, 12:20 PM</td>
                  <td className="py-3 px-4">Direct Visit</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs">Cancelled</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DashboardPage;
