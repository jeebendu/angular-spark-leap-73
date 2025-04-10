import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { fetchMyProfilePatient, fetchFamilyMemeberList } from "@/services/PatientService";
import { getDoctorClinicDRAndBranchId } from "@/services/DoctorClinicService";
import { slotByDrAndBranchId } from "@/services/appointmentService";
import { saveAppointment } from "@/services/appointmentService";

import {
  bookAppointment,
  getAvailableTimes,
  getClinicById,
  getClinics,
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
import { Doctor } from "@/models/doctor/Doctor";
import { Appointment } from "@/models/appointment/Appointment";
import { Branch } from "@/models/shared/Branch";
import { Slot } from "@/models/appointment/Slot";
import { toast } from "@/hooks/use-toast";
import { FamilyMember } from "@/models/patient/Patient";

interface BookAppointmentModalProps {
  doctor: Doctor;
  doctorName?: string;
  specialty?: string;
  initialClinicId?: string;
  initialStep?: number;
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  appointmentObj: Appointment;
}

export function BookAppointmentModal({
  doctor,
  doctorName,
  specialty,
  initialClinicId,
  initialStep = 1,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  appointmentObj
}: BookAppointmentModalProps) {
  const [step, setStep] = useState(initialStep);
  const [open, setOpen] = useState(false);
  const [selectedClinicId, setSelectedClinicId] = useState(initialClinicId || "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("clinic");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [slotList, setSlotList] = useState<Slot[]>([]);
  const [familyMemberList, setFamilyMembersList] = useState<FamilyMember[]>([]);

  const [appointment, setAppointment] = useState<Appointment>({
    id: null,
    appointmentDate: null,
    status: null,
    branch: null,
    patient: null,
    doctor: null,
    slot: null,
    familyMember: null,
    doctorClinic: null
  });

  const selectedClinic = getClinicById(selectedClinicId);

  const stepLabels = ["Clinic", "Date", "Patient", "Review", "Payment"];

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

  useEffect(() => {
    const fetchSlotDetailsWhenModalOpen = async () => {
      const filterData = {
        doctor: appointmentObj.doctor,
        branch: appointmentObj?.branch,
        date: appointmentObj?.slot?.date ? appointmentObj.slot.date : new Date()
      }
      const response = await slotByDrAndBranchId(filterData);
      setSlotList(response.data);
    }

    if (appointmentObj) {
      setAppointment((prev) => ({ ...prev, doctor: appointmentObj.doctor }));
      setAppointment((prev) => ({ ...prev, branch: appointmentObj.branch }));
      setAppointment((prev) => ({ ...prev, slot: appointmentObj.slot }));
      setAppointment((prev) => ({ ...prev, slot: appointmentObj.slot }));
      setAppointment((prev) => ({ ...prev, doctorClinic: appointmentObj.doctorClinic }));
      fetchSlotDetailsWhenModalOpen();
    }
  }, [appointmentObj]);

  useEffect(() => {
    const fetchSlotDetailsWhenModalOpen = async () => {
      const filterData = {
        doctor: doctor,
        branch: doctor.branchList[0],
        date: new Date()
      }
      const response = await slotByDrAndBranchId(filterData);
      setSlotList(response.data);
    }

    if (doctor?.branchList?.length > 0) {
      setAppointment((prev) => ({ ...prev, doctor: doctor }));
      setAppointment((prev) => ({ ...prev, branch: doctor.branchList[0] }));
      fetchDoctorClinicObj(doctor.branchList[0]);
      fetchSlotDetailsWhenModalOpen();
    }

    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    const response = await fetchMyProfilePatient();
    setAppointment((prev) => ({ ...prev, patient: response.data }));
    fetchFamilyMembers(response.data.id);
  }

  const reloadFamilyMember = async () => {
    fetchFamilyMembers(appointment.patient.id);
  }

  const fetchFamilyMembers = async (id: number) => {
    const response = await fetchFamilyMemeberList(id);
    setFamilyMembersList(response.data);
  }

  const handleMemberSelection = (member: FamilyMember | null) => {
    setAppointment((prev) => ({ ...prev, familyMember: member }));
  }

  useEffect(() => {
    if (getOpenState() && initialClinicId && !selectedClinicId) {
      setSelectedClinicId(initialClinicId);
    }
    if (getOpenState()) {
      setStep(initialStep);
    }
  }, [getOpenState(), initialClinicId, selectedClinicId, initialStep]);

  const updateselectedBranch = async (branch: Branch) => {
    if (!branch) return;
    setAppointment((prev) => ({ ...prev, branch: branch }));
    fetchDoctorClinicObj(branch);
    fetchSlotData(branch, new Date());
  }

  const validateCurrentStepWithErrorHandling = (autoAdvance = false) => {
    setErrorMessage(null);

    const isValid = validateCurrentStep(step, appointment, {
      toast: () => ({} as any),
      dismiss: () => { },
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

  const handleBookAppointment = async () => {
    const response = await saveAppointment(appointment);
    if (response.data.status) {
      setAppointment({
        id: null,
        appointmentDate: null,
        status: null,
        branch: null,
        patient: null,
        doctor: null,
        slot: null,
        familyMember: null,
        doctorClinic: null
      });
      setOpenState(false);
      setSuccessDialogOpen(true);
      toast({
        title: "Appointment Booked",
        description: "Your appointment has been booked successfully.",
        variant: "default"
      });
    }
  };

  const fetchDoctorClinicObj = async (branch: Branch) => {
    try {
      const response = await getDoctorClinicDRAndBranchId(doctor.id, branch?.id);
      setAppointment((prev) => ({ ...prev, doctorClinic: response.data }));
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  const handleSlotClick = (slot: Slot) => {
    setAppointment((prev) => ({ ...prev, slot: slot }));
  }

  const onDateSelectHandler = (date: Date) => {
    fetchSlotData(appointment.branch, date);
  }

  const fetchSlotData = async (currectSelectBranch: Branch, date: Date) => {
    const filterData = {
      doctor: appointment.doctor,
      branch: currectSelectBranch,
      date: date
    }
    const response = await slotByDrAndBranchId(filterData);
    setSlotList(response.data);
  }

  const resetForm = () => {
    setStep(initialStep);
    setSelectedClinicId(initialClinicId || "");
    setSelectedDate("");
    setSelectedTime("");
    setPaymentMethod("clinic");
    setErrorMessage(null);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ClinicSelectionStep
            appointment={appointment}
            onBranchSelect={updateselectedBranch}
            branchList={doctor?.branchList || []}
          />
        );
      case 2:
        return (
          <DateTimeSelectionStep
            slotList={slotList}
            appointmentObj={appointment}
            handleSlotClick={handleSlotClick}
            onDateSelectHandler={onDateSelectHandler}
          />
        );
      case 3:
        return (
          <PatientSelectionStep
            appointmentObj={appointment}
            familyMembers={familyMemberList}
            reloadFamilyMember={reloadFamilyMember}
            handleMemberSelection={handleMemberSelection}
          />
        );
      case 4:
        return (
          <ReviewStep
            appointmentObj={appointment}
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
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
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
            <div className="sticky top-16 bg-white z-10 pb-4">
              <CombinedStepIndicator
                currentStep={step}
                totalSteps={5}
                stepLabels={stepLabels}
                onStepClick={goToStep}
                validateCurrentStep={validateCurrentStepWithErrorHandling}
              />
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded text-sm">
                {errorMessage}
              </div>
            )}
          </div>

          <div className="px-6 pb-28 max-h-[60vh] overflow-y-auto">
            {renderStepContent()}
          </div>

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
