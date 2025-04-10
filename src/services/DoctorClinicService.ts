
import http from "@/lib/JwtInterceptor";
import { DoctorSearchForm } from "@/models/doctor/Doctor";
import { isProduction } from "@/utils/envUtils";

export const searchDoctorClinics = async (searchCriteria: DoctorSearchForm, page: number = 0, size: number = 10) => {
  if (isProduction()) {
    return await http.post(`/v1/public/doctor/search?page=${page}&size=${size}`, searchCriteria);
  } else {
    // Generate mock doctor data
    return getMockDoctors(searchCriteria, page, size);
  }
};

export const getDoctorClinicDRAndBranchId = async (doctorId: number, branchId: number) => {
  if (isProduction()) {
    return await http.get(`/v1/public/doctor/doctor-clinic/doctor/${doctorId}/branch/${branchId}`);
  } else {
    // Return mock doctor clinic data
    return Promise.resolve({
      data: {
        id: 1,
        doctor: {
          id: doctorId,
          firstname: "Dr. John",
          lastname: "Smith",
          specialization: "Cardiology"
        },
        clinic: {
          id: 1,
          name: "Main Clinic",
          address: "123 Main St"
        }
      }
    });
  }
};

/**
 * Generate mock doctors data for development
 */
const getMockDoctors = (searchCriteria: DoctorSearchForm, page: number, size: number) => {
  // Generate mock doctors
  const mockDoctors = [];
  const specialties = ["Cardiology", "Neurology", "Pediatrics", "Dermatology", "Orthopedics", "Gynecology"];
  const languages = ["English", "Spanish", "Hindi", "French", "German"];
  
  for (let i = 0; i < 50; i++) {
    const doctorSpecialty = specialties[Math.floor(Math.random() * specialties.length)];
    const doctorLanguages = [
      languages[Math.floor(Math.random() * languages.length)],
      languages[Math.floor(Math.random() * languages.length)]
    ].filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
    
    mockDoctors.push({
      id: i + 1,
      firstname: `Dr. ${String.fromCharCode(65 + i % 26)}`,
      lastname: `${String.fromCharCode(65 + (i + 10) % 26)}${String.fromCharCode(97 + i % 26)}${String.fromCharCode(97 + (i + 5) % 26)}`,
      gender: i % 3 === 0 ? "Male" : "Female",
      qualification: "MD",
      specialization: doctorSpecialty,
      experience: 5 + (i % 20),
      rating: (3 + Math.random() * 2).toFixed(1),
      languages: doctorLanguages,
      consultationFee: 500 + (i * 100 % 1500),
      aboutDoctor: `Experienced ${doctorSpecialty} specialist with focus on patient care.`,
      profileImageUrl: `https://i.pravatar.cc/150?img=${(i % 70)}`,
      branch: {
        name: `Clinic ${i % 5 + 1}`,
        address: `Address ${i % 5 + 1}, City`,
        city: `City ${i % 3 + 1}`
      }
    });
  }
  
  // Apply filters from search criteria
  let filteredDoctors = [...mockDoctors];
  
  // Filter by doctor name
  if (searchCriteria.doctorName) {
    const name = searchCriteria.doctorName.toLowerCase();
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.firstname.toLowerCase().includes(name) || 
      doctor.lastname.toLowerCase().includes(name)
    );
  }
  
  // Filter by specialty
  if (searchCriteria.specialtyNames && searchCriteria.specialtyNames.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      searchCriteria.specialtyNames.includes(doctor.specialization)
    );
  }
  
  // Filter by gender
  if (searchCriteria.gender !== undefined) {
    const genderMap = { 1: "Male", 2: "Female" };
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.gender === genderMap[searchCriteria.gender]
    );
  }
  
  // Filter by languages
  if (searchCriteria.languageNames && searchCriteria.languageNames.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.languages.some(lang => searchCriteria.languageNames.includes(lang))
    );
  }
  
  // Sort by ratings or other criteria
  if (searchCriteria.sortBy) {
    filteredDoctors.sort((a, b) => {
      if (searchCriteria.sortBy === "rating") {
        return searchCriteria.sortDirection === "DESC" 
          ? parseFloat(b.rating) - parseFloat(a.rating)
          : parseFloat(a.rating) - parseFloat(b.rating);
      }
      return 0;
    });
  }
  
  // Paginate the results
  const startIndex = page * size;
  const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + size);
  
  // Return in the format expected by the application
  return Promise.resolve({
    data: {
      content: paginatedDoctors,
      totalElements: filteredDoctors.length,
      totalPages: Math.ceil(filteredDoctors.length / size),
      size: size,
      number: page,
      last: startIndex + size >= filteredDoctors.length
    }
  });
};
