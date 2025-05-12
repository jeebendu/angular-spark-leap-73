
import { AppointmentBase, SlotBase } from '../models/appointment';
import { HttpClientInterface } from './HttpClient';

export interface AppointmentServiceInterface {
  getMyAppointments(status?: string): Promise<AppointmentBase[]>;
  bookAppointment(appointmentData: Partial<AppointmentBase>): Promise<AppointmentBase>;
  getAvailableSlots(doctorId: number, branchId: number, date: Date): Promise<SlotBase[]>;
  cancelAppointment(appointmentId: number): Promise<boolean>;
}

export class AppointmentService implements AppointmentServiceInterface {
  constructor(private httpClient: HttpClientInterface) {}

  async getMyAppointments(status?: string): Promise<AppointmentBase[]> {
    try {
      const params = status ? { status } : undefined;
      const response = await this.httpClient.get<{ data: AppointmentBase[] }>('/api/appointments/my', { params });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  }

  async bookAppointment(appointmentData: Partial<AppointmentBase>): Promise<AppointmentBase> {
    try {
      const response = await this.httpClient.post<AppointmentBase>('/api/appointments', appointmentData);
      return response;
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  }

  async getAvailableSlots(doctorId: number, branchId: number, date: Date): Promise<SlotBase[]> {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await this.httpClient.get<SlotBase[]>(`/api/slots`, {
        params: { doctorId, branchId, date: formattedDate }
      });
      return response || [];
    } catch (error) {
      console.error('Error getting available slots:', error);
      return [];
    }
  }

  async cancelAppointment(appointmentId: number): Promise<boolean> {
    try {
      await this.httpClient.put(`/api/appointments/${appointmentId}/cancel`);
      return true;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  }
}
