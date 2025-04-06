
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

// Import the refactored components

// Import the appointment service
import {
  bookAppointment,
  getAvailableTimes,
  getClinicById,
  getClinics,
  getFamilyMembers,
  validateCurrentStep
} from "@/services/appointmentService";
import { StepIndicator } from "./StepIndicator";
import { StepLabels } from "./StepLabels";
import { DateTimeSelectionStep } from "./steps/DateTimeSelectionStep";
import { ClinicSelectionStep } from "./steps/ClinicSelectionStep";
import { PatientSelectionStep } from "./steps/PatientSelectionStep";
import { ReviewStep } from "./steps/ReviewStep";
import { PaymentStep } from "./steps/PaymentStep";
import { NavigationButtons } from "./NavigationButtons";

interface BookAppointmentModalProps {
  doctorName?: string;
  specialty?: string;
  initialClinicId?: string;
  initialStep?: number;
  trigger: React.ReactNode;
}

export function BookAppointmentModal({ 
  doctorName, 
  specialty, 
  initialClinicId, 
  initialStep = 1,
  trigger 
}: BookAppointmentModalProps) {
  const [step, setStep] = useState(initialStep);
  const [open, setOpen] = useState(false);
  const [selectedClinicId, setSelectedClinicId] = useState(initialClinicId || ""); // Store clinic ID
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedMember, setSelectedMember] = useState("self");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const toastObject = useToast();
  
  // Get data from service
  const clinics = getClinics();
  const familyMembers = getFamilyMembers();
  const availableTimes = getAvailableTimes();
  
  // Get the selected clinic object based on ID
  const selectedClinic = getClinicById(selectedClinicId);
  
  const stepLabels = ["Clinic", "Date & Time", "Patient", "Review", "Payment"];
  
  // Set initial clinic when modal opens if provided
  useEffect(() => {
    if (open && initialClinicId && !selectedClinicId) {
      setSelectedClinicId(initialClinicId);
    }
  }, [open, initialClinicId, selectedClinicId]);
  
  // Auto-advance to next step when date and time are selected
  useEffect(() => {
    if (step === 2 && selectedDate && selectedTime) {
      // Add a small delay to allow user to see their selection before advancing
      const timer = setTimeout(() => {
        if (validateCurrentStep(step, { 
          selectedClinic: selectedClinic!, // Use the clinic object, with non-null assertion
          selectedDate, 
          selectedTime, 
          selectedMember, 
          doctorName, 
          specialty 
        }, toastObject)) {
          setStep(3);
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedDate, selectedTime, step, selectedClinic, selectedMember, doctorName, specialty, toastObject]);
  
  const goToStep = (stepNumber: number) => {
    if (stepNumber <= step || validateCurrentStep(step, { 
      selectedClinic: selectedClinic!, // Use the clinic object, with non-null assertion
      selectedDate, 
      selectedTime, 
      selectedMember, 
      doctorName, 
      specialty 
    }, toastObject)) {
      setStep(stepNumber);
    }
  };
  
  const nextStep = () => {
    if (validateCurrentStep(step, { 
      selectedClinic: selectedClinic!, // Use the clinic object, with non-null assertion
      selectedDate, 
      selectedTime, 
      selectedMember, 
      doctorName, 
      specialty 
    }, toastObject) && step < 5) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleBookAppointment = () => {
    bookAppointment({
      selectedClinic: selectedClinic!, // Use the clinic object, with non-null assertion
      selectedDate,
      selectedTime,
      selectedMember,
      doctorName,
      specialty
    }, toastObject);
    
    setOpen(false);
    // Reset state
    resetForm();
  };
  
  const resetForm = () => {
    setStep(initialStep);
    setSelectedClinicId(initialClinicId || "");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedMember("self");
    setPaymentMethod("card");
  };
  
  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white modal-background">
        <DialogHeader className="p-6 pb-2 sticky top-0 bg-white z-10">
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pt-2 pb-6">
          {/* Step indicator */}
          <div className="sticky top-14 bg-white z-10 pt-2 pb-4">
            <StepIndicator 
              currentStep={step} 
              totalSteps={5} 
              onStepClick={goToStep} 
              validateCurrentStep={() => validateCurrentStep(step, { 
                selectedClinic: selectedClinic!, // Use the clinic object, with non-null assertion
                selectedDate, 
                selectedTime, 
                selectedMember, 
                doctorName, 
                specialty 
              }, toastObject)} 
            />

            {/* Step labels */}
            <StepLabels labels={stepLabels} currentStep={step} />
          </div>
          
          {/* Step content - made scrollable */}
          <div className="max-h-[60vh] overflow-y-auto pr-2 pb-16">
            {step === 1 && (
              <ClinicSelectionStep 
                selectedClinic={selectedClinicId}
                setSelectedClinic={setSelectedClinicId}
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
                selectedClinic={selectedClinicId}
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
        </div>
        
        {/* Navigation Buttons - fixed at bottom */}
        <div className="sticky bottom-0 bg-white z-10">
          <NavigationButtons 
            step={step}
            totalSteps={5}
            onNext={nextStep}
            onPrev={prevStep}
            onConfirm={handleBookAppointment}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
