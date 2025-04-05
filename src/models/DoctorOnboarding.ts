
export interface DoctorProfileData {
  name: string;
  specialization: string;
  gender: string;
  city: string;
}

export interface MedicalRegistrationData {
  registrationNumber: string;
  registrationCouncil: string;
  registrationYear: string;
}

export interface EducationData {
  degree: string;
  college: string;
  completionYear: string;
  yearsOfExperience: string;
}

export interface PracticeData {
  type: string;
}

export interface EstablishmentData {
  name: string;
  city: string;
  locality: string;
}

export interface DoctorOnboardingData {
  profile: DoctorProfileData;
  medicalRegistration: MedicalRegistrationData;
  education: EducationData;
  practice: PracticeData;
  establishment: EstablishmentData;
}
