
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { slotByDrAndBranchId ,saveAppointment} from '@/services/AppointmentServiceHandler';

import {getPatietRelationList,fetchMyProfilePatient} from "@/services/UserSeviceHandler";

import { getDoctorById,getDoctorClinicDRAndBranchId } from "@/services/DoctorService";

// Import the refactored components
import { StepIndicator } from "@/components/appointment/StepIndicator";
import { StepLabels } from "@/components/appointment/StepLabels";
import { ClinicSelectionStep } from "@/components/appointment/steps/ClinicSelectionStep";
import { DateTimeSelectionStep } from "@/components/appointment/steps/DateTimeSelectionStep";
import {  PatientSelectionStep } from "@/components/appointment/steps/PatientSelectionStep";
import { ReviewStep } from "@/components/appointment/steps/ReviewStep";
import { PaymentStep } from "@/components/appointment/steps/PaymentStep";
import { NavigationButtons } from "@/components/appointment/NavigationButtons";

// Import the appointment service
import {
  validateCurrentStep,
  validateCurrentAppointmentStep,
  bookAppointment,
  // getClinics, 
  getAvailableTimes,
  getFamilyMembers,
  // getClinicById,
  getFamilyMemberById,
  Branch,
  Patient,
  User
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
  // appointmentType: AppointmentType;
  // visitType: VisitType;
  slot: Slot;
  familyMember: FamilyMember;
  doctorClinic:DoctorClinic;
}
export interface AppointmentType {
  id: number;
  name: string;
}


export class FamilyMember {
  id: string;
  patient:Patient
  name: string;
  relationship: string;
  age: number;
  phone: string;
  gender: string;
}

export interface VisitType {
  id: number;
  name: string;
}
export class Doctor {
  id: number;
  user?: User;
  uid?: string;
  desgination?: string;
  external: boolean;
  firstname: string;
  lastname: string;
  email?: string;
  phone?: string;
  expYear?: number;
  qualification?: string;
  biography?: string;
  gender?: number;
  verified: boolean;
  joiningDate?: Date;
  about?: string;
  image?: string;
  pincode?: string;
  city?: string;
  state?: State;
  country?: Country;
  // district?: District;
  // percentages: Percentage[];
  specializationList: Specialization[];
  // serviceList: EnquiryServiceType[];
  // branchList: Branch[];
  // languageList: Language[];
}

// export interface Specialization {
//   id: number;
//   name: string;
// }

export class Slot {
  id: number;
  doctor?: Doctor;
  branch?: Branch;
  startTime?:Date | string; // Using string to represent LocalTime
  endTime?: string; // Using string to represent LocalTime
  availableSlots: number;
  // status?: SlotStatus;
  date?: Date;
  duration?: number;
  slotType?: String;
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


export function BookAppointmentModal({ doctorName, specialty, trigger, id,opening, onClose }: BookAppointmentModalProps) {
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
  // let clinics = [];

  const [slotList, setSlotList] = useState<Slot[]>([]);

  const [appointment, setAppointment] = useState({
    id: null,
    appointmentDate: null,
    status: null,
    branch: null, // Initialize as null if no default constructor is available
    patient: null,
    doctor: null, // Initialize as null if no default constructor is available
    appointmentType: null,
    visitType: null,
    slot: null,
    familyMember: null,
    doctorClinic:null
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
    console.log(appointment)
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
    FetchDoctorByDoctorId(Number(id));
    fetchPatientProfile();
  }, [id]);
  
  async function fetchPatientProfile(){
    const data = await fetchMyProfilePatient();
    setAppointment((prev) => ({ ...prev, patient: data }));
    fetchFamilyMembers(data.id);
  }
  
 const  reloadFamilyMember=async()=>{
  fetchFamilyMembers(appointment.patient.id);
  }

  const fetchFamilyMembers=async(id:number)=>{
    const data= await getPatietRelationList(id);
    setFamilyMembersList(data);
  }
  const FetchDoctorByDoctorId = async (drid:number) => {
    const data = await getDoctorById(drid);
    setAppointment((prev) => ({ ...prev, doctor: data }));

    setClinics(data.branchList);
  }

  const handleSetBranch = (currectSelectBranch: Branch) => {
    setAppointment((prev) => ({ ...prev, branch: currectSelectBranch }));
    fetchSlotDat(currectSelectBranch,new Date());
    fetchDoctorClinicObj(currectSelectBranch);
  }
  
  const fetchDoctorClinicObj=async(branch:Branch)=>{
    try {
      const data=await getDoctorClinicDRAndBranchId(appointment?.doctor.id,branch?.id);
      setAppointment((prev) => ({ ...prev, doctorClinic: data }));
    } catch (error) {
      console.log("Something went wrong");
    }
  }


  const handleSlotClick = (slot: Slot) => {
    setAppointment((prev) => ({ ...prev, slot: slot }));
  }

  const onDateSelectHandler = (date: Date) => {
    fetchSlotDat(appointment.branch,date);
  }



  const fetchSlotDat = async (currectSelectBranch: Branch,date:Date) => {
    const filterData = {
      doctor: appointment.doctor,
      branch: currectSelectBranch,
      date: date
    }
    const data = await slotByDrAndBranchId(filterData);
    setSlotList(data);
  }

  const handleMemberSelection = (member: FamilyMember) => {
    setAppointment((prev) => ({ ...prev, familyMember: member }));
    }

    const  createAppointment=async()=>{
      const data = await saveAppointment(appointment);
      if(data?.status){
        toastObject.toast({
          title: "Appointment Booked",
          description: "Your appointment has been booked successfully.",
          variant: "default"
        });
        
        bookAppointment({
          selectedClinic,
          selectedDate,
          selectedTime,
          selectedMember,
          doctorName,
          specialty
        }, toastObject);
        setOpen(false);
        onClose();
        resetForm();
    
      }  
    else{
      toastObject.toast({
        title: "Failed to create appointment",
        description: "Please try again later.",
        variant: "destructive"
      });
    }

  }

  return (
    <Dialog open={open && opening} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) {resetForm();onClose();}
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
            validateCurrentStep={() => validateCurrentAppointmentStep(step, appointment, toastObject)}
          />

          {/* Step labels */}
          <StepLabels labels={stepLabels} currentStep={step} />

          {/* Step content */}
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

          {step === 4 && (
            <ReviewStep
            appointmentObj={appointment}
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
