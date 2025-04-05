
import { useState } from "react";
import { ProfileStep } from "./steps/ProfileStep";
import { MedicalRegistrationStep } from "./steps/MedicalRegistrationStep";
import { EducationStep } from "./steps/EducationStep";
import { PracticeStep } from "./steps/PracticeStep";
import { EstablishmentStep } from "./steps/EstablishmentStep";
import { MatchingProfilesStep } from "./steps/MatchingProfilesStep";
import { OnboardingProgress } from "./OnboardingProgress";
import { motion } from "framer-motion";

export const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    profile: {
      name: "",
      specialization: "",
      gender: "",
      city: ""
    },
    medicalRegistration: {
      registrationNumber: "",
      registrationCouncil: "",
      registrationYear: ""
    },
    education: {
      degree: "",
      college: "",
      completionYear: "",
      yearsOfExperience: ""
    },
    practice: {
      type: ""
    },
    establishment: {
      name: "",
      city: "",
      locality: ""
    }
  });

  const totalSteps = 6;
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const updateFormData = (step: string, data: any) => {
    setFormData({
      ...formData,
      [step]: {
        ...formData[step as keyof typeof formData],
        ...data
      }
    });
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <ProfileStep 
            data={formData.profile}
            onUpdate={(data) => updateFormData("profile", data)}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <MedicalRegistrationStep
            data={formData.medicalRegistration}
            onUpdate={(data) => updateFormData("medicalRegistration", data)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <EducationStep
            data={formData.education}
            onUpdate={(data) => updateFormData("education", data)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <PracticeStep
            data={formData.practice}
            onUpdate={(data) => updateFormData("practice", data)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <EstablishmentStep
            data={formData.establishment}
            onUpdate={(data) => updateFormData("establishment", data)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <MatchingProfilesStep
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </div>
  );
};
