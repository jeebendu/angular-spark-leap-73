
import { Heart, Share2, Star, ThumbsUp, Award, Languages, Building, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";

interface DoctorHeaderProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    qualifications: string;
    rating: number;
    reviewCount: number;
    consultationFee: string;
    bio: string;
    languages: string[];
    experience: string;
    clinics: {
      name: string;
      address: string;
      phone: string;
      timings: string;
      days: string;
    }[];
  };
}

export const DoctorHeader = ({ doctor }: DoctorHeaderProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="flex flex-col">
        {/* Header with image and basic info */}
        <div className="flex">
          {/* Doctor Image */}
          <div className="w-1/4 md:w-1/5">
            <img 
              src={`https://placehold.co/600x400/eaf7fc/33C3F0?text=Dr.+Emily&font=montserrat`}
              alt={doctor.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Basic Doctor Info */}
          <div className="p-4 w-3/4 md:w-4/5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">{doctor.name}</h1>
                <p className="text-gray-600">{doctor.specialty}</p>
                <p className="text-xs md:text-sm text-gray-500">{doctor.qualifications}</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                    <span className="ml-1 text-xs text-gray-500">({doctor.reviewCount} reviews)</span>
                  </div>
                  <span className="mx-2 text-gray-300">|</span>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 text-primary" />
                    <span className="ml-1 text-xs md:text-sm">98% Recommended</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{doctor.experience}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1 text-xs">
                    <Languages className="h-3 w-3" />
                    <span>{doctor.languages.join(", ")}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1 text-xs">
                    <Building className="h-3 w-3" />
                    <span>{doctor.clinics.length} Clinics</span>
                  </Badge>
                </div>
              </div>
              
              <div className="flex">
                <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                  <Heart className="h-4 w-4 text-rose-500" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full ml-2 h-9 w-9">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Consultation Fee and Book Appointment */}
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-gray-500 text-xs">Consultation Fee</p>
                <p className="text-lg font-bold text-primary">₹{doctor.consultationFee.replace('₹', '')}</p>
              </div>
              
              <BookAppointmentModal 
                doctorName={doctor.name}
                specialty={doctor.specialty}
                trigger={
                  <Button className="sky-button rounded-full px-6 py-1 h-auto">Book Appointment</Button>
                }
              />
            </div>
          </div>
        </div>
        
        {/* Doctor Bio - Full width below */}
        <div className="px-4 pb-4">
          <p className="text-gray-700 text-sm leading-relaxed">{doctor.bio}</p>
        </div>
      </div>
    </div>
  );
};
