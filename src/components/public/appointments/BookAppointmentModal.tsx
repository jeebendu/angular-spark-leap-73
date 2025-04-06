import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Import the appointment service
import {
  bookAppointment,
  getAvailableTimes,
  getClinicById,
  getClinics,
  getFamilyMembers,
  validateCurrentStep
} from "@/services/appointmentService";
import { CombinedStepIndicator } from "./CombinedStepIndicator";
import { DateTimeSelectionStep } from "./steps/DateTimeSelectionStep";
import { ClinicSelectionStep } from "./steps/ClinicSelectionStep";
import { PatientSelectionStep } from "./steps/PatientSelectionStep";
import { ReviewStep } from "./steps/ReviewStep";
import { PaymentStep } from "./steps/PaymentStep";
import { NavigationButtons } from "./NavigationButtons";
import { BookingSuccessDialog } from "./steps/BookingSuccessDialog";

interface BookAppointmentModalProps {
  doctorName?: string;
  specialty?: string;
  initialClinicId?: string;
  initialStep?: number;
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function BookAppointmentModal({ 
  doctorName, 
  specialty, 
  initialClinicId, 
  initialStep = 1,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen
}: BookAppointmentModalProps) {
  const [step, setStep] = useState(initialStep);
  const [open, setOpen] = useState(false);
  const [selectedClinicId, setSelectedClinicId] = useState(initialClinicId || ""); // Store clinic ID
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedMember, setSelectedMember] = useState("self");
  const [paymentMethod, setPaymentMethod] = useState("clinic"); // Changed default to clinic
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Get data from service
  const clinics = getClinics();
  const familyMembers = getFamilyMembers();
  const availableTimes = getAvailableTimes();
  
  // Get the selected clinic object based on ID
  const selectedClinic = getClinicById(selectedClinicId);
  
  const stepLabels = ["Clinic", "Date", "Patient", "Review", "Payment"];

  // Handle controlled/uncontrolled state
  const isControlled = controlledOpen !== undefined && setControlledOpen !== undefined;
  
  const getOpenState = () => {
    return isControlled ? controlledOpen : open;
  };
  
  const setOpenState = (newState: boolean) => {
    if (isControlled) {
      setControlledOpen(newState);
    } else {
      setOpen(newState);
    }
  };
  
  // Set initial clinic when modal opens if provided
  useEffect(() => {
    if (getOpenState() && initialClinicId && !selectedClinicId) {
      setSelectedClinicId(initialClinicId);
    }
    
    // Set initial step when modal opens
    if (getOpenState()) {
      setStep(initialStep);
    }
  }, [getOpenState(), initialClinicId, selectedClinicId, initialStep]);
  
  const validateCurrentStepWithErrorHandling = (autoAdvance = false) => {
    setErrorMessage(null);
    
    const isValid = validateCurrentStep(step, { 
      selectedClinic: selectedClinic!, // Use the clinic object with non-null assertion
      selectedDate, 
      selectedTime, 
      selectedMember, 
      doctorName, 
      specialty 
    }, {
      toast: () => ({} as any),
      dismiss: () => {},
      toasts: []
    });
    
    if (!isValid) {
      switch (step) {
        case 1:
          setErrorMessage("Please select a clinic to proceed");
          break;
        case 2:
          setErrorMessage("Please select both date and time for your appointment");
          break;
        case 3:
          setErrorMessage("Please select a patient for this appointment");
          break;
        default:
          setErrorMessage("Please complete all required fields");
      }
      return false;
    }
    
    if (autoAdvance && step < 5) {
      setStep(step + 1);
    }
    
    return true;
  };
  
  const goToStep = (stepNumber: number) => {
    if (stepNumber <= step || validateCurrentStepWithErrorHandling()) {
      setStep(stepNumber);
      setErrorMessage(null);
    }
  };
  
  const nextStep = () => {
    if (validateCurrentStepWithErrorHandling() && step < 5) {
      setStep(step + 1);
      setErrorMessage(null);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrorMessage(null);
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
    }, {
      toast: () => ({} as any),
      dismiss: () => {},
      toasts: []
    });
    
    setOpenState(false);
    // Show success dialog
    setSuccessDialogOpen(true);
  };
  
  const resetForm = () => {
    setStep(initialStep);
    setSelectedClinicId(initialClinicId || "");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedMember("self");
    setPaymentMethod("clinic");
    setErrorMessage(null);
  };
  
  // Step content rendering with proper titles
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ClinicSelectionStep 
            selectedClinic={selectedClinicId}
            setSelectedClinic={setSelectedClinicId}
            clinics={clinics}
          />
        );
      case 2:
        return (
          <DateTimeSelectionStep 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            availableTimes={availableTimes}
          />
        );
      case 3:
        return (
          <PatientSelectionStep 
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            familyMembers={familyMembers}
          />
        );
      case 4:
        return (
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
        );
      case 5:
        return (
          <PaymentStep 
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        );
      default:
        return null;
    }
  };
  
  // Get step icon and title based on current step
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Select Clinic";
      case 2:
        return "Select Date & Time";
      case 3:
        return "Patient Details";
      case 4:
        return "Review Appointment";
      case 5:
        return "Payment";
      default:
        return "Book Appointment";
    }
  };
  
  return (
    <>
      <Dialog 
        open={getOpenState()} 
        onOpenChange={(newOpen) => {
          if (!newOpen) {
            setOpenState(false);
            resetForm();
          } else {
            setOpenState(true);
          }
        }}
      >
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent 
          className="sm:max-w-[800px] p-0 overflow-hidden bg-white pointer-events-auto"
          onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing on outside click
          onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing on escape key
        >
          <DialogHeader className="p-6 pb-2 sticky top-0 bg-white z-10 border-b">
            <div className="absolute right-4 top-4">
              <button 
                onClick={() => setOpenState(false)} 
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <DialogTitle>{getStepTitle()}</DialogTitle>
          </DialogHeader>
          
          <div className="px-6 pt-4 pb-0">
            {/* Combined step indicator */}
            <div className="sticky top-16 bg-white z-10 pb-4">
              <CombinedStepIndicator
                currentStep={step} 
                totalSteps={5}
                stepLabels={stepLabels}
                onStepClick={goToStep}
                validateCurrentStep={validateCurrentStepWithErrorHandling}
              />
            </div>
            
            {/* Error message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded text-sm">
                {errorMessage}
              </div>
            )}
          </div>
          
          {/* Step content - made scrollable with padding to prevent content being hidden by buttons */}
          <div className="px-6 pb-28 max-h-[60vh] overflow-y-auto">
            {renderStepContent()}
          </div>
          
          {/* Navigation Buttons - fixed at bottom with shadow */}
          <div className="sticky bottom-0 bg-white z-10 border-t shadow-md">
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

      {/* Success dialog */}
      <BookingSuccessDialog
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
        selectedDoctor={doctorName || null}
        selectedClinic={selectedClinicId || null}
        date={selectedDate ? new Date(selectedDate) : undefined}
        selectedSlot={selectedTime}
        doctors={[
          {
            name: doctorName,
            clinics: selectedClinic ? [{ id: selectedClinic.id, name: selectedClinic.name }] : []
          }
        ]}
      />
    </>
  );
}
