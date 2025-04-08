
import { Heart, Share2, Star, ThumbsUp, Award, Languages, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Doctor } from "@/models/doctor/Doctor";
import { BookAppointmentModal } from "../../appointments/BookAppointmentModal";
import { useState } from "react";

interface DoctorHeaderProps { doctor: Doctor }

export const DoctorHeader = ({ doctor }: DoctorHeaderProps) => {
  // Get the first clinic if available for pre-selection
  const firstClinicId = doctor.branchList && doctor.branchList.length > 0 ? doctor.branchList[0].id : undefined;
  const [openModal, setOpenModal] = useState(false);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="md:flex">
        <div className="md:w-1/3 lg:w-1/4 relative">
          <img 
            src={doctor.image || doctor.profilePic || "https://res.cloudinary.com/dzxuxfagt/image/upload/w_500,h_500,c_thumb,g_face/assets/doctor_placeholder.png"}
            alt={doctor.firstname +" "+ doctor.lastname || "Doctor"}
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
                <h1 className="text-2xl font-bold text-gray-900">{doctor.firstname +" "+ doctor.lastname}</h1>
                <p className="text-gray-600">
                  {doctor.specializations && Array.isArray(doctor.specializations) ? (
                    doctor.specializations.map((specialization, index) => (
                      <span key={specialization.id}>
                        {specialization.name}
                        {index < doctor.specializations!.length - 1 && ', '}
                      </span>
                    ))
                  ) : (
                    <span>No specializations available</span>
                  )}
                </p>
                <p className="text-sm text-gray-500">{doctor.qualification}</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{doctor.rating ?? "0"}</span>
                    <span className="ml-1 text-xs text-gray-500">({doctor.reviewCount ?? 0} reviews)</span>
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
                    <span>{doctor.expYear || doctor.experience} Years Experience</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                    <Languages className="h-3 w-3" />
                    <span>
                      {doctor.languageList && Array.isArray(doctor.languageList)
                        ? doctor.languageList.map((language) => language.name).join(", ")
                        : "No languages available"}
                    </span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                    <Building className="h-3 w-3" />
                    <span>{doctor.branchList?.length || 0} Clinics</span>
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
            
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">{doctor.biography || doctor.about}</p>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div>
              <p className="text-gray-500 text-sm">Consultation Fee</p>
              <p className="text-xl font-bold text-primary">
                ₹{doctor.consultationFee ? doctor.consultationFee.replace('₹', '') : '500'}
              </p>
            </div>
            
            <BookAppointmentModal
              doctor={doctor}
              doctorName={doctor.firstname +" "+ doctor.lastname}
              specialty={
                doctor.specializations && Array.isArray(doctor.specializations) && doctor.specializations[0]
                  ? doctor.specializations[0].name
                  : "Specialty Not Available"
              }
              initialClinicId={firstClinicId?.toString()}
              initialStep={firstClinicId ? 2 : 1}
              open={openModal}
              onOpenChange={setOpenModal}
              trigger={
                <Button
                  className="sky-button rounded-full px-8 py-2"
                  onClick={() => setOpenModal(true)}
                >
                  Book Appointment
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
