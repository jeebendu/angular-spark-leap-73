
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { getDoctorById } from "@/services/doctorService";

// Import the refactored components
import { StepIndicator } from "@/components/appointment/StepIndicator";
import { StepLabels } from "@/components/appointment/StepLabels";
import { ClinicSelectionStep } from "@/components/appointment/steps/ClinicSelectionStep";
import { DateTimeSelectionStep } from "@/components/appointment/steps/DateTimeSelectionStep";
import { PatientSelectionStep } from "@/components/appointment/steps/PatientSelectionStep";
import { ReviewStep } from "@/components/appointment/steps/ReviewStep";
import { PaymentStep } from "@/components/appointment/steps/PaymentStep";
import { NavigationButtons } from "@/components/appointment/NavigationButtons";

// Import the appointment service
import {
  validateCurrentStep,
  bookAppointment,
  // getClinics, 
  getAvailableTimes,
  getFamilyMembers,
  // getClinicById,
  getFamilyMemberById,
  Branch
} from "@/services/appointmentService";

interface BookAppointmentModalProps {
  doctorName?: string;
  specialty?: string;
  trigger: React.ReactNode;
  id?: string;
}

export function BookAppointmentModal({ doctorName, specialty, trigger, id }: BookAppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Branch>();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedMember, setSelectedMember] = useState("self");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const toastObject = useToast();

  // Get data from service
  // const clinics = getClinics();

  const [clinics, setClinics] = useState<Branch[]>();
  // let clinics = [];


  const familyMembers = getFamilyMembers();
  const availableTimes = getAvailableTimes();

  const stepLabels = ["Clinic", "Date & Time", "Patient", "Review", "Payment"];

  // Auto-advance to next step when date and time are selected
  useEffect(() => {
    if (step === 2 && selectedDate && selectedTime) {
      // Add a small delay to allow user to see their selection before advancing
      const timer = setTimeout(() => {
        if (validateCurrentStep(step, {
          selectedClinic, selectedDate, selectedTime, selectedMember, doctorName, specialty
        }, toastObject)) {
          setStep(3);
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [selectedDate, selectedTime, step, selectedClinic, selectedMember, doctorName, specialty, toastObject]);

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= step || validateCurrentStep(step, {
      selectedClinic, selectedDate, selectedTime, selectedMember, doctorName, specialty
    }, toastObject)) {
      setStep(stepNumber);
    }
  };

  const nextStep = () => {
    if (validateCurrentStep(step, {
      selectedClinic, selectedDate, selectedTime, selectedMember, doctorName, specialty
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
      selectedClinic,
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
    setStep(1);
    setSelectedClinic(null);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedMember("self");
    setPaymentMethod("card");
  };


  useEffect(() => {
    FetchDoctorByDoctorId();
  }, [id]);



  const FetchDoctorByDoctorId = async () => {
    const data = await getDoctorById(id);
    setClinics(data.branchList);
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white modal-background">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>

        <div className="px-6 pt-2 pb-6">
          {/* Step indicator */}
          <StepIndicator
            currentStep={step}
            totalSteps={5}
            onStepClick={goToStep}
            validateCurrentStep={() => validateCurrentStep(step, {
              selectedClinic, selectedDate, selectedTime, selectedMember, doctorName, specialty
            }, toastObject)}
          />

          {/* Step labels */}
          <StepLabels labels={stepLabels} currentStep={step} />

          {/* Step content */}
          {step === 1 && (
            <ClinicSelectionStep
              selectedClinic={selectedClinic}
              setSelectedClinic={setSelectedClinic}
              branches={clinics}
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
