
import { Star, ThumbsUp, MapPin, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { number } from "zod";

interface DoctorCardProps {
  id:number;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  price: string;
  imageSrc: string;
  experience?: number;
  languages?: string;
  clinics?: {
    name: string;
    location: string;
  }[];
  onBookNow?: (name: string) => void;
}

export function DoctorCard({ 
  id,
  name, 
  specialty, 
  rating, 
  reviewCount, 
  price, 
  imageSrc, 
  experience ,
  languages,
  clinics = [],
  onBookNow 
}: DoctorCardProps) {
  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(name);
    }
  };
  
  const isMobile = useIsMobile();

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden transition-all border-none card-shadow">
        <CardContent className="p-0">
          {isMobile ? (
            <div className="flex">
              <div className="w-1/5 relative">
                <img 
                  src={imageSrc} 
                  alt={name}
                  className="w-full h-full object-cover min-h-[100px]"
                />
                <div className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm px-1 py-0.5 rounded-full text-[8px] font-medium text-primary flex items-center">
                  <ThumbsUp className="h-2 w-2 mr-0.5 text-primary" />
                  98%
                </div>
              </div>
              <div className="w-4/5 p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm mb-0.5 line-clamp-1">{name}</h3>
                    <p className="text-muted-foreground text-xs mb-1">{specialty}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                    {experience}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{rating}</span>
                  <span className="text-xs text-muted-foreground">({reviewCount})</span>
                </div>
                
                {clinics.length > 0 && (
                  <div className="mb-2">
                    <div className="flex items-start text-[10px] text-gray-600">
                      <MapPin className="h-2.5 w-2.5 mr-0.5 mt-0.5 text-gray-500 shrink-0" />
                      <p className="truncate">{clinics[0].name}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-1">
                  <span className="font-semibold text-xs">{price}</span>
                  <div className="space-x-1">
                    <Link to={`/doctor/${id}`}>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="rounded-full border-primary text-primary hover:bg-primary hover:text-white text-xs px-2 py-0 h-6"
                      >
                        Profile
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      className="sky-button rounded-full text-xs px-2 py-0 h-6"
                      onClick={handleBookNow}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="aspect-[3/2] relative overflow-hidden">
                <img 
                  src={imageSrc} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary flex items-center">
                  <ThumbsUp className="h-3 w-3 mr-1 text-primary" />
                  98% Recommended
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-base mb-1">{name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{specialty}</p>
                  </div>
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {experience}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{rating}</span>
                  <span className="text-sm text-muted-foreground">({reviewCount})</span>
                </div>
                
                {clinics.length > 0 && (
                  <div className="mb-3 space-y-1">
                    <p className="text-xs font-medium flex items-center">
                      <Building className="h-3 w-3 mr-1 text-gray-500" />
                      Available at:
                    </p>
                    {clinics.slice(0, 2).map((clinic, index) => (
                      <div key={index} className="flex items-start text-xs text-gray-600">
                        <MapPin className="h-3 w-3 mr-1 mt-0.5 text-gray-500 shrink-0" />
                        <p className="truncate">{clinic.name}, {clinic.location}</p>
                      </div>
                    ))}
                    {clinics.length > 2 && (
                      <p className="text-xs text-primary">+{clinics.length - 2} more locations</p>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-3">
                  <span className="font-semibold">{price}</span>
                  <div className="space-x-2">
                    <Link to={`/doctor/${id}`}>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Profile
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      className="sky-button rounded-full"
                      onClick={handleBookNow}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
