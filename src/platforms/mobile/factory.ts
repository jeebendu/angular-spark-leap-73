
import { HttpClientInterface } from '../../core/services/HttpClient';
import { MobileHttpClient } from './services/MobileHttpClient';
import { DoctorService } from '../../core/services/DoctorService';
import { AppointmentService } from '../../core/services/AppointmentService';

// Factory for creating mobile platform implementations
export const createHttpClient = (): HttpClientInterface => {
  return new MobileHttpClient();
};

export const createDoctorService = (): DoctorService => {
  return new DoctorService(createHttpClient());
};

export const createAppointmentService = (): AppointmentService => {
  return new AppointmentService(createHttpClient());
};
