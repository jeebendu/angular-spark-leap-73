
import React, { createContext, useContext, ReactNode } from 'react';
import { DoctorServiceInterface } from '../services/DoctorService';
import { AppointmentServiceInterface } from '../services/AppointmentService';

// Define the context shape
interface ServicesContextType {
  doctorService: DoctorServiceInterface;
  appointmentService: AppointmentServiceInterface;
}

// Create the context with a default value that will be overridden
const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

// Props for the provider component
interface ServicesProviderProps {
  children: ReactNode;
  doctorService: DoctorServiceInterface;
  appointmentService: AppointmentServiceInterface;
}

// Provider component to wrap your application
export const ServicesProvider: React.FC<ServicesProviderProps> = ({ 
  children, 
  doctorService, 
  appointmentService 
}) => {
  return (
    <ServicesContext.Provider value={{ doctorService, appointmentService }}>
      {children}
    </ServicesContext.Provider>
  );
};

// Custom hook for accessing services
export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
