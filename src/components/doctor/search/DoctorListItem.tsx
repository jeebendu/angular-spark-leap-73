
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, Building, MapPin, Navigation } from "lucide-react";
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
          <div className="flex flex-col md:flex-row">
            {isMobile ? (
              <div className="flex">
                <div className="w-1/4 relative">
                  <img 
                    src={doctor.imageSrc}
                    alt={doctor.name}
                    className="w-full h-full object-cover min-h-[100px]"
                  />
                  <div className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm px-1 py-0.5 rounded-full text-[8px] font-medium text-primary flex items-center">
                    <Heart className="h-2 w-2 fill-red-500 text-red-500" />
                  </div>
                </div>
                
                <div className="w-3/4 p-3">
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
              <>
                <div className="md:w-1/4 w-full aspect-[3/2] md:aspect-square relative">
                  <img 
                    src={doctor.imageSrc}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary flex items-center">
                    <Heart className="h-3 w-3 mr-1 fill-red-500 text-red-500" />
                    98% Recommended
                  </div>
                </div>
                
                <div className="flex-1 p-4 flex flex-col md:flex-row">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-base md:text-lg">{doctor.name}</h3>
                        <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
                        
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{doctor.rating}</span>
                          <span className="text-sm text-muted-foreground">({doctor.reviewCount})</span>
                        </div>
                      </div>
                      
                      <span className="font-semibold md:text-lg">₹{doctor.price}</span>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="px-3 py-1 bg-gray-100 rounded-full text-xs flex items-center">
                        <span>{doctor.experience}</span>
                      </div>
                      <div className="px-3 py-1 bg-gray-100 rounded-full text-xs flex items-center">
                        <span>{doctor.languages.join(", ")}</span>
                      </div>
                      <div className="px-3 py-1 bg-gray-100 rounded-full text-xs flex items-center">
                        <span>Available today</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs font-medium mb-2">Available at:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {doctor.clinics.map((clinic) => (
                          <TooltipProvider key={clinic.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div 
                                  className={`px-3 py-2 ${clinic.available ? 'bg-blue-50' : 'bg-gray-100'} rounded-lg text-xs flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-colors`}
                                  onClick={() => clinic.available && handleBookAppointment(doctor.name, clinic.id)}
                                >
                                  <div className="flex items-center">
                                    <Building className="h-3 w-3 mr-2 text-primary" />
                                    <div>
                                      <p className="font-medium">{clinic.name}</p>
                                      <p className="text-muted-foreground mt-0.5">{clinic.location}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <Navigation className="h-3 w-3 mr-1 text-gray-500" />
                                    <span className="text-gray-500">{clinic.distance}</span>
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                {clinic.available ? (
                                  <p className="text-xs">Click to book appointment at this clinic</p>
                                ) : (
                                  <p className="text-xs">No appointments available at this clinic</p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between md:hidden">
                      <div className="space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="rounded-full border-primary text-primary"
                          onClick={() => window.location.href = `/doctor/${doctor.id}`}
                        >
                          Profile
                        </Button>
                        <Button 
                          size="sm" 
                          className="sky-button rounded-full"
                          onClick={() => handleBookAppointment(doctor.name)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end md:w-32 hidden md:flex">
                    <div className="space-y-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="w-full rounded-full border-primary text-primary"
                        onClick={() => window.location.href = `/doctor/${doctor.id}`}
                      >
                        Profile
                      </Button>
                      <Button 
                        className="w-full sky-button rounded-full"
                        onClick={() => handleBookAppointment(doctor.name)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
