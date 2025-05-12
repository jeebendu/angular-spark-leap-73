
import { DoctorBase, DoctorSearchParams } from '../models/doctor';
import { HttpClientInterface } from './HttpClient';

// Interface defining doctor service capabilities
export interface DoctorServiceInterface {
  searchDoctors(params: DoctorSearchParams): Promise<{ doctors: DoctorBase[], totalCount: number }>;
  getDoctorById(id: number): Promise<DoctorBase>;
  getDoctorAvailability(doctorId: number, date: Date): Promise<any>;
}

// Platform-agnostic implementation that relies on injected HTTP client
export class DoctorService implements DoctorServiceInterface {
  constructor(private httpClient: HttpClientInterface) {}

  async searchDoctors(params: DoctorSearchParams): Promise<{ doctors: DoctorBase[], totalCount: number }> {
    try {
      const response = await this.httpClient.get<any>('/api/doctors', { params });
      return {
        doctors: response.data || [],
        totalCount: response.totalElements || 0
      };
    } catch (error) {
      console.error('Error searching doctors:', error);
      return { doctors: [], totalCount: 0 };
    }
  }

  async getDoctorById(id: number): Promise<DoctorBase> {
    try {
      const response = await this.httpClient.get<DoctorBase>(`/api/doctors/${id}`);
      return response;
    } catch (error) {
      console.error(`Error getting doctor ${id}:`, error);
      throw error;
    }
  }

  async getDoctorAvailability(doctorId: number, date: Date): Promise<any> {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await this.httpClient.get(`/api/doctors/${doctorId}/availability`, {
        params: { date: formattedDate }
      });
      return response;
    } catch (error) {
      console.error('Error getting doctor availability:', error);
      throw error;
    }
  }
}
