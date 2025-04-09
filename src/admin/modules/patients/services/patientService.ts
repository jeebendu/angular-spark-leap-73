
import { Patient } from '@/admin/types/patient';
import apiService from '@/services/apiService';
import { AxiosResponse } from 'axios';

export interface PatientQueryParams {
  page: number;
  size: number;
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  gender?: string[];
  ageGroup?: string[];
  lastVisit?: string[];
  insuranceProvider?: string[];
}

export interface PatientResponse {
  content: Patient[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const fetchPatients = async (params: PatientQueryParams): Promise<AxiosResponse<PatientResponse>> => {
  // In a real application, we would construct the query parameters properly
  // For now, we'll return mock data for demonstration
  
  // This is where we would normally call the API
  // return apiService.get<PatientResponse>('/api/patients', { params });
  
  // Mock implementation for demonstration
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockPatients: Patient[] = [];
      const startIndex = params.page * params.size;
      const endIndex = startIndex + params.size;
      
      // Generate mock data
      for (let i = startIndex; i < endIndex && i < 100; i++) {
        const gender = i % 3 === 0 ? "Male" : (i % 3 === 1 ? "Female" : "Other");
        const now = new Date();
        const lastVisitDate = new Date(now.setDate(now.getDate() - (i % 30)));
        
        mockPatients.push({
          id: `PID${1000 + i}`,
          patientId: `PATIENT-${1000 + i}`,
          firstName: `First${i}`,
          lastName: `Last${i}`,
          fullName: `First${i} Last${i}`,
          dateOfBirth: new Date(1980 + (i % 40), i % 12, (i % 28) + 1).toISOString().split('T')[0],
          age: 30 + (i % 40),
          gender: gender,
          contactNumber: `+1-555-${100 + i}`,
          email: `patient${i}@example.com`,
          address: `${100 + i} Main St, City${i}, State`,
          lastVisit: lastVisitDate.toISOString().split('T')[0],
          insuranceProvider: i % 5 === 0 ? 'Medicare' : (i % 5 === 1 ? 'BlueCross' : (i % 5 === 2 ? 'Aetna' : (i % 5 === 3 ? 'UnitedHealth' : 'Cigna'))),
          insurancePolicyNumber: `POL-${10000 + i}`,
          medicalHistory: i % 3 === 0 ? 'Hypertension, Diabetes' : (i % 3 === 1 ? 'Asthma' : 'No significant history'),
          emergencyContact: {
            name: `Emergency${i}`,
            relationship: i % 2 === 0 ? 'Spouse' : 'Parent',
            phone: `+1-555-${200 + i}`
          },
          photoUrl: i % 10 === 0 ? 'https://i.pravatar.cc/150?img=' + (i % 70) : undefined,
          createdAt: new Date(2020 + (i % 3), i % 12, (i % 28) + 1).toISOString()
        });
      }
      
      // Apply search filter if provided
      let filteredPatients = [...mockPatients];
      if (params.searchTerm) {
        const searchTerm = params.searchTerm.toLowerCase();
        filteredPatients = filteredPatients.filter(patient => 
          patient.fullName.toLowerCase().includes(searchTerm) || 
          patient.email.toLowerCase().includes(searchTerm) ||
          patient.patientId?.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply gender filter if provided
      if (params.gender && params.gender.length > 0) {
        filteredPatients = filteredPatients.filter(patient => 
          params.gender?.includes(patient.gender)
        );
      }
      
      // Apply insurance provider filter if provided
      if (params.insuranceProvider && params.insuranceProvider.length > 0) {
        filteredPatients = filteredPatients.filter(patient => 
          patient.insuranceProvider && params.insuranceProvider?.includes(patient.insuranceProvider)
        );
      }
      
      // Sort the results if sortBy is provided
      if (params.sortBy) {
        filteredPatients.sort((a: any, b: any) => {
          const aValue = a[params.sortBy as keyof Patient];
          const bValue = b[params.sortBy as keyof Patient];
          
          if (aValue < bValue) {
            return params.sortDirection === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return params.sortDirection === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }
      
      resolve({
        data: {
          content: filteredPatients,
          totalElements: 100,
          totalPages: Math.ceil(100 / params.size),
          size: params.size,
          number: params.page
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      });
    }, 500);
  });
};

export const fetchPatientById = async (id: string): Promise<AxiosResponse<Patient>> => {
  // In a real application, we would call the API
  // return apiService.get<Patient>(`/api/patients/${id}`);
  
  // Mock implementation for demonstration
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockPatient: Patient = {
        id: id,
        patientId: `PATIENT-${id}`,
        firstName: `First${id}`,
        lastName: `Last${id}`,
        fullName: `First${id} Last${id}`,
        dateOfBirth: new Date(1980, 5, 15).toISOString().split('T')[0],
        age: 40,
        gender: "Male",
        contactNumber: `+1-555-${id}`,
        email: `patient${id}@example.com`,
        address: `${id} Main St, City, State`,
        lastVisit: new Date(2023, 3, 10).toISOString().split('T')[0],
        insuranceProvider: 'BlueCross',
        insurancePolicyNumber: `POL-${id}`,
        medicalHistory: 'Hypertension, Diabetes',
        emergencyContact: {
          name: `Emergency Contact`,
          relationship: 'Spouse',
          phone: `+1-555-${parseInt(id) + 100}`
        },
        photoUrl: 'https://i.pravatar.cc/150?img=' + (parseInt(id) % 70),
        createdAt: new Date(2020, 1, 1).toISOString()
      };
      
      resolve({
        data: mockPatient,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      });
    }, 300);
  });
};
