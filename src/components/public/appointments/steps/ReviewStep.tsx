
import { ClipboardCheck, User, Building, Calendar } from "lucide-react";
import { getClinicById, getFamilyMemberById, type Clinic, type FamilyMember } from "@/services/appointmentService";
import { format } from "date-fns";
import { Appointment } from "@/models/appointment/Appointment";

interface ReviewStepProps {
  appointmentObj: Appointment
}

export function ReviewStep({
  appointmentObj
}: ReviewStepProps) {
  // const clinic = getClinicById(selectedClinic);
  // const patient = getFamilyMemberById(selectedMember);

  // Format date for better display
  // let formattedDate = "";
  // if (selectedDate) {
  //   try {
  //     const date = new Date(selectedDate);
  //     formattedDate = format(date, "EEEE, MMMM d, yyyy");
  //   } catch (e) {
  //     formattedDate = selectedDate;
  //   }
  // }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border p-4 space-y-2">
          <div className="flex items-center mb-1">
            <User className="h-4 w-4 text-primary mr-2" />
            <h4 className="font-medium">Doctor</h4>
          </div>
          <p className="font-medium text-base pl-6">{appointmentObj?.doctorClinic?.doctor?.firstname } {appointmentObj?.doctorClinic?.doctor?.lastname}</p>
          {appointmentObj?.doctorClinic?.doctor?.specializationList.length > 0 && <p className="text-sm text-gray-600 pl-6">
            {appointmentObj?.doctorClinic?.doctor?.specializationList.map((item, index) => (
              <span key={index} className="mr-1">{item.name}{index < appointmentObj?.doctorClinic?.doctor?.specializationList.length - 1 ? ", " : ""}</span>
            ))}
          </p>}
        </div>

        <div className="bg-white rounded-lg border p-4 space-y-2">
          <div className="flex items-center mb-1">
            <User className="h-4 w-4 text-purple-500 mr-2" />
            <h4 className="font-medium">Patient</h4>
          </div>
          {
            appointmentObj.familyMember && (
              <p className="font-medium text-base pl-6">{appointmentObj?.familyMember?.name}</p>
            )
          }
          {
            !appointmentObj.familyMember && (
              <p className="font-medium text-base pl-6">{appointmentObj?.patient?.firstname} {appointmentObj?.patient?.lastname}</p>
            )
          }
          {
            appointmentObj.familyMember && (
              <p className="text-sm text-gray-600 pl-6">{appointmentObj?.familyMember?.relationship}</p>
            )
          }
          {
            !appointmentObj.familyMember && (
              <p className="text-sm text-gray-600 pl-6">My Self</p>
            )
          }
        </div>

        <div className="bg-white rounded-lg border p-4 space-y-2">
          <div className="flex items-center mb-1">
            <Building className="h-4 w-4 text-emerald-500 mr-2" />
            <h4 className="font-medium">Branch/Clinic</h4>
          </div>
          <p className="font-medium text-base pl-6">{appointmentObj?.slot?.branch?.name}</p>
          <p className="text-sm text-gray-600 pl-6">{appointmentObj?.slot?.branch?.address}</p>
        </div>

        <div className="bg-white rounded-lg border p-4 space-y-2">
          <div className="flex items-center mb-1">
            <Calendar className="h-4 w-4 text-amber-500 mr-2" />
            <h4 className="font-medium">Appointment</h4>
          </div>
          <p className="font-medium text-base pl-6">
            {appointmentObj?.slot?.date ? format(new Date(appointmentObj.slot.date), "EEEE, MMMM d, yyyy") : "Date not available"}
          </p>
          <p className="text-sm text--600 pl-6">{appointmentObj?.slot?.startTime ? format(new Date(`1970-01-01T${appointmentObj.slot.startTime}`), "hh:mm a") : "Time not available"}</p>
        </div>
      </div>
      
      <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm">
        <p className="text-blue-700">Please verify all appointment details before proceeding to payment.</p>
      </div>
    </div>
  );
}
