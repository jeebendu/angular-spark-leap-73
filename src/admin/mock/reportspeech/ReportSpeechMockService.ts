import { ReportSpeech } from "./ReportSpeech";
import { Patient } from "@/admin/types/patient";

/**
 * Generate mock ReportSpeech data for development
 */
export const ReportSpeechMockService = {
  generateMockReportSpeeches: (): ReportSpeech[] => {
    const mockReportSpeeches: ReportSpeech[] = [];

    for (let i = 1; i <= 100; i++) {
      const mockPatient: Patient = {
        id: i,
        uid: `UID${i}`,
        gender: i % 2 === 0 ? "Male" : "Female",
        dob: new Date(1990, i % 12, (i % 28) + 1),
        age: 2025 - 1990,
        address: `Address ${i}`,
        firstname: `FirstName${i}`,
        lastname: `LastName${i}`,
        refDoctor: {
          id: i,
          name: `Doctor ${i}`,
          email: `doctor${i}@example.com`,
          uid: `DOC${i}`,
          mobile: 1234567890 + i,
          desgination: "Specialist",
          specialization: "ENT",
          specializationList: [],
          qualification: "MBBS",
          joiningDate: new Date(2020, i % 12, (i % 28) + 1),
          user: {
            id: i,
            branch: {
              id: 1,
              name: "Branch 1",
              code: "BR1",
              location: "Location 1",
              active: true,
              state: null,
              district: null,
              country: null,
              city: "City 1",
              mapUrl: "",
              pincode: 12345,
              image: "",
              latitude: 0,
              longitude: 0,
            },
            name: `User ${i}`,
            username: `user${i}`,
            email: `user${i}@example.com`,
            phone: `+123456789${i}`,
            password: `password${i}`,
            effectiveTo: new Date(2025, i % 12, (i % 28) + 1),
            effectiveFrom: new Date(2024, i % 12, (i % 28) + 1),
            role: {
              id: 1,
              name: "Admin",
              permissions: [],
            },
            image: "",
          },
          status: "Active",
          external: false,
          external_temp: null,
          firstname: `DocFirstName${i}`, // Added firstname
          lastname: `DocLastName${i}`,   // Added lastname
        },
        whatsappNo: `+123456789${i}`,
        problem: `Problem ${i}`,
        consDoctorId: i % 10,
        remark: `Remark ${i}`,
        pastRemark: `Past Remark ${i}`,
        createdTime: new Date(),
        photoUrl: "",
        insuranceProvider: "Provider A",
        insurancePolicyNumber: `POLICY${i}`,
        fullName: `FirstName${i} LastName${i}`,
        lastVisit: new Date(2025, i % 12, (i % 28) + 1).toISOString(),
        medicalHistory: `Medical history for patient ${i}`,
      };

      const mockReportSpeech: ReportSpeech = {
        id: i,
        reportno: i,
        patient: mockPatient,
        createdTime: new Date(2025, i % 12, (i % 28) + 1).toISOString(),
        modifiedTime: new Date(2025, i % 12, (i % 28) + 2).toISOString(),
        hearingLoss: `Hearing Loss ${i}`,
        speechDiscrimination: `Speech Discrimination ${i}`,
        tympanometry: `Tympanometry ${i}`,
        acousticReflex: `Acoustic Reflex ${i}`,
        recommendations: `Recommendations ${i}`,
      };

      mockReportSpeeches.push(mockReportSpeech);
    }

    return mockReportSpeeches;
  },

  getMockReportSpeeches: (page: number, size: number, searchTerm?: string) => {
    const mockReportSpeeches = ReportSpeechMockService.generateMockReportSpeeches();

    // Apply search filter
    let filteredReportSpeeches = [...mockReportSpeeches];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredReportSpeeches = filteredReportSpeeches.filter(
        (reportSpeech) =>
          reportSpeech.patient.fullName?.toLowerCase().includes(term) ||
          reportSpeech.hearingLoss.toLowerCase().includes(term) ||
          reportSpeech.speechDiscrimination.toLowerCase().includes(term)
      );
    }

    // Paginate
    const startIndex = page * size;
    const paginatedReportSpeeches = filteredReportSpeeches.slice(startIndex, startIndex + size);

    return Promise.resolve({
      data: {
        content: paginatedReportSpeeches,
        totalElements: filteredReportSpeeches.length,
        totalPages: Math.ceil(filteredReportSpeeches.length / size),
        size: size,
        number: page,
        last: startIndex + size >= filteredReportSpeeches.length,
      },
    });
  },

  getMockReportSpeechById: (id: number): Promise<ReportSpeech> => {
    const mockReportSpeeches = ReportSpeechMockService.generateMockReportSpeeches();
    const reportSpeech = mockReportSpeeches.find((r) => r.id === id);

    if (!reportSpeech) {
      return Promise.reject(new Error("ReportSpeech not found"));
    }

    return Promise.resolve(reportSpeech);
  },
};
