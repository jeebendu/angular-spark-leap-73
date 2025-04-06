import { Badge } from "@/components/ui/badge";
import { Education, Language } from "@/models/Doctor";
import { Mail, Phone } from "lucide-react";

interface AboutTabProps {
  education: Education[];
  languages: Language[];
}

export const AboutTab = ({ education, languages }: AboutTabProps) => {
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Education & Qualifications</h3>
          <div className="space-y-3">
            {education?.length > 0 ? (
              education.map((edu, index) => (
                <div key={index} className="flex">
                  <div className="mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-gray-500">{edu.institute} • {edu.year}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education details available.</p>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Languages Spoken</h3>
          <div className="flex flex-wrap gap-2">
            {languages?.length > 0 ? (
              languages.map((language, index) => (
                <Badge key={index} variant="secondary" className="rounded-full">
                  {language.name}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500">No languages available.</p>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-primary" />
              <span>+91 9876543210</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              <span>dr.emily@example.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};