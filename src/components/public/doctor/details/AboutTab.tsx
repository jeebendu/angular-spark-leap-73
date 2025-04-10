
import { Badge } from "@/components/ui/badge";
import { Doctor, Education, Language } from "@/models/doctor/Doctor";
import { Mail, Phone, GraduationCap, Globe, Award, MapPin, Calendar, Stethoscope } from "lucide-react";

interface AboutTabProps {
  education: Education[];
  languages: Language[];
  doctor: Doctor;
}

export const AboutTab = ({ education, languages, doctor }: AboutTabProps ) => {
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-primary" />
            Education & Qualifications
          </h3>
          <div className="space-y-3">
            <div className="flex">
              <div className="mr-3 mt-1">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <p className="font-medium">{doctor.qualification || "MBBS"}</p>
                <p className="text-sm text-gray-500">
                  {doctor.education && doctor.education.length > 0 
                    ? `${doctor.education[0].institute} • ${doctor.education[0].year}` 
                    : "Medical University • 2015"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-primary" />
            Languages Spoken
          </h3>
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
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Professional Experience
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">
                <span className="font-medium">{doctor.expYear || 0} years</span> of clinical experience
              </span>
            </div>
            <div className="flex items-center">
              <Stethoscope className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">Specialized in 
                <span className="font-medium ml-1">
                  {doctor.specializationList && doctor.specializationList.length > 0 
                    ? doctor.specializationList.map(spec => spec.name).join(", ")
                    : "General Medicine"}
                </span>
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Mail className="h-5 w-5 mr-2 text-primary" />
            Contact Information
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              <span>{doctor.email}</span>
            </div>
            {doctor.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{doctor.phone}</span>
              </div>
            )}
            {doctor.city && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{doctor.city}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
