
import React, { useRef, useCallback } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, HospitalIcon, Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfiniteAppointmentListProps {
  appointments: any[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  onAppointmentClick: (appointment: any) => void;
  onStartAppointment: (appointment: any) => void;
}

const InfiniteAppointmentList: React.FC<InfiniteAppointmentListProps> = ({
  appointments,
  loading,
  hasMore,
  loadMore,
  onAppointmentClick,
  onStartAppointment
}) => {
  // Last appointment element ref for intersection observer
  const observer = useRef<IntersectionObserver>();
  
  // Callback ref function to observe the last appointment element
  const lastAppointmentRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    // Disconnect the previous observer
    if (observer.current) observer.current.disconnect();
    
    // Create a new observer
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    // Observe the node if it exists
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800 p-2";
      case "completed": return "bg-green-100 text-green-800 p-2";
      case "cancelled": return "bg-red-100 text-red-800 p-2";
      case "new": return "bg-purple-100 text-purple-800 p-2";
      default: return "bg-gray-100 text-gray-800 p-2";
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {appointments.length === 0 && !loading ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">No appointments found</p>
        </div>
      ) : (
        appointments.map((appointment, index) => {
          const isLastElement = index === appointments.length - 1;
          
          return (
            <div 
              key={appointment.id} 
              ref={isLastElement ? lastAppointmentRef : undefined}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="p-5">
                <div className="flex justify-between flex-wrap gap-2">
                  <div className="flex items-start">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                      appointment.patient.gender === "Female" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                    )}>
                      {appointment.patient.gender === "Female" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-lg font-medium">{appointment.patient.firstname} {appointment.patient.lastname}</h2>
                        <span className="text-gray-500 text-sm"># AP0934M8</span>
                        <span className="text-gray-500 text-sm">{appointment.patient.age} yrs • {appointment.patient.gender}</span>
                        <span className="text-amber-600 font-medium">₹ 200</span>
                      </div>
                      <div className="flex items-center mt-2 gap-4 flex-wrap">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {appointment?.slot?.date ? format(new Date(appointment.slot.date), "EEEE, MMMM d, yyyy") : "Date not available"}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment?.slot?.startTime ? format(new Date(`1970-01-01T${appointment?.slot?.startTime}`), "hh:mm a") : "Time not available"}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <HospitalIcon className="h-4 w-4 mr-1" />
                          {appointment?.doctorClinic?.clinic?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge className={getStatusBadgeStyle(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full" 
                      onClick={() => onAppointmentClick(appointment)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      className="rounded-full bg-primary hover:bg-primary/90"
                      onClick={() => onStartAppointment(appointment)}
                    >
                      Start Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Mail className="h-4 w-4 mr-2" />
                    {appointment.patient.user.email ? appointment.patient.user.email : "N/A"}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Phone className="h-4 w-4 mr-2" />
                    {appointment.patient.user.phone ? appointment.patient.user.phone : "N/A"}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {appointment.patient.city},{appointment.patient.address},
                    {appointment.patient?.district ? appointment.patient?.district?.name : ""},
                    {appointment.patient?.state ? appointment.patient?.state?.name : ""},
                    {appointment.patient?.country ? appointment.patient?.country?.name : ""}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      
      {loading && (
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <div className="animate-pulse flex justify-center">
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteAppointmentList;
