
import { MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";
import { Branch, Doctor } from "@/pages/DoctorDetails";
import { useState } from "react";

interface ClinicsTabProps {
  branchList?: Branch[];
  doctor: Doctor;
}

export const ClinicsTab = ({ branchList = [], doctor }: ClinicsTabProps) => {
  const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
  
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Available at {branchList.length} Locations</h3>
      <div className="space-y-4">
        {branchList.map((clinic, index) => (
          <Card key={index} className="shadow-md">
            <CardContent className="p-0">
              <div className="md:flex">
                <div className="p-6 md:w-3/4">
                  <h4 className="text-lg font-medium">{clinic?.clinic?.name}</h4>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{clinic?.clinic?.address}</p>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{clinic?.clinic?.phone}</p>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Mon-Fri: 9:00 AM - 5:00 PM</p>
                        <p className="text-sm text-gray-600">Sat: 9:00 AM - 1:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 md:w-1/4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l">
                  <p className="text-sm text-gray-500 mb-1">Consultation Fee</p>
                  <p className="text-xl font-semibold text-primary mb-3">₹{doctor.consultationFee || 1200}</p>
                  
                  <BookAppointmentModal 
                    doctorName={doctor.firstname + " " + doctor.lastname}
                    specialty={doctor.specializationList[0]?.name}
                    trigger={
                      <Button 
                        className="sky-button rounded-full" 
                        onClick={() => setSelectedClinic(index)}
                      >
                        Book Now
                      </Button>
                    }
                    id={doctor.id?.toString()}
                    opening={selectedClinic === index}
                    onClose={() => setSelectedClinic(null)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
