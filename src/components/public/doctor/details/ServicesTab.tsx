
import { CheckCircle2 } from "lucide-react";

interface ServicesTabProps {
  services: string[];
}

export const ServicesTab = ({ services }: ServicesTabProps) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">Services Offered</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {services?.length > 0 ? (
          services.map((service, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>{service}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No services available.</p>
        )}
      </div>
    </div>
  );
};
