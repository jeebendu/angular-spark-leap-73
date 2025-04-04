
import { Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Doctor, LanguagesList } from "@/pages/DoctorDetails";

interface Education {
  degree: string;
  institute: string;
  year: string;
}

interface AboutTabProps {
  education: Education[];
  languages: string[];
  doctor:Doctor;
  languageList:LanguagesList[];
}

export const AboutTab = ({ education =[], languages =[],doctor,languageList =[] }: AboutTabProps) => {
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Education & Qualifications</h3>
          <div className="space-y-3">
            
              <div  className="flex">
                <div className="mr-3 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">{doctor.qualification}</p>
                  <p className="text-sm text-gray-500"> doctor.institute • doctor.year</p>
                </div>
              </div>
           
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Languages Spoken</h3>
          <div className="flex flex-wrap gap-2">
            {languageList.map((languageList, index) => (
              <Badge key={index} variant="secondary" className="rounded-full">
                {languageList.name}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Contact Information</h3>
          <div className="space-y-2">
            {/* <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-primary" />
              <span>+91 9876543210</span>
            </div> */}
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              <span>{doctor.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
