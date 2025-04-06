
import { Heart, Share2, Star, ThumbsUp, Award, Languages, Clock } from "lucide-react";
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative mb-12">
      <div className="flex p-6">
        {/* Doctor Image - smaller size */}
        <div className="w-1/6 md:w-[120px]">
          <img 
            src={`https://placehold.co/600x400/eaf7fc/33C3F0?text=Dr.+Emily&font=montserrat`}
            alt={doctor.name}
            className="w-full h-full object-cover object-center rounded-md"
          />
        </div>
        
        {/* Doctor Info */}
        <div className="pl-5 flex-1">
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-sm text-gray-500">{doctor.qualifications}</p>
            </div>

            <div className="flex">
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 mr-2">
                <Heart className="h-4 w-4 text-rose-500" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Ratings & Recommendations */}
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

          {/* Info badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1 text-xs">
              <Clock className="h-3 w-3" />
              <span>{doctor.experience}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1 text-xs">
              <Languages className="h-3 w-3" />
              <span>{doctor.languages.join(", ")}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1 text-xs">
              <Award className="h-3 w-3" />
              <span>{doctor.clinics.length} Clinics</span>
            </Badge>
          </div>

          {/* Consultation Fee and Book Appointment */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-gray-500 text-sm">Consultation Fee</p>
              <p className="text-xl font-bold text-primary">₹{doctor.consultationFee.replace('₹', '')}</p>
            </div>
            
            <BookAppointmentModal 
              doctorName={doctor.name}
              specialty={doctor.specialty}
              trigger={
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-2">Book Appointment</Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
