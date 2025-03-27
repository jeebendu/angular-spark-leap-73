
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Import the refactored components
import { StepIndicator } from "@/components/appointment/StepIndicator";
import { StepLabels } from "@/components/appointment/StepLabels";
import { ClinicSelectionStep } from "@/components/appointment/steps/ClinicSelectionStep";
import { DateTimeSelectionStep } from "@/components/appointment/steps/DateTimeSelectionStep";
import { PatientSelectionStep } from "@/components/appointment/steps/PatientSelectionStep";
import { ReviewStep } from "@/components/appointment/steps/ReviewStep";
import { PaymentStep } from "@/components/appointment/steps/PaymentStep";
import { NavigationButtons } from "@/components/appointment/NavigationButtons";

interface BookAppointmentModalProps {
  doctorName?: string;
  specialty?: string;
  trigger: React.ReactNode;
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

export function BookAppointmentModal({ doctorName, specialty, trigger }: BookAppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedMember, setSelectedMember] = useState("self");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { toast } = useToast();
  
  // Mock data for family members
  const familyMembers: FamilyMember[] = [
    { id: "1", name: "Sarah Smith", relationship: "Spouse" },
    { id: "2", name: "Alex Smith", relationship: "Child" },
    { id: "3", name: "Jane Smith", relationship: "Parent" }
  ];
  
  // Mock data for clinics
  const clinics = [
    { id: "1", name: "HealthFirst Clinic, Indiranagar", address: "100 Main St, Indiranagar, Bangalore" },
    { id: "2", name: "MediCare Center, Koramangala", address: "200 Park Ave, Koramangala, Bangalore" },
    { id: "3", name: "WellBeing Hospital, HSR Layout", address: "300 Oak Rd, HSR Layout, Bangalore" }
  ];
  
  // Available times
  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];
  
  // Changed the step order to better match the flow
  const stepLabels = ["Clinic", "Date & Time", "Patient", "Review", "Payment"];
  
  const goToStep = (stepNumber: number) => {
    if (stepNumber <= step || validateCurrentStep()) {
      setStep(stepNumber);
    }
  };
  
  const validateCurrentStep = () => {
    // Simple validation for each step
    switch(step) {
      case 1:
        if (!selectedClinic) {
          toast({
            title: "Please select a clinic",
            description: "You need to select a clinic to proceed.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 2:
        if (!selectedDate || !selectedTime) {
          toast({
            title: "Required fields missing",
            description: "Please select both date and time for your appointment.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 3:
        // No validation needed for patient selection
        return true;
      case 4:
        // No validation needed for appointment details
        return true;
      default:
        return true;
    }
  };
  
  const nextStep = () => {
    if (validateCurrentStep() && step < 5) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleBookAppointment = () => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment has been confirmed for ${selectedDate} at ${selectedTime}.`,
    });
    setOpen(false);
    // Reset state
    setStep(1);
    setSelectedClinic("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedMember("self");
    setPaymentMethod("card");
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pt-2 pb-6">
          {/* Step indicator */}
          <StepIndicator 
            currentStep={step} 
            totalSteps={5} 
            onStepClick={goToStep} 
            validateCurrentStep={validateCurrentStep} 
          />

          {/* Step labels */}
          <StepLabels labels={stepLabels} currentStep={step} />
          
          {/* Step content */}
          {step === 1 && (
            <ClinicSelectionStep 
              selectedClinic={selectedClinic}
              setSelectedClinic={setSelectedClinic}
              clinics={clinics}
            />
          )}
          
          {step === 2 && (
            <DateTimeSelectionStep 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              availableTimes={availableTimes}
            />
          )}
          
          {step === 3 && (
            <PatientSelectionStep 
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
              familyMembers={familyMembers}
            />
          )}
          
          {step === 4 && (
            <ReviewStep 
              doctorName={doctorName}
              specialty={specialty}
              selectedClinic={selectedClinic}
              clinics={clinics}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedMember={selectedMember}
              familyMembers={familyMembers}
            />
          )}
          
          {step === 5 && (
            <PaymentStep 
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          )}
        </div>
        
        {/* Navigation Buttons */}
        <NavigationButtons 
          step={step}
          totalSteps={5}
          onNext={nextStep}
          onPrev={prevStep}
          onConfirm={handleBookAppointment}
        />
      </DialogContent>
    </Dialog>
  );
}
