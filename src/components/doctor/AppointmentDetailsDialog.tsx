
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Mail, User, ChevronRight } from "lucide-react";
import { AppointmentDetails } from "@/models/appointment/Appointment";
import { format } from "date-fns";

interface AppointmentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: AppointmentDetails | null;
  onStartAppointment?: (appointmentId: string) => void;
}

export function AppointmentDetailsDialog({
  open,
  onOpenChange,
  appointment,
  onStartAppointment
}: AppointmentDetailsDialogProps) {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Patient Header Section */}
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
              {appointment.patientName?.charAt(0) || "P"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{appointment.patientName}</h2>
                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                  {appointment.appointmentNumber}
                </span>
                {appointment.isNew && (
                  <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded">New</span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 mt-1">
                {appointment.age && appointment.gender && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{appointment.age} Years • {appointment.gender}</span>
                  </div>
                )}
                {appointment.phone && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{appointment.phone}</span>
                  </div>
                )}
                {appointment.email && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{appointment.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Appointment Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Appointment Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Date & Time</span>
                    <span className="text-sm font-medium">
                      {appointment.selectedDate && format(new Date(appointment.selectedDate), "dd MMM yyyy")} • {appointment.selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Visit Type</span>
                    <span className="text-sm font-medium">{appointment.visitType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`text-sm font-medium ${
                      appointment.status === "upcoming" ? "text-blue-600" :
                      appointment.status === "completed" ? "text-green-600" :
                      "text-red-600"
                    }`}>
                      {appointment.status && appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  {appointment.consultationFee && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Consultation Fee</span>
                      <span className="text-sm font-medium">${appointment.consultationFee}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Clinic Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Clinic Name</span>
                    <span className="text-sm font-medium">{appointment.selectedClinic.name}</span>
                  </div>
                  {appointment.selectedClinic.address && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Address</span>
                      <span className="text-sm font-medium">{appointment.selectedClinic.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Visit History</h3>
                <div className="space-y-2">
                  {appointment.lastVisitDate && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Visit</span>
                      <span className="text-sm font-medium">{appointment.lastVisitDate}</span>
                    </div>
                  )}
                  {appointment.nextVisitDate && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Next Visit</span>
                      <span className="text-sm font-medium">{appointment.nextVisitDate}</span>
                    </div>
                  )}
                  {!appointment.lastVisitDate && (
                    <div className="text-sm font-medium text-purple-600">First Visit</div>
                  )}
                </div>
              </div>
              
              {appointment.vitalSigns && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Patient Vitals</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {appointment.vitalSigns.temperature && (
                      <div>
                        <span className="text-xs text-gray-500 block">Temperature</span>
                        <span className="text-sm font-medium">{appointment.vitalSigns.temperature}</span>
                      </div>
                    )}
                    {appointment.vitalSigns.pulse && (
                      <div>
                        <span className="text-xs text-gray-500 block">Pulse</span>
                        <span className="text-sm font-medium">{appointment.vitalSigns.pulse}</span>
                      </div>
                    )}
                    {appointment.vitalSigns.respiratoryRate && (
                      <div>
                        <span className="text-xs text-gray-500 block">Respiratory Rate</span>
                        <span className="text-sm font-medium">{appointment.vitalSigns.respiratoryRate}</span>
                      </div>
                    )}
                    {appointment.vitalSigns.spo2 && (
                      <div>
                        <span className="text-xs text-gray-500 block">SPO2</span>
                        <span className="text-sm font-medium">{appointment.vitalSigns.spo2}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {appointment.status === "upcoming" && (
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  onOpenChange(false);
                  appointment.id && onStartAppointment && onStartAppointment(appointment.id);
                }}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                Start Appointment
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
