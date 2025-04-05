
import { useState } from "react";
import { DoctorLayout } from "@/components/DoctorLayout";
import { AppointmentList } from "@/components/doctor/AppointmentList";
import { AppointmentDetails } from "@/models/Appointment";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

// Sample appointment data
const sampleAppointments: AppointmentDetails[] = [
  {
    id: "apt0001",
    appointmentNumber: "#APT0001",
    patientName: "Adrian Smith",
    selectedDate: "2024-11-11",
    selectedTime: "10:45",
    status: "upcoming",
    visitType: "Video Call",
    email: "adrian@example.com",
    phone: "+1 504 368 6874",
    selectedClinic: { id: "1", name: "Main Clinic", address: "123 Main St" },
    selectedMember: "self",
    age: 34,
    gender: "Male",
    lastVisitDate: "15 Oct 2024",
    nextVisitDate: "15 Dec 2024",
    consultationFee: 180
  },
  {
    id: "apt0002",
    appointmentNumber: "#APT0002",
    patientName: "Kelly Johnson",
    selectedDate: "2024-11-05",
    selectedTime: "11:50",
    status: "upcoming",
    visitType: "Audio Call",
    email: "kelly@example.com",
    phone: "+1 832 891 8403",
    selectedClinic: { id: "1", name: "Main Clinic", address: "123 Main St" },
    selectedMember: "self",
    isNew: true,
    age: 28,
    gender: "Female",
    consultationFee: 120
  },
  {
    id: "apt0003",
    appointmentNumber: "#APT0003",
    patientName: "Samuel Wilson",
    selectedDate: "2024-10-27",
    selectedTime: "09:30",
    status: "upcoming",
    visitType: "Video Call",
    email: "samuel@example.com",
    phone: "+1 749 104 6291",
    selectedClinic: { id: "2", name: "Downtown Clinic", address: "456 Central Ave" },
    selectedMember: "self",
    age: 42,
    gender: "Male",
    lastVisitDate: "22 Sep 2024",
    consultationFee: 150
  },
  {
    id: "apt0004",
    appointmentNumber: "#APT0004",
    patientName: "Catherine Lee",
    selectedDate: "2024-10-18",
    selectedTime: "12:20",
    status: "upcoming",
    visitType: "Direct Visit",
    email: "catherine@example.com",
    phone: "+1 584 920 7183",
    selectedClinic: { id: "3", name: "East Side Clinic", address: "789 East Blvd" },
    selectedMember: "self",
    age: 37,
    gender: "Female",
    lastVisitDate: "05 Aug 2024",
    nextVisitDate: "10 Dec 2024",
    consultationFee: 200
  },
  {
    id: "apt0005",
    appointmentNumber: "#APT0005",
    patientName: "Mark Johnson",
    selectedDate: "2024-04-03",
    selectedTime: "14:00",
    status: "completed",
    visitType: "General Visit",
    email: "mark@example.com",
    phone: "+1 555 123 4567",
    selectedClinic: { id: "1", name: "Main Clinic", address: "123 Main St" },
    selectedMember: "self",
    age: 45,
    gender: "Male",
    lastVisitDate: "03 Mar 2024",
    nextVisitDate: "03 Jun 2024",
    consultationFee: 160
  },
  {
    id: "apt0006",
    appointmentNumber: "#APT0006",
    patientName: "Linda Smith",
    selectedDate: "2024-04-02",
    selectedTime: "10:15",
    status: "cancelled",
    visitType: "Video Call",
    email: "linda@example.com",
    phone: "+1 555 987 6543",
    selectedClinic: { id: "2", name: "Downtown Clinic", address: "456 Central Ave" },
    selectedMember: "self",
    age: 31,
    gender: "Female",
    lastVisitDate: "15 Feb 2024",
    consultationFee: 150
  }
];

const Appointments = () => {
  const { toast } = useToast();
  const [appointments] = useState<AppointmentDetails[]>(sampleAppointments);
  
  const handleStartAppointment = (appointmentId: string) => {
    toast({
      title: "Starting appointment",
      description: `Starting appointment ${appointmentId}`,
    });
    // In a real application, this would navigate to the appointment interface
  };

  return (
    <DoctorLayout>
      <div className="p-6">
        <AppointmentList 
          appointments={appointments}
          onStartAppointment={handleStartAppointment}
        />
      </div>
    </DoctorLayout>
  );
};

export default Appointments;
