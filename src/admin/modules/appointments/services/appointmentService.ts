
import http from "@/lib/JwtInterceptor";
import { AllAppointment } from "@/admin/types/allappointment";
import { addDays, subDays, format } from "date-fns";
import { isProduction } from "@/utils/envUtils";

export interface AppointmentQueryParams {
  page: number;
  size: number;
  doctorId?: number;
  status?: string;
  fromDate?: string;
  toDate?: string;
  searchTerm?: String;
  branches: Number[];
  statuses: String[];
}

/**
 * Fetches appointments by doctor ID with pagination support
 */
export const fetchAppointmentsByDoctorId = async (params: AppointmentQueryParams) => {
  if (isProduction()) {
    const { doctorId, page, size, status, fromDate, toDate, branches, statuses, searchTerm } = params;
    let url = `v1/appointments/doctor/${doctorId}?page=${page}&size=${size}`;
    
    if (status) url += `&status=${status}`;
    if (fromDate) url += `&fromDate=${fromDate}`;
    if (toDate) url += `&toDate=${toDate}`;
    
    const filter = {
      branches: branches,
      statuses: statuses,
      searchTerm: searchTerm
    };

    return await http.post(url, filter);
  } else {
    // Generate mock data
    return getMockAppointments(params);
  }
};

/**
 * Fetches all appointments with pagination support
 */
export const fetchAllAppointments = async (params: AppointmentQueryParams) => {
  if (isProduction()) {
    const { page, size, status, fromDate, toDate } = params;
    let url = `v1/appointments?page=${page}&size=${size}`;
    
    if (status) url += `&status=${status}`;
    if (fromDate) url += `&fromDate=${fromDate}`;
    if (toDate) url += `&toDate=${toDate}`;
    
    return await http.get(url);
  } else {
    // Generate mock data
    return getMockAppointments(params);
  }
};

/**
 * Generate mock appointments data for development
 */
const getMockAppointments = (params: AppointmentQueryParams) => {
  const { page, size, statuses, fromDate, toDate, searchTerm } = params;
  
  // Generate mock data
  const mockAppointments: AllAppointment[] = [];
  const today = new Date();
  
  // Generate 50 appointments
  for (let i = 0; i < 100; i++) {
    const appointmentDate = addDays(subDays(today, 15), i);
    const statusOptions = ["UPCOMING", "COMPLETED", "CANCELLED", "IN_PROGRESS"];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const patientNames = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis"];
    const patientName = patientNames[Math.floor(Math.random() * patientNames.length)];
    
    const mockAppointment: AllAppointment = {
      id: i + 1,
      isAccept: true,
      status: status,
      patient: {
        id: 100 + i,
        uid: `PT${1000 + i}`,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        dob: new Date(1980 + (i % 30), i % 12, (i % 28) + 1),
        age: 30 + (i % 30),
        address: `Address ${i}`,
        whatsappNo: `+919876${543210 + i}`,
        firstname: patientName.split(' ')[0],
        lastname: patientName.split(' ')[1],
        user: {
          id: 100 + i,
          name: patientName,
          email: `${patientName.split(' ')[0].toLowerCase()}@example.com`,
          phone: `+919876${543210 + i}`,
          branch:null,
          username:null,
          password:null,
          role: null,
        },
        refDoctor: null
      },
      doctor: {
        id: 1,
        name: "Gregory House",
        email: "house@clinic.com",
        uid: `DR${1000 + i}`,
        mobile: 1234567890,
        desgination: "Chief of Diagnostic Medicine",
        specialization: "Diagnostic Medicine",
        specializationList: [],
        qualification: "MD",
        joiningDate: new Date("2020-01-01"),
        user: null,
        status: "ACTIVE",
        external: false,
        external_temp: null
      },
      slot: {
        id: 200 + i,
        startTime: "17:01:28",
        endTime: "17:11:28",
        // startTime: appointmentDate,
        // endTime: addDays(appointmentDate, 1),
        status: "AVAILABLE",
        doctor: null,
        branch: {
          id: 1,
          name: `Branch ${i % 3 + 1}`,
          code: `BR${i % 3 + 1}`,
          location: `Location ${i % 3 + 1}`,
          active: true,
          state: null,
          district: null,
          country: null,
          city: `City ${i % 3 + 1}`,
          mapUrl: "",
          pincode: 12345,
          image: "",
          latitude: 0,
          longitude: 0
        },
        availableSlots: 5,
        date: appointmentDate,
        duration: 30,
        slotType: "REGULAR"
      },
      familyMember: null,
      doctorClinic: {
        id: 1,
        doctor: null,
        clinic: null
      }
    };
    
    mockAppointments.push(mockAppointment);
  }
  
  // Apply filters
  let filteredAppointments = [...mockAppointments];
  
  // Apply status filter
  if (statuses && statuses.length > 0) {
    filteredAppointments = filteredAppointments.filter(app => 
      statuses.includes(app.status)
    );
  }
  
  // Apply date range filter
  if (fromDate && toDate) {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    
    filteredAppointments = filteredAppointments.filter(app => {
      const appDate = new Date(app.slot.date);
      return appDate >= fromDateObj && appDate <= toDateObj;
    });
  }
  
  // Apply search term filter
  if (searchTerm) {
    const term = searchTerm.toString().toLowerCase();
    filteredAppointments = filteredAppointments.filter(app => 
      app.patient.firstname.toLowerCase().includes(term) || 
      app.patient.lastname.toLowerCase().includes(term)
    );
  }
  
  // Paginate
  const startIndex = page * size;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + size);
  
  return Promise.resolve({
    data: {
      content: paginatedAppointments,
      totalElements: filteredAppointments.length,
      totalPages: Math.ceil(filteredAppointments.length / size),
      size: size,
      number: page,
      last: startIndex + size >= filteredAppointments.length
    }
  });
};
