
import React from "react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Check, Download } from "lucide-react";

interface BookingSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDoctor: string | null;
  selectedClinic: string | null;
  date: Date | undefined;
  selectedSlot: string | null;
  doctors: any[];
}

export function BookingSuccessDialog({
  open,
  onOpenChange,
  selectedDoctor,
  selectedClinic,
  date,
  selectedSlot,
  doctors
}: BookingSuccessDialogProps) {
  const doctor = doctors.find(d => d.name === selectedDoctor);
  const clinic = doctor?.clinics.find(c => c.id === selectedClinic);
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white max-w-md mx-auto pointer-events-auto">
        <AlertDialogHeader>
          <div className="mx-auto rounded-full bg-green-100 p-3 w-16 h-16 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" strokeWidth={3} />
          </div>
          <AlertDialogTitle className="text-center text-xl text-green-600">Appointment Confirmed!</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Your appointment has been successfully booked
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <div className="bg-gray-50 p-4 rounded-lg w-full max-w-sm mx-auto">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Appointment ID</span>
              <span className="text-sm font-medium">APT123456</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Doctor</span>
              <span className="text-sm font-medium">{selectedDoctor}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Date & Time</span>
              <span className="text-sm font-medium">{date?.toLocaleDateString()} {selectedSlot}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Clinic</span>
              <span className="text-sm font-medium">{clinic?.name}</span>
            </div>
          </div>
          
          <div className="my-4 bg-white p-2 border rounded-lg">
            <img src="https://placehold.co/200/eaf7fc/33C3F0?text=QR+Code&font=montserrat" alt="Appointment QR Code" className="w-32 h-32 mx-auto" />
          </div>
          
          <p className="text-sm text-center text-muted-foreground">
            Show this QR code at the clinic reception
          </p>
        </div>
        
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
          <AlertDialogCancel className="sm:mt-0">Close</AlertDialogCancel>
          <AlertDialogAction className="sky-button flex items-center justify-center">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
