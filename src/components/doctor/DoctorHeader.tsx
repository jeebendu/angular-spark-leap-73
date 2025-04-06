
import { Heart, Share2, Star, ThumbsUp, Award, Languages, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
      <div className="md:flex">
        <div className="md:w-1/3 lg:w-1/4 relative">
          <img 
            src={`https://placehold.co/600x400/eaf7fc/33C3F0?text=Dr.+Emily&font=montserrat`}
            alt={doctor.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-4 right-4 md:hidden">
            <Button variant="outline" size="icon" className="rounded-full bg-white">
              <Heart className="h-5 w-5 text-rose-500" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-white ml-2">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-6 md:w-2/3 lg:w-3/4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
                <p className="text-gray-600">{doctor.specialty}</p>
                <p className="text-sm text-gray-500">{doctor.qualifications}</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                    <span className="ml-1 text-xs text-gray-500">({doctor.reviewCount} reviews)</span>
                  </div>
                  <span className="mx-2 text-gray-300">|</span>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 text-primary" />
                    <span className="ml-1 text-sm">98% Recommended</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                    <Award className="h-3 w-3" />
                    <span>{doctor.experience}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                    <Languages className="h-3 w-3" />
                    <span>{doctor.languages.join(", ")}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                    <Building className="h-3 w-3" />
                    <span>{doctor.clinics.length} Clinics</span>
                  </Badge>
                </div>
              </div>
              
              <div className="hidden md:flex">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-5 w-5 text-rose-500" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full ml-2">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">{doctor.bio}</p>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div>
              <p className="text-gray-500 text-sm">Consultation Fee</p>
              <p className="text-xl font-bold text-primary">₹{doctor.consultationFee.replace('₹', '')}</p>
            </div>
            
            <BookAppointmentModal 
              doctorName={doctor.name}
              specialty={doctor.specialty}
              trigger={
                <Button className="sky-button rounded-full px-8 py-2">Book Appointment</Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
