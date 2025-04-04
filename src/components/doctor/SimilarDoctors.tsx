
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { use } from "i18next";
import { useEffect, useState } from "react";
// const [appointmentList, setSimilarList] = useState<Specialization[]>([]);

import { getSimilarDoctorLists } from "@/services/alldoctorclinicService";
import { Specialization } from "@/pages/DoctorDetails";
import { DoctorClinic } from "@/pages/DoctorSearch";

interface SimilarDoctorsProps {
 
 
  specializationList: Specialization[];
  latitude?: number | null;
  longitude?: number | null;
}

 interface SearchRelatedDoctor {
  specialisations: Specialization[];
  latitude: number | null;
  longitude: number | null;
  radius: number | null;
}

export const SimilarDoctors = ({specializationList=[],latitude,longitude}:SimilarDoctorsProps) => {
  console.log("specializationListtttttttttttttttt",specializationList);




  const [searchDoctorClinic, setSearchDoctorClinic] = useState<SearchRelatedDoctor>({
    specialisations: [],
    latitude: latitude ? parseFloat(latitude.toString()) : null,
    longitude: longitude ? parseFloat(longitude.toString()) : null,
    radius: 10,
  });



  

  useEffect(() => {
    setSearchDoctorClinic((data) => ({
      ...data,
      specialisations: specializationList,
      latitude: latitude ? parseFloat(latitude.toString()) : null,
      longitude: longitude ? parseFloat(longitude.toString()) : null,
      radius: 10,
    }));
    getSimilarDoctorList(searchDoctorClinic);

    
  },[specializationList]);

  const getSimilarDoctorList = async (searchDoctorClinic:SearchRelatedDoctor) => {
 
      try {
          const data = await getSimilarDoctorLists(searchDoctorClinic);
       
          setSimilarDoctorList(data);

          console.log("Similar doctors data:", data);
         
  
      }catch (error) {
        console.error("Error in getAllSpecialization:", error);
      }
    
    console.log("Fetching similar doctors based on specialization list:", specializationList);
  };




  const [similarlist, setSimilarDoctorList] = useState<DoctorClinic[]>([]);
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Similar Specialists</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {similarlist.map((doctor, index) => (
          <Card key={index} className="overflow-hidden border-none card-shadow">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-3">
                  <img 
                    src={`https://placehold.co/200/eaf7fc/33C3F0?text=Dr.+${index+1}&font=montserrat`}
                    alt={`Dr. ${index+1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-base">{`Dr. ${doctor.doctor.user.name}`}</h4>
                  <p className="text-sm text-gray-500">{doctor.doctor.specialization}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-xs">{4.5 + (index * 0.1)}</span>
                    <span className="ml-1 text-xs text-gray-500">({150 + (index * 25)})</span>
                  </div>
                </div>
              </div>
              <p>{doctor.doctor.id}</p>
              <Link to={`/doctor/${doctor.doctor.id}`}>
                <Button variant="outline" className="m-4 w-[calc(100%-32px)] border-primary text-primary hover:bg-primary hover:text-white">
                  View Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
