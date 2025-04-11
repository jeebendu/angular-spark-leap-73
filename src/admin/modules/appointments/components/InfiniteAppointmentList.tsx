
import React, { useState } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { Appointment } from '../types/appointment';
import { Card, CardContent } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Skeleton } from '../../../../components/ui/skeleton';
import { ScrollArea } from '../../../../components/ui/scroll-area';

interface InfiniteAppointmentListProps {
  appointments: Appointment[];
  isLoading: boolean;
  onAppointmentClick: (appointment: Appointment) => void;
  loadMore: () => void;
  hasMore: boolean;
}

const InfiniteAppointmentList: React.FC<InfiniteAppointmentListProps> = ({
  appointments,
  isLoading,
  onAppointmentClick,
  loadMore,
  hasMore,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment.id.toString());
    onAppointmentClick(appointment);
  };

  // Helper function to safely format dates
  const safeFormatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
      if (!isValid(date)) return 'Invalid date';
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Helper function to safely format times
  const safeFormatTime = (dateString: string | Date | null | undefined) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
      if (!isValid(date)) return 'Invalid time';
      return format(date, 'h:mm a');
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid time';
    }
  };

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'rescheduled':
        return 'bg-amber-500';
      case 'no-show':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  // Function to render each appointment card
  const renderAppointmentCard = (appointment: Appointment) => {
    return (
      <Card
        key={appointment.id.toString()}
        className={`mb-3 cursor-pointer hover:shadow-md transition-shadow ${
          selectedAppointment === appointment.id.toString() ? 'border-primary border-2' : ''
        }`}
        onClick={() => handleAppointmentClick(appointment)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">
                {appointment.patient?.firstname 
                  ? `${appointment.patient.firstname} ${appointment.patient.lastname || ''}`
                  : 'Unknown Patient'}
              </h3>
              <p className="text-sm text-gray-600">
                {appointment.doctor ? 
                  `${appointment.doctor.firstname || ''} ${appointment.doctor.lastname || ''}` : 
                  'Unknown Doctor'}
              </p>
              <div className="text-sm mt-2">
                <span>{safeFormatDate(appointment.appointmentDate)}</span>
                <span className="mx-1">•</span>
                <span>
                  {safeFormatTime(appointment.slot?.startTime)} - {safeFormatTime(appointment.slot?.endTime)}
                </span>
              </div>
            </div>
            <Badge className={`${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </Badge>
          </div>
          <p className="text-sm mt-2 text-gray-700 line-clamp-2">
            {appointment.slot?.slotType || 'No reason provided'}
          </p>
        </CardContent>
      </Card>
    );
  };

  // Function to render loading skeletons
  const renderSkeletons = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <Card key={`skeleton-${index}`} className="mb-3">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-3 w-32 mb-3" />
                <Skeleton className="h-3 w-56 mb-2" />
              </div>
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full mt-2" />
          </CardContent>
        </Card>
      ));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="font-semibold mb-3">Appointments</div>
      <ScrollArea className="flex-1 pr-3">
        {appointments.length > 0 && appointments.map(renderAppointmentCard)}
        {isLoading && renderSkeletons()}
        {!isLoading && appointments.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No appointments found
          </div>
        )}
      </ScrollArea>
      {hasMore && (
        <Button
          variant="outline"
          className="mt-3 w-full"
          onClick={loadMore}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </div>
  );
};

export default InfiniteAppointmentList;
