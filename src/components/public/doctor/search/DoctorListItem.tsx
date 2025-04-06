
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Building, Clock, Heart, Languages, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DoctorClinic {
  id: string;
  name: string;
  location: string;
  distance: string;
  available: boolean;
}

interface DoctorListItemProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    price: number;
    imageSrc: string;
    experience: string;
    languages: string[];
    clinics: DoctorClinic[];
  };
  index: number;
  isLastItem: boolean;
  lastDoctorElementRef: (node: HTMLDivElement | null) => void;
  handleBookAppointment: (doctorName: string, clinicId?: string) => void;
}

export function DoctorListItem({ doctor, index, isLastItem, lastDoctorElementRef, handleBookAppointment }: DoctorListItemProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/doctor/${doctor.id}`);
  };
  
  return (
    <motion.div
      key={doctor.id}
      ref={isLastItem ? lastDoctorElementRef : null}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index % 12 * 0.05, duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden border-none card-shadow group-hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="flex">
            <div 
              className="w-24 h-auto sm:w-32 sm:h-32 relative cursor-pointer flex-shrink-0" 
              onClick={handleViewProfile}
              style={{ aspectRatio: '1/1' }}
            >
              <img 
                src={doctor.imageSrc}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm px-1 py-0.5 rounded-full text-[8px] font-medium text-primary flex items-center">
                <Heart className="h-2 w-2 fill-red-500 text-red-500" />
              </div>
            </div>
            
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <h3 className="font-semibold text-base sm:text-lg cursor-pointer hover:text-primary" onClick={handleViewProfile}>{doctor.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium ml-0.5 text-sm sm:text-base sm:ml-1">{doctor.rating}</span>
                      <span className="text-muted-foreground ml-0.5 text-xs sm:text-sm sm:ml-1">({doctor.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-xs sm:text-sm">{doctor.specialty}</p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                    <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 rounded-full text-[10px] sm:text-xs flex items-center">
                      <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                      {doctor.experience}
                    </div>
                    <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 rounded-full text-[10px] sm:text-xs flex items-center">
                      <Languages className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                      {doctor.languages.join(", ")}
                    </div>
                    <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 rounded-full text-[10px] sm:text-xs flex items-center">
                      <Building className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                      {doctor.clinics.length} {doctor.clinics.length === 1 ? 'Clinic' : 'Clinics'}
                    </div>
                  </div>
                  
                  {doctor.clinics.length > 0 && (
                    <div className="mt-1 sm:mt-2">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-0.5 sm:mr-1 text-gray-500" />
                        <span className="text-gray-700 text-[10px] sm:text-xs">{doctor.clinics[0].name}, {doctor.clinics[0].location}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-row justify-between items-center mt-2 sm:mt-0 sm:flex-col sm:items-end sm:gap-2">
                  <div className="text-base sm:text-lg font-semibold">₹{doctor.price}</div>
                  <div className="flex space-x-2">
                    {!isMobile && (
                      <Button 
                        size="sm"
                        variant="outline"
                        className="rounded-full border-primary text-primary h-8 px-3"
                        onClick={handleViewProfile}
                      >
                        View Profile
                      </Button>
                    )}
                    <Button 
                      size="sm"
                      className="sky-button rounded-full h-8"
                      onClick={() => handleBookAppointment(doctor.name)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
