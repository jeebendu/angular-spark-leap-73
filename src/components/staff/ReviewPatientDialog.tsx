
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";

interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  clinic: string;
  doctor: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  reason?: string;
}

interface ReviewPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: PatientFormData | null;
  onConfirm: () => void;
}

export function ReviewPatientDialog({ 
  open, 
  onOpenChange, 
  data, 
  onConfirm 
}: ReviewPatientDialogProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ClipboardCheck className="mr-2 h-5 w-5" />
            Review Patient Details
          </DialogTitle>
          <DialogDescription>
            Please verify all the details before confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Patient Information</h3>
            <div className="bg-gray-50 rounded-lg p-3 mt-1">
              <p><span className="font-medium">Name:</span> {data.firstName} {data.lastName}</p>
              <p><span className="font-medium">Email:</span> {data.email}</p>
              <p><span className="font-medium">Phone:</span> {data.phone}</p>
              <p><span className="font-medium">Gender:</span> {data.gender}</p>
              <p><span className="font-medium">Age:</span> {data.age}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Appointment Details</h3>
            <div className="bg-gray-50 rounded-lg p-3 mt-1">
              <p><span className="font-medium">Date:</span> {data.appointmentDate}</p>
              <p><span className="font-medium">Time:</span> {data.appointmentTime}</p>
              <p><span className="font-medium">Type:</span> {data.appointmentType}</p>
              <p><span className="font-medium">Doctor:</span> {data.doctor}</p>
              <p><span className="font-medium">Clinic:</span> {data.clinic}</p>
              {data.reason && (
                <p><span className="font-medium">Reason:</span> {data.reason}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Edit
          </Button>
          <Button
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
