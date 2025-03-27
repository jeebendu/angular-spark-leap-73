
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Calendar, Users, CreditCard, Building } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface BookAppointmentModalProps {
  doctorName?: string;
  specialty?: string;
  trigger: React.ReactNode;
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

export function BookAppointmentModal({ doctorName, specialty, trigger }: BookAppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedMember, setSelectedMember] = useState("self");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { toast } = useToast();
  
  // Mock data for family members
  const familyMembers: FamilyMember[] = [
    { id: "1", name: "Sarah Smith", relationship: "Spouse" },
    { id: "2", name: "Alex Smith", relationship: "Child" },
    { id: "3", name: "Jane Smith", relationship: "Parent" }
  ];
  
  // Mock data for clinics
  const clinics = [
    { id: "1", name: "HealthFirst Clinic, Indiranagar", address: "100 Main St, Indiranagar, Bangalore" },
    { id: "2", name: "MediCare Center, Koramangala", address: "200 Park Ave, Koramangala, Bangalore" },
    { id: "3", name: "WellBeing Hospital, HSR Layout", address: "300 Oak Rd, HSR Layout, Bangalore" }
  ];
  
  const goToStep = (stepNumber: number) => {
    if (stepNumber <= step || validateCurrentStep()) {
      setStep(stepNumber);
    }
  };
  
  const validateCurrentStep = () => {
    // Simple validation for each step
    switch(step) {
      case 1:
        if (!selectedClinic) {
          toast({
            title: "Please select a clinic",
            description: "You need to select a clinic to proceed.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 2:
        if (!selectedDate || !selectedTime) {
          toast({
            title: "Required fields missing",
            description: "Please select both date and time for your appointment.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 3:
        // No validation needed for patient selection
        return true;
      case 4:
        // No validation needed for appointment details
        return true;
      default:
        return true;
    }
  };
  
  const nextStep = () => {
    if (validateCurrentStep() && step < 5) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleBookAppointment = () => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment has been confirmed for ${selectedDate} at ${selectedTime}.`,
    });
    setOpen(false);
    // Reset state
    setStep(1);
    setSelectedClinic("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedMember("self");
    setPaymentMethod("card");
  };
  
  // Mock data for available times
  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>
        
        {/* Step indicator */}
        <div className="px-6 pt-2 pb-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 w-full">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                } cursor-pointer shadow-sm hover:shadow-md transition-all`}
                onClick={() => goToStep(1)}
              >
                {step > 1 ? <Check className="h-5 w-5" /> : "1"}
              </div>
              <div className={`h-1 flex-grow ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
              
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                } cursor-pointer shadow-sm hover:shadow-md transition-all`}
                onClick={() => step > 1 || validateCurrentStep() ? goToStep(2) : null}
              >
                {step > 2 ? <Check className="h-5 w-5" /> : "2"}
              </div>
              <div className={`h-1 flex-grow ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
              
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                } cursor-pointer shadow-sm hover:shadow-md transition-all`}
                onClick={() => step > 2 || (validateCurrentStep() && step > 1) ? goToStep(3) : null}
              >
                {step > 3 ? <Check className="h-5 w-5" /> : "3"}
              </div>
              <div className={`h-1 flex-grow ${step >= 4 ? "bg-primary" : "bg-gray-200"}`}></div>
              
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 4 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                } cursor-pointer shadow-sm hover:shadow-md transition-all`}
                onClick={() => step > 3 || (validateCurrentStep() && step > 2) ? goToStep(4) : null}
              >
                {step > 4 ? <Check className="h-5 w-5" /> : "4"}
              </div>
              <div className={`h-1 flex-grow ${step >= 5 ? "bg-primary" : "bg-gray-200"}`}></div>
              
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 5 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                } cursor-pointer shadow-sm hover:shadow-md transition-all`}
                onClick={() => step > 4 || (validateCurrentStep() && step > 3) ? goToStep(5) : null}
              >
                5
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6 text-sm">
            <div className={`mx-2 font-medium ${step === 1 ? "text-primary" : "text-gray-500"}`}>Clinic</div>
            <div className={`mx-2 font-medium ${step === 2 ? "text-primary" : "text-gray-500"}`}>Date & Time</div>
            <div className={`mx-2 font-medium ${step === 3 ? "text-primary" : "text-gray-500"}`}>Patient</div>
            <div className={`mx-2 font-medium ${step === 4 ? "text-primary" : "text-gray-500"}`}>Review</div>
            <div className={`mx-2 font-medium ${step === 5 ? "text-primary" : "text-gray-500"}`}>Payment</div>
          </div>
          
          {/* Step 1: Select Clinic */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Select Clinic
                </h3>
                
                <RadioGroup 
                  value={selectedClinic} 
                  onValueChange={setSelectedClinic}
                  className="space-y-3"
                >
                  {clinics.map((clinic) => (
                    <div 
                      key={clinic.id} 
                      className={`border rounded-lg p-4 transition-colors ${
                        selectedClinic === clinic.id ? "border-primary" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem value={clinic.id} id={`clinic-${clinic.id}`} className="mt-1" />
                        <Label htmlFor={`clinic-${clinic.id}`} className="ml-2 cursor-pointer">
                          <div className="font-medium">{clinic.name}</div>
                          <div className="text-sm text-gray-500">{clinic.address}</div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}
          
          {/* Step 2: Select Date and Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Select Date and Time
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="appointmentDate">Date</Label>
                    <Input 
                      id="appointmentDate" 
                      type="date" 
                      className="mt-1 bg-transparent"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>Available Time Slots</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className={`text-xs h-8 ${
                            selectedTime === time ? "sky-button" : ""
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Patient Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Patient Details
                </h3>
                
                <Label className="block mb-4">Who is this appointment for?</Label>
                
                <RadioGroup 
                  value={selectedMember} 
                  onValueChange={setSelectedMember}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                    <RadioGroupItem value="self" id="self" />
                    <Label htmlFor="self" className="cursor-pointer">Myself</Label>
                  </div>
                  
                  {familyMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                      <RadioGroupItem value={member.id} id={`member-${member.id}`} />
                      <Label htmlFor={`member-${member.id}`} className="cursor-pointer">
                        {member.name} ({member.relationship})
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-dashed"
                  >
                    + Add a new family member
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Review Appointment Details */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Review Appointment Details</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Doctor</span>
                  <span className="font-medium">{doctorName || "Dr. Sarah Johnson"}</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Specialty</span>
                  <span className="font-medium">{specialty || "Cardiologist"}</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Clinic</span>
                  <span className="font-medium">
                    {clinics.find(c => c.id === selectedClinic)?.name || "Not selected"}
                  </span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="font-medium">{selectedDate || "Not selected"}</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Time</span>
                  <span className="font-medium">{selectedTime || "Not selected"}</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">Patient</span>
                  <span className="font-medium">
                    {selectedMember === "self" 
                      ? "You" 
                      : familyMembers.find(m => m.id === selectedMember)?.name || "Not selected"}
                  </span>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <Label className="block mb-2">Reason for Visit (Optional)</Label>
                <Input 
                  placeholder="Enter the reason for your visit" 
                  className="bg-transparent"
                />
              </div>
            </div>
          )}
          
          {/* Step 5: Payment Information */}
          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Information
              </h3>
              
              <div className="border rounded-lg p-4 mb-6 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Consultation Fee</span>
                  <span className="font-medium">₹800</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Platform Fee</span>
                  <span className="font-medium">₹100</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">GST (18%)</span>
                  <span className="font-medium">₹162</span>
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>₹1,062</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label className="block mb-2">Select Payment Method</Label>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-primary transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer flex-1">Credit/Debit Card</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-primary transition-colors">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="cursor-pointer flex-1">UPI</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-primary transition-colors">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="cursor-pointer flex-1">Net Banking</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="p-6 border-t flex justify-between">
          {step > 1 ? (
            <Button 
              variant="outline" 
              onClick={prevStep}
              className="flex items-center"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < 5 ? (
            <Button onClick={nextStep} className="sky-button">
              Continue
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleBookAppointment} className="sky-button">
              Confirm & Pay
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
