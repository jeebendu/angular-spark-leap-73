
import { HttpClientInterface } from '../../core/services/HttpClient';
import { WebHttpClient } from './services/WebHttpClient';
import { DoctorService } from '../../core/services/DoctorService';
import { AppointmentService } from '../../core/services/AppointmentService';

// Factory for creating web platform implementations
export const createHttpClient = (): HttpClientInterface => {
  return new WebHttpClient();
};

export const createDoctorService = (): DoctorService => {
  return new DoctorService(createHttpClient());
};

export const createAppointmentService = (): AppointmentService => {
  return new AppointmentService(createHttpClient());
};
