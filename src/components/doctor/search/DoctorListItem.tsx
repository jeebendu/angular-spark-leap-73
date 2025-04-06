
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  const handleViewProfile = () => {
    window.location.href = `/doctor/${doctor.id}`;
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
            <div className={`${isMobile ? 'w-32 h-32' : 'w-32 h-32'} relative cursor-pointer`} onClick={handleViewProfile}>
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
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg cursor-pointer hover:text-primary" onClick={handleViewProfile}>{doctor.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium ml-1">{doctor.rating}</span>
                      <span className="text-muted-foreground ml-1">({doctor.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                      {doctor.experience}
                    </div>
                    <div className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                      {doctor.languages.join(", ")}
                    </div>
                    <div className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                      Available today
                    </div>
                  </div>
                  
                  {doctor.clinics.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                        <span className="text-gray-700 text-xs">{doctor.clinics[0].name}, {doctor.clinics[0].location}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className="text-lg font-semibold">₹{doctor.price}</div>
                  <div className="flex space-x-2">
                    <Button 
                      size={isMobile ? "sm" : "sm"}
                      variant="outline"
                      className="rounded-full border-primary text-primary"
                      onClick={handleViewProfile}
                    >
                      View Profile
                    </Button>
                    <Button 
                      size={isMobile ? "sm" : "sm"}
                      className="sky-button rounded-full"
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
