
import React from "react";
import { AppointmentDetails } from "@/models/Appointment";
import { AppointmentListCard } from "./AppointmentListCard";
import { AppointmentGridCard } from "./AppointmentGridCard";
import { motion } from "framer-motion";

interface AppointmentRendererProps {
  appointments: AppointmentDetails[];
  viewMode: "list" | "grid";
  onStartAppointment?: (appointmentId: string) => void;
  onViewAppointment: (appointment: AppointmentDetails) => void;
}

export function AppointmentRenderer({ 
  appointments, 
  viewMode, 
  onStartAppointment,
  onViewAppointment
}: AppointmentRendererProps) {
  if (appointments.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-gray-50 rounded-lg"
      >
        <p className="text-gray-500">No appointments found.</p>
        <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search query.</p>
      </motion.div>
    );
  }
  
  return (
    <>
      {viewMode === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((appointment, index) => (
            <AppointmentListCard 
              key={appointment.id || index}
              appointment={appointment}
              onStartAppointment={onStartAppointment}
              onViewAppointment={onViewAppointment}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment, index) => (
            <AppointmentGridCard 
              key={appointment.id || index}
              appointment={appointment}
              onStartAppointment={onStartAppointment}
              onViewAppointment={onViewAppointment}
            />
          ))}
        </div>
      )}
    </>
  );
}
