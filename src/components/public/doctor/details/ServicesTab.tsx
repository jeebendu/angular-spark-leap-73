
import { DoctorService } from "@/models/doctor/Doctor";
import { CheckCircle2, Stethoscope } from "lucide-react";

interface ServicesTabProps {
  services: DoctorService[];
}

export const ServicesTab = ({ services }: ServicesTabProps) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium flex items-center">
          <Stethoscope className="h-5 w-5 mr-2 text-primary" />
          Services Offered
        </h3>
        {services?.length > 5 && (
          <span className="text-sm text-primary hover:underline cursor-pointer">
            View all ({services.length})
          </span>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8">
        {services?.length > 0 ? (
          services.map((service, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span className="text-sm">{service.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No services available.</p>
        )}
      </div>
    </div>
  );
};
