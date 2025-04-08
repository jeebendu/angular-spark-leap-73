
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Doctor, Education, Language } from "@/models/doctor/Doctor";
import { Award, Briefcase, Book, GraduationCap, Globe, Mail, Phone, MapPin, User, Users } from "lucide-react";

interface AboutTabProps {
  education: Education[];
  languages: Language[];
  doctor: Doctor;
}

export const AboutTab = ({ education, languages, doctor }: AboutTabProps) => {
  // Sample data to demonstrate UI - normally these would come from props
  const specializations = [
    { name: "General Physician" }, 
    { name: "Special Interest in Diabetology" }
  ];

  const awards = [
    { name: "In MBBS 1st prize in south zone quiz competition participated in diabetology in international competition - 1989" },
    { name: "CME managment of type to diabetes harvard medical school - 2008" },
    { name: "NEUROCON participation trichy - 2010" },
    { name: "NEUROCON participation pune - 2008" },
    { name: "ELECTO PHYSIOLOGY WORK SHOP NEW DELHI - 2011" }
  ];

  const memberships = [
    { name: "Neurology Association" },
    { name: "Bangalore Neurological Society" }
  ];
  
  const registrations = [
    { name: "33494 Karnataka Medical Council, 1992" }
  ];
  
  const experiences = [
    { year: "1992 - 1993", position: "Resident In Neurology at Nimhans" },
    { year: "1993 - 1994", position: "Resident In General Medicine at Auranghabad Medical College" },
    { year: "1994 - 1997", position: "General Medicine at Bangalore Medical College" },
    { year: "1998 - 2000", position: "General Physician at Kerala" },
    { year: "2000 - 2002", position: "General Physician at Govt Of Karnataka" }
  ];
  
  return (
    <div className="p-6">
      <div className="space-y-8">
        {/* Education & Qualifications */}
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
                <p className="font-medium">MBBS - GULBARGA UNIVERSITY, 1990</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-3 mt-1">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <p className="font-medium">MD - General Medicine - Bangalore Medical College and Research Institute, Bangalore, 1997</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Specializations */}
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <User className="h-5 w-5 mr-2 text-primary" />
            Specializations
          </h3>
          <div className="space-y-2">
            {specializations.map((spec, index) => (
              <div key={index} className="flex">
                <div className="mr-3 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>{spec.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Awards and Recognitions */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              Awards and Recognitions
            </h3>
            {awards.length > 3 && (
              <span className="text-sm text-primary hover:underline cursor-pointer">
                View all ({awards.length})
              </span>
            )}
          </div>
          <div className="space-y-2">
            {awards.map((award, index) => (
              <div key={index} className="flex">
                <div className="mr-3 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-sm">{award.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Professional Experience */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-primary" />
              Professional Experience
            </h3>
            {experiences.length > 3 && (
              <span className="text-sm text-primary hover:underline cursor-pointer">
                View all ({experiences.length})
              </span>
            )}
          </div>
          <div className="space-y-3">
            {experiences.map((exp, index) => (
              <div key={index} className="flex">
                <div className="mr-3 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">{exp.year}</p>
                  <p className="text-sm text-gray-600">{exp.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Memberships */}
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            Memberships
          </h3>
          <div className="space-y-2">
            {memberships.map((membership, index) => (
              <div key={index} className="flex">
                <div className="mr-3 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>{membership.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Registrations */}
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Book className="h-5 w-5 mr-2 text-primary" />
            Registrations
          </h3>
          <div className="space-y-2">
            {registrations.map((registration, index) => (
              <div key={index} className="flex">
                <div className="mr-3 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>{registration.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Languages Spoken */}
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
        
        {/* Contact Information */}
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
