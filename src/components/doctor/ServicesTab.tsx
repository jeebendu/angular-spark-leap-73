
import { ServiceList } from "@/pages/DoctorDetails";
import { CheckCircle2 } from "lucide-react";

interface ServicesTabProps {
  services: string[];
  serviceList:ServiceList[];
}

export const ServicesTab = ({ services =[], serviceList=[]}: ServicesTabProps) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">Services Offered</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {serviceList.map((serviceList, index) => (
          <div key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
            <span>{ serviceList.name}</span>
            
          </div>
        ))}
      </div>
    </div>
  );
};
