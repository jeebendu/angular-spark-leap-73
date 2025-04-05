
import { useState } from "react";
import { ProfileStep } from "./steps/ProfileStep";
import { MedicalRegistrationStep } from "./steps/MedicalRegistrationStep";
import { EducationStep } from "./steps/EducationStep";
import { PracticeStep } from "./steps/PracticeStep";
import { EstablishmentStep } from "./steps/EstablishmentStep";
import { MatchingProfilesStep } from "./steps/MatchingProfilesStep";
import { OnboardingProgress } from "./OnboardingProgress";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
    } else if (currentStep === totalSteps) {
      setShowSuccess(true);
      toast({
        title: "Profile Submitted",
        description: "Your profile has been submitted for admin approval."
      });
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
  
  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/doctor");
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
            onComplete={handleNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
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
      
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
              Profile Submitted Successfully
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Your profile has been submitted for admin approval. We will review your details and get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={handleSuccessClose}
            >
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
