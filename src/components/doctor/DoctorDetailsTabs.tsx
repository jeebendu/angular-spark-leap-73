
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicsTab } from "./ClinicsTab";
import { AboutTab } from "./AboutTab";
import { ServicesTab } from "./ServicesTab";
import { ReviewsTab } from "./ReviewsTab";
import { Branch } from "@/models/Branch";
import { Doctor } from "@/models/Doctor";

interface DoctorDetailsTabsProps {
  doctor: any; // Using any to accommodate both Doctor types
  clinics?: any[]; // Using any here to accommodate various clinic structures
  specializationList: any[];
  branchList: Branch[];
  languageList: any[];
  serviceList: any[];
}

export const DoctorDetailsTabs = ({ 
  doctor, 
  specializationList = [], 
  branchList, 
  languageList = [], 
  serviceList = [] 
}: DoctorDetailsTabsProps) => {
  // Converting doctor to meet the model's structure
  const doctorModel: Doctor = {
    ...doctor,
    consultationFee: doctor.consultationFee ? Number(doctor.consultationFee) : 0,
    specializationList: doctor.specializationList || []
  };
  
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
            branchList={branchList} 
            doctor={doctorModel} 
          />
        </TabsContent>
        
        <TabsContent value="about">
          <AboutTab 
            doctor={doctor}
            education={doctor.education}
            languages={doctor.languages}
            languageList={languageList}
          />
        </TabsContent>
        
        <TabsContent value="services">
          <ServicesTab 
            services={doctor.services}
            serviceList={serviceList} 
          />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ReviewsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
