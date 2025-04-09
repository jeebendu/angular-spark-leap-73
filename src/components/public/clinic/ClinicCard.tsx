
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, MapPin, Clock, Phone, Star } from "lucide-react";
import { Clinic } from "@/models/clinic/Clinic";
import { motion } from "framer-motion";

interface ClinicCardProps {
  clinic: Clinic;
}

export const ClinicCard: React.FC<ClinicCardProps> = ({ clinic }) => {
  const defaultImage = "https://res.cloudinary.com/dzxuxfagt/image/upload/assets/clinic-placeholder.jpg";
  const imageUrl = clinic.branchList?.[0]?.image || defaultImage;
  
  // Mock data - in a real app, these would come from the API
  const rating = 4.5;
  const reviewCount = 120;
  const services = ["General Medicine", "Cardiology", "Pediatrics"];
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden card-shadow h-full border border-gray-100">
        <div className="aspect-[3/2] relative">
          <img 
            src={imageUrl} 
            alt={clinic.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-primary text-white">
            Health Center
          </Badge>
        </div>
        <CardContent className="p-5">
          <h3 className="font-semibold text-lg mb-2">{clinic.name}</h3>
          
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground text-sm">({reviewCount} reviews)</span>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-start text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-muted-foreground">{clinic.address}</p>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <p className="text-muted-foreground">{clinic.timings || 'Open 24/7'}</p>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <p className="text-muted-foreground">{clinic.contact}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {services.map((service, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                {service}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <p className="font-medium text-sm">
              {clinic.branchList?.length || 0} {clinic.branchList?.length === 1 ? 'Branch' : 'Branches'}
            </p>
            <Link to={`/clinics/${clinic.id}`}>
              <Button size="sm" className="rounded-full">
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
