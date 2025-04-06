
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Navigation, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingStep: number;
  selectedDoctor: string | null;
  selectedClinic: string | null;
  date: Date | undefined;
  selectedSlot: string | null;
  timeSlots: string[];
  doctors: any[];
  setSelectedClinic: (clinicId: string | null) => void;
  setDate: (date: Date | undefined) => void;
  handleSlotSelection: (slot: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function BookingModal({
  open,
  onOpenChange,
  bookingStep,
  selectedDoctor,
  selectedClinic,
  date,
  selectedSlot,
  timeSlots,
  doctors,
  setSelectedClinic,
  setDate,
  handleSlotSelection,
  nextStep,
  prevStep
}: BookingModalProps) {
  const doctor = doctors.find(d => d.name === selectedDoctor);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-lg modal-background">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
        </DialogHeader>
        
        {bookingStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Select Clinic</h3>
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
              {doctor?.clinics.map((clinic, index) => (
                <div 
                  key={clinic.id}
                  className={`p-3 border rounded-lg hover:border-primary cursor-pointer transition-all ${selectedClinic === clinic.id ? 'border-primary bg-blue-50' : ''} ${!clinic.available ? 'opacity-60 cursor-not-allowed' : ''}`}
                  onClick={() => clinic.available && setSelectedClinic(clinic.id)}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{clinic.name}</h4>
                        {!clinic.available && (
                          <span className="ml-2 text-xs text-red-500 py-0.5 px-2 bg-red-50 rounded-full">
                            No Slots Available
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{clinic.location}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Navigation className="h-3 w-3 mr-1" />
                        <span>{clinic.distance} from your location</span>
                      </div>
                    </div>
                    <Checkbox 
                      id={`clinic-${index}`} 
                      checked={selectedClinic === clinic.id}
                      disabled={!clinic.available}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button 
                className="sky-button" 
                onClick={nextStep}
                disabled={!selectedClinic}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        
        {bookingStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Select Date & Time</h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-1/2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              
              <div className="sm:w-1/2">
                <h4 className="font-medium mb-2">Available Slots</h4>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedSlot === slot ? "default" : "outline"}
                      size="sm"
                      className={selectedSlot === slot ? 'bg-primary text-white' : ''}
                      onClick={() => handleSlotSelection(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={prevStep}>Back</Button>
              <Button className="sky-button" onClick={nextStep} disabled={!selectedSlot}>Continue</Button>
            </div>
          </div>
        )}
        
        {bookingStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Patient Information</h3>
            
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">First Name</label>
                  <Input placeholder="Enter first name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Last Name</label>
                  <Input placeholder="Enter last name" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Phone Number</label>
                <Input type="tel" placeholder="Enter phone number" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Reason for Visit</label>
                <Input placeholder="Briefly describe your symptoms or reason" />
              </div>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={prevStep}>Back</Button>
              <Button className="sky-button" onClick={nextStep}>Continue</Button>
            </div>
          </div>
        )}
        
        {bookingStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Confirm Appointment</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Doctor</span>
                <span className="text-sm font-medium">{selectedDoctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="text-sm font-medium">{date?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Time</span>
                <span className="text-sm font-medium">{selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Clinic</span>
                <span className="text-sm font-medium">
                  {doctor?.clinics.find(c => c.id === selectedClinic)?.name}
                </span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between font-medium">
                  <span>Consultation Fee</span>
                  <span>₹{doctor?.price || 1200}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Payment to be made at the clinic</p>
              </div>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={prevStep}>Back</Button>
              <Button className="sky-button" onClick={nextStep}>Confirm Booking</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
