
import { ClipboardCheck } from "lucide-react";
import { Appointments } from "@/components/BookAppointmentModal";

interface ReviewStepProps {
  appointmentObj?: Appointments;
}

export function ReviewStep({
  appointmentObj
}: ReviewStepProps) {
  const clinic = null;
  // const patient = getFamilyMemberById(selectedMember);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <ClipboardCheck className="mr-2 h-5 w-5" />
        Review Appointment Details
      </h3>

      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Doctor</h4>
          <div className="bg-white p-3 rounded-md">
            <p className="font-medium">{appointmentObj?.doctor.firstname || "Selected Doctor"} {appointmentObj?.doctor.lastname}</p>
            {appointmentObj?.doctor && <p className="text-sm text-gray-500">{appointmentObj.doctor.specializationList[0].name}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Clinic</h4>
          <div className="bg-white p-3 rounded-md">
            <p className="font-medium">{appointmentObj?.branch.name}</p>
            <p className="text-sm text-gray-500">{appointmentObj?.branch.city}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Date & Time</h4>
          <div className="bg-white p-3 rounded-md">
            <p className="font-medium">
              {appointmentObj?.slot.date ? new Date(appointmentObj.slot.date).toLocaleDateString() : "N/A"}
            </p>
            <p className="text-sm text-gray-500">{appointmentObj?.slot.startTime}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Patient</h4>
          <div className="bg-white p-3 rounded-md">
            <p className="font-medium">
              {appointmentObj?.familyMember?.id ? appointmentObj?.familyMember.name : appointmentObj.patient.firstname + " " + appointmentObj.patient.lastname}</p>
            <p className="text-sm text-gray-500">{appointmentObj?.familyMember?.id ? appointmentObj?.familyMember.relationship : "My Self"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
