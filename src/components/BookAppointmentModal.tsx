import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { fetchSlotsByDoctorAndBranch, saveOrUpdateAppointment } from "@/services/AppointmentServiceHandler";

import { fetchMyProfilePatient } from "@/services/UserSevice";

import { fetchDoctorById, fetchDoctorClinicByDoctorAndBranch } from "@/services/DoctorService";
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
  validateCurrentAppointmentStep,
  bookAppointment,
  getAvailableTimes,
  getFamilyMembers,
  getFamilyMemberById,
  Branch,
  Patient,
  User,
} from "@/services/appointmentService";
import { Country, DoctorClinic, State } from "@/pages/DoctorSearch";
import { Specialization } from "./Specializations";

export interface Appointments {
  id: number;
  appointmentDate: Date;
  status: string;
  branch: Branch;
  patient: Patient;
  doctor: Doctor;
  slot: Slot;
  familyMember: FamilyMember;
  doctorClinic: DoctorClinic;
}

export class Slot {
  id: number;
  doctor?: Doctor;
  branch?: Branch;
  startTime?: Date | string;
  endTime?: string;
  availableSlots: number;
  date?: Date;
  duration?: number;
  slotType?: string;
  status?: string;
}

interface BookAppointmentModalProps {
  doctorName?: string;
  specialty?: string;
  trigger: React.ReactNode;
  id?: string;
  opening: boolean;
  onClose: () => void;
}

export function BookAppointmentModal({
  doctorName,
  specialty,
  trigger,
  id,
  opening,
  onClose,
}: BookAppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Branch>();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedMember, setSelectedMember] = useState("self");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const toastObject = useToast();

  const [familyMemberList, setFamilyMembersList] = useState<FamilyMember[]>([]);
  const [clinics, setClinics] = useState<Branch[]>();
  const [slotList, setSlotList] = useState<Slot[]>([]);

  const [appointment, setAppointment] = useState({
    id: null,
    appointmentDate: null,
    status: null,
    branch: null,
    patient: null,
    doctor: null,
    appointmentType: null,
    visitType: null,
    slot: null,
    familyMember: null,
    doctorClinic: null,
  });

  const familyMembers = getFamilyMembers();
  const availableTimes = getAvailableTimes();

  const stepLabels = ["Clinic", "Date & Time", "Patient", "Review", "Payment"];

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= step || validateCurrentAppointmentStep(step, appointment, toastObject)) {
      setStep(stepNumber);
    }
  };

  const nextStep = () => {
    if (validateCurrentAppointmentStep(step, appointment, toastObject) && step < 5) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleBookAppointment = () => {
    createAppointment();
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
    fetchDoctorById(Number(id));
    fetchPatientProfile();
  }, [id]);

  async function fetchPatientProfile() {
    const response = await fetchPatientProfile();
    setAppointment((prev) => ({ ...prev, patient: response.data }));
    fetchFamilyMembers(response.data.id);
  }

  const reloadFamilyMember = async () => {
    fetchFamilyMembers(appointment.patient.id);
  };

  const fetchFamilyMembers = async (id: number) => {
    const response = await fetchPatientRelations(id);
    setFamilyMembersList(response.data);
  };

  const fetchDoctorById = async (doctorId: number) => {
    const response = await fetchDoctorById(doctorId);
    setAppointment((prev) => ({ ...prev, doctor: response.data }));
    setClinics(response.data.branchList);
  };

  const handleSetBranch = (selectedBranch: Branch) => {
    setAppointment((prev) => ({ ...prev, branch: selectedBranch }));
    fetchSlots(selectedBranch, new Date());
    fetchDoctorClinic(selectedBranch);
  };

  const fetchDoctorClinic = async (branch: Branch) => {
    try {
      const data = await fetchDoctorClinicByDoctorAndBranch(appointment?.doctor.id, branch?.id);
      setAppointment((prev) => ({ ...prev, doctorClinic: data }));
    } catch (error) {
      console.error("Something went wrong");
    }
  };

  const handleSlotClick = (slot: Slot) => {
    setAppointment((prev) => ({ ...prev, slot }));
  };

  const onDateSelectHandler = (date: Date) => {
    fetchSlots(appointment.branch, date);
  };

  const fetchSlots = async (branch: Branch, date: Date) => {
    const filterData = {
      doctor: appointment.doctor,
      branch,
      date,
    };
    const response = await fetchSlotsByDoctorAndBranch(filterData);
    setSlotList(response.data);
  };

  const handleMemberSelection = (member: FamilyMember) => {
    setAppointment((prev) => ({ ...prev, familyMember: member }));
  };

  const createAppointment = async () => {
    const data = await saveOrUpdateAppointment(appointment);
    if (data?.status) {
      toastObject.toast({
        title: "Appointment Booked",
        description: "Your appointment has been booked successfully.",
        variant: "default",
      });

      bookAppointment(
        {
          selectedClinic,
          selectedDate,
          selectedTime,
          selectedMember,
          doctorName,
          specialty,
        },
        toastObject
      );
      setOpen(false);
      onClose();
      resetForm();
    } else {
      toastObject.toast({
        title: "Failed to create appointment",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={open && opening}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          resetForm();
          onClose();
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white modal-background">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>

        <div className="px-6 pt-2 pb-6">
          <StepIndicator
            currentStep={step}
            totalSteps={5}
            onStepClick={goToStep}
            validateCurrentStep={() => validateCurrentAppointmentStep(step, appointment, toastObject)}
          />

          <StepLabels labels={stepLabels} currentStep={step} />

          {step === 1 && (
            <ClinicSelectionStep
              appointmentObj={appointment}
              setSelectedClinic={handleSetBranch}
              branches={clinics}
            />
          )}

          {step === 2 && (
            <DateTimeSelectionStep
              slotList={slotList}
              appointmentObj={appointment}
              handleSlotClick={handleSlotClick}
              onDateSelectHandler={onDateSelectHandler}
            />
          )}

          {step === 3 && (
            <PatientSelectionStep
              appointmentObj={appointment}
              familyMembers={familyMemberList}
              reloadFamilyMember={reloadFamilyMember}
              handleMemberSelection={handleMemberSelection}
            />
          )}

          {step === 4 && <ReviewStep appointmentObj={appointment} />}

          {step === 5 && (
            <PaymentStep paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
          )}
        </div>

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