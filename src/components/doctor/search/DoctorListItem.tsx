import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, MapPin, Navigation } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
            {isMobile ? (
              <div className="flex">
                <div className="w-1/5 relative">
                  <img 
                    src={doctor.imageSrc}
                    alt={doctor.name}
                    className="w-full h-full object-cover min-h-[100px]"
                  />
                  <div className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm px-1 py-0.5 rounded-full text-[8px] font-medium text-primary flex items-center">
                    <Heart className="h-2 w-2 fill-red-500 text-red-500" />
                  </div>
                </div>
                
                <div className="w-4/5 p-3">
                  <div className="flex flex-wrap items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-1">{doctor.name}</h3>
                      <p className="text-muted-foreground text-xs">{doctor.specialty}</p>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{doctor.rating}</span>
                        <span className="text-xs text-muted-foreground">({doctor.reviewCount})</span>
                      </div>
                    </div>
                    
                    <span className="font-semibold text-sm">₹{doctor.price}</span>
                  </div>
                  
                  {doctor.clinics.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center text-xs">
                        <MapPin className="h-3 w-3 mr-1 text-gray-500 shrink-0" />
                        <p className="truncate">{doctor.clinics[0].name}, {doctor.clinics[0].location}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-2 flex items-center justify-between">
                    <div className="space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="rounded-full border-primary text-primary text-xs h-6 px-2"
                        onClick={() => window.location.href = `/doctor/${doctor.id}`}
                      >
                        Profile
                      </Button>
                      <Button 
                        size="sm" 
                        className="sky-button rounded-full text-xs h-6 px-2"
                        onClick={() => handleBookAppointment(doctor.name)}
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full">
                {/* Doctor Image Section */}
                <div className="w-32 h-32 relative">
                  <img 
                    src={doctor.imageSrc}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-green-400/90 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center">
                    <Heart className="h-2 w-2 mr-0.5 fill-white text-white" />
                    <span>98% Recommended</span>
                  </div>
                </div>
                
                {/* Doctor Info Section */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    {/* Doctor Name, Specialty and Rating */}
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                        <div className="text-lg font-semibold ml-8">₹{doctor.price}</div>
                      </div>
                      <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium ml-1">{doctor.rating}</span>
                        </div>
                        <span className="text-muted-foreground">({doctor.reviewCount})</span>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
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
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="w-28 rounded-full border-primary text-primary"
                        onClick={() => window.location.href = `/doctor/${doctor.id}`}
                      >
                        Profile
                      </Button>
                      <Button 
                        className="w-28 sky-button rounded-full"
                        onClick={() => handleBookAppointment(doctor.name)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                  
                  {/* Clinic Information */}
                  {doctor.clinics.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500 mt-0.5" />
                        <span className="text-gray-700">{doctor.clinics[0].name}, {doctor.clinics[0].location}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
