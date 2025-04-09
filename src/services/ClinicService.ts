
import apiService from './apiService';
import { Clinic } from '@/models/clinic/Clinic';

// Get all clinics with pagination
export const getAllClinics = async (page = 0, size = 10) => {
  return apiService.get<{
    content: Clinic[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }>(`/v1/public/clinics?page=${page}&size=${size}`);
};

// Get clinic by ID
export const getClinicById = async (id: string) => {
  return apiService.get<Clinic>(`/v1/public/clinics/${id}`);
};

// Get clinics by location or name
export const searchClinics = async (query: string, page = 0, size = 10) => {
  return apiService.get<{
    content: Clinic[];
    totalElements: number;
    totalPages: number;
  }>(`/v1/public/clinics/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`);
};

