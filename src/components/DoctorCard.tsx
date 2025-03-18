
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DoctorCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  price: string;
  imageSrc: string;
}

export function DoctorCard({ name, specialty, rating, reviewCount, price, imageSrc }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden transition-all border-none card-shadow">
      <CardContent className="p-0">
        <div className="aspect-[3/2] relative overflow-hidden">
          <img 
            src={imageSrc} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-base mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm mb-2">{specialty}</p>
          
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviewCount})</span>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="font-semibold">{price}</span>
            <Button size="sm" className="orange-button rounded-full">Book Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
