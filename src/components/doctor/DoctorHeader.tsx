
import { Heart, Share2, Star, ThumbsUp, Award, Languages, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";
import { Doctor } from "@/models/Doctor";

interface DoctorHeaderProps { doctor: Doctor }

export const DoctorHeader = ({ doctor }: DoctorHeaderProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="md:flex">
        <div className="md:w-1/3 lg:w-1/4 relative">
          <img 
            src={doctor.profileImageUrl || "https://res.cloudinary.com/dzxuxfagt/image/upload/w_500,h_500,c_thumb,g_face/assets/doctor_placeholder.png"}
            alt={doctor.name || "Doctor"}
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
                <p className="text-gray-600">
                  {doctor.specializationList.map((specialization) => (
                    <span key={specialization.id}>
                      {Array.isArray(specialization.name) ? specialization.name.join(", ") : specialization.name}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-gray-500">{doctor.qualification}</p>
                
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
                    <span>{doctor.expYear}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                    <Languages className="h-3 w-3" />
                    <span>{doctor.languageList.map(language => language.name).join(", ")}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                    <Building className="h-3 w-3" />
                    <span>{doctor.clinics?.length || 0} Clinics</span>
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
              <p className="text-xl font-bold text-primary">
                ₹{doctor.consultationFee ? doctor.consultationFee.replace('₹', '') : 'N/A'}
              </p>
            </div>
            
            <BookAppointmentModal 
              doctorName={doctor.name}
              specialty={doctor.specializationList[0]?.name || "Specialty Not Available"}
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
