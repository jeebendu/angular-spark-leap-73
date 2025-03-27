
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicsTab } from "./ClinicsTab";
import { AboutTab } from "./AboutTab";
import { ServicesTab } from "./ServicesTab";
import { ReviewsTab } from "./ReviewsTab";

interface Doctor {
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  education: {
    degree: string;
    institute: string;
    year: string;
  }[];
  languages: string[];
  services: string[];
  clinics: {
    name: string;
    address: string;
    phone: string;
    timings: string;
    days: string;
  }[];
}

interface DoctorDetailsTabsProps {
  doctor: Doctor;
}

export const DoctorDetailsTabs = ({ doctor }: DoctorDetailsTabsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <Tabs defaultValue="clinics">
        <TabsList className="w-full border-b">
          <TabsTrigger value="clinics" className="flex-1">Clinics</TabsTrigger>
          <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
          <TabsTrigger value="services" className="flex-1">Services</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clinics">
          <ClinicsTab 
            clinics={doctor.clinics} 
            doctor={{ name: doctor.name, specialty: doctor.specialty }} 
          />
        </TabsContent>
        
        <TabsContent value="about">
          <AboutTab 
            education={doctor.education}
            languages={doctor.languages}
          />
        </TabsContent>
        
        <TabsContent value="services">
          <ServicesTab services={doctor.services} />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ReviewsTab 
            rating={doctor.rating}
            reviewCount={doctor.reviewCount}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
