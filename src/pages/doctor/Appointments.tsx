
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
    appointmentNumber: "#Apt0001",
    patientName: "Adrian",
    selectedDate: "2024-11-11",
    selectedTime: "10:45",
    status: "upcoming",
    visitType: "Video Call",
    email: "adran@example.com",
    phone: "+1 504 368 6874",
    selectedClinic: { id: "1", name: "Main Clinic", address: "123 Main St" },
    selectedMember: "self"
  },
  {
    id: "apt0002",
    appointmentNumber: "#Apt0002",
    patientName: "Kelly",
    selectedDate: "2024-11-05",
    selectedTime: "11:50",
    status: "upcoming",
    visitType: "Audio Call",
    email: "kelly@example.com",
    phone: "+1 832 891 8403",
    selectedClinic: { id: "1", name: "Main Clinic", address: "123 Main St" },
    selectedMember: "self",
    isNew: true
  },
  {
    id: "apt0003",
    appointmentNumber: "#Apt0003",
    patientName: "Samuel",
    selectedDate: "2024-10-27",
    selectedTime: "09:30",
    status: "upcoming",
    visitType: "Video Call",
    email: "samuel@example.com",
    phone: "+1 749 104 6291",
    selectedClinic: { id: "2", name: "Downtown Clinic", address: "456 Central Ave" },
    selectedMember: "self"
  },
  {
    id: "apt0004",
    appointmentNumber: "#Apt0004",
    patientName: "Catherine",
    selectedDate: "2024-10-18",
    selectedTime: "12:20",
    status: "upcoming",
    visitType: "Direct Visit",
    email: "catherine@example.com",
    phone: "+1 584 920 7183",
    selectedClinic: { id: "3", name: "East Side Clinic", address: "789 East Blvd" },
    selectedMember: "self"
  },
  {
    id: "apt0005",
    appointmentNumber: "#Apt0005",
    patientName: "Mark Johnson",
    selectedDate: "2024-04-03",
    selectedTime: "14:00",
    status: "completed",
    visitType: "General Visit",
    email: "mark@example.com",
    phone: "+1 555 123 4567",
    selectedClinic: { id: "1", name: "Main Clinic", address: "123 Main St" },
    selectedMember: "self"
  },
  {
    id: "apt0006",
    appointmentNumber: "#Apt0006",
    patientName: "Linda Smith",
    selectedDate: "2024-04-02",
    selectedTime: "10:15",
    status: "cancelled",
    visitType: "Video Call",
    email: "linda@example.com",
    phone: "+1 555 987 6543",
    selectedClinic: { id: "2", name: "Downtown Clinic", address: "456 Central Ave" },
    selectedMember: "self"
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
