
import { useState } from 'react';
import { AppointmentBase, SlotBase } from '../models/appointment';
import { AppointmentServiceInterface } from '../services/AppointmentService';

// Platform-agnostic hook for appointment management
export const useAppointment = (appointmentService: AppointmentServiceInterface) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getMyAppointments = async (status?: string) => {
    setLoading(true);
    setError(null);
    try {
      const appointments = await appointmentService.getMyAppointments(status);
      setLoading(false);
      return appointments;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      return [];
    }
  };

  const bookAppointment = async (appointmentData: Partial<AppointmentBase>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await appointmentService.bookAppointment(appointmentData);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      throw err;
    }
  };

  const getAvailableSlots = async (doctorId: number, branchId: number, date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const slots = await appointmentService.getAvailableSlots(doctorId, branchId, date);
      setLoading(false);
      return slots;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      return [];
    }
  };

  const cancelAppointment = async (appointmentId: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await appointmentService.cancelAppointment(appointmentId);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    getMyAppointments,
    bookAppointment,
    getAvailableSlots,
    cancelAppointment
  };
};
