
import { DoctorService } from "@/models/doctor/Doctor";
import { CheckCircle2, Stethoscope } from "lucide-react";

interface ServicesTabProps {
  services: DoctorService[];
}

export const ServicesTab = ({ services }: ServicesTabProps) => {
  // Group services by category for better organization
  const groupedServices = services?.reduce((acc, service) => {
    // Use optional chaining with a fallback value when service.category is undefined
    const category = service.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, DoctorService[]>);

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
      
      {services?.length > 0 ? (
        Object.entries(groupedServices || {}).map(([category, categoryServices]) => (
          <div key={category} className="mb-6 last:mb-0">
            <h4 className="text-sm font-medium text-gray-500 mb-3">{category}</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8">
              {categoryServices.map((service, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                  <span className="text-sm">{service.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No services available.</p>
      )}
    </div>
  );
};
