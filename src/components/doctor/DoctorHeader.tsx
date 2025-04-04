
import { Heart, Share2, Star, ThumbsUp, Award, Languages, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";
import { Doctor, LanguagesList, Specialization } from "@/pages/DoctorDetails";
import { Clinic } from "@/services/appointmentService";
import {verifyLogin} from "@/services/authHandler";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface DoctorHeaderProps {
  doctor: Doctor;
  id:string;
  specializationList: Specialization[];
  clinics:Clinic[];
  languageList:LanguagesList[];
  onButtonClick:() => void;
  // doctor: {
  //    id: string;
  //     firstname: string;
  //     lastname: string;
  //     specialty: string;
  //     qualification: string;
  //     desgination: string;
  //     email: string;
  //     expYear: number;
  //     specializationList: Specialization[];
  //     clinics:Clinic[];
  //     phone:string;
  //     pincode:string;
  //     joiningDate:Date;
  //     rating: number;
  //     reviewCount: number;
  //     consultationFee: string;
  //     bio: string;
  //     languages: string[];
  //     education: {
  //       degree: string;
  //       institute: string;
  //       year: string;
  //     }[];
    // clinics: {
    //   name: string;
    //   address: string;
    //   phone: string;
    //   timings: string;
    //   days: string;
    // }[];
  // };
  
}




export const DoctorHeader = ({specializationList = [] ,doctor,id,languageList =[] ,onButtonClick}: DoctorHeaderProps) => {
  const [isModalOpen, setModalOpen] = useState(false);



  const verifyLoginAndBook = async(setModalOpen: (open: boolean) => void) => {
    try {
      const isLoggedIn = await verifyLogin();
      if(isLoggedIn){
        console.log("verifying login");
        setModalOpen(true);
      }
      else{
        setModalOpen(false);
        onButtonClick();
        }
      } catch (error) {
      onButtonClick();
      setModalOpen(false);
      
    }
    
    }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="md:flex">
        <div className="md:w-1/3 relative">
          <img 
            src={`https://placehold.co/600x400/eaf7fc/33C3F0?text=Dr.+Emily&font=montserrat`}
            alt={doctor?.firstname}
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
        
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{doctor.firstname}  {doctor.lastname}</h1>
                <p className="text-gray-600">
                  {doctor.specializationList.map((specialization, index) => (
                    <span key={index}>
                      {Array.isArray(specialization.name) ? specialization.name.join(", ") : specialization.name}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-gray-500">{doctor.qualification}</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({doctor.reviewCount} reviews)</span>
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
                    <span>{doctor.expYear}+ years</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                    <Languages className="h-3 w-3" />
                    {doctor.languageList.map((languageList, index) => (
                      <span key={index}>
                      {Array.isArray(languageList.name) ? languageList.name.join(", ") : languageList.name}
                    </span>
                    ))
                   }
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                    <Building className="h-3 w-3" />
                    <span>{doctor?.clinics?.length} Clinics</span>
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
            
            <p className="text-gray-700 text-sm md:text-base">{doctor.biography}</p>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div>
              <p className="text-gray-500 text-sm">Consultation Fee</p>
              <p className="text-xl font-bold text-primary">{doctor.consultationFee}₹1,200</p>
            </div>
            
            <BookAppointmentModal 
              doctorName={doctor.firstname + " " + doctor.lastname}
              specialty={doctor.specializationList[0]?.name}
              trigger={
                <Button className="sky-button rounded-full" onClick={()=>verifyLoginAndBook(setModalOpen)}>Book Appointment</Button>
              }
              id={id}
              opening={isModalOpen} // Pass the modal open state
              onClose={() => setModalOpen(false)} // Handle modal close
            />
          </div>
        </div>
      </div>
    </div>
  );
};
