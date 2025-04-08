
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Doctor } from "@/models/doctor/Doctor";
import { ClinicsTab } from "./ClinicsTab";
import { AboutTab } from "./AboutTab";
import { ServicesTab } from "./ServicesTab";
import { ReviewsTab } from "./ReviewsTab";
import { Building, User, ClipboardList, MessageSquare } from "lucide-react";

interface DoctorDetailsTabsProps { doctor: Doctor }

export const DoctorDetailsTabs = ({ doctor }: DoctorDetailsTabsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <Tabs defaultValue="clinics">
        <TabsList className="w-full border-b">
          <TabsTrigger value="clinics" className="flex-1 flex items-center justify-center">
            <Building className="h-4 w-4 mr-2" />
            Clinics
          </TabsTrigger>
          <TabsTrigger value="about" className="flex-1 flex items-center justify-center">
            <User className="h-4 w-4 mr-2" />
            About
          </TabsTrigger>
          <TabsTrigger value="services" className="flex-1 flex items-center justify-center">
            <ClipboardList className="h-4 w-4 mr-2" />
            Services
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1 flex items-center justify-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Reviews
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="clinics">
          <ClinicsTab 
            branch={doctor.branchList} 
            doctor={doctor} 
          />
        </TabsContent>
        
        <TabsContent value="about">
          <AboutTab 
            doctor={doctor}
            education={doctor.education || []}
            languages={doctor.languageList || []}
          />
        </TabsContent>
        
        <TabsContent value="services">
          <ServicesTab services={doctor.services || []} />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ReviewsTab 
            doctorId={typeof doctor.id === 'string' ? parseInt(doctor.id) : doctor.id as number} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
