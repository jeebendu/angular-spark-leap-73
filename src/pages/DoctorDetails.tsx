import { Link, useParams, useLocation } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft } from "lucide-react";
import { DoctorHeader } from "@/components/doctor/DoctorHeader";
import { DoctorDetailsTabs } from "@/components/doctor/DoctorDetailsTabs";
import { SimilarDoctors } from "@/components/doctor/SimilarDoctors";
import { useEffect, useState } from "react";
import { Clinic } from "@/models/Clinic";
import { fetchDoctorById } from "@/services/doctorService";

export interface Doctor {
  id: number;
  firstname: string;
  name: string;
  lastname: string;
  about: string;
  qualification: string;
  desgination: string;
  email: string;
  expYear: number;
  specializationList: Specialization[];
  clinics: Clinic[];
  languageList: LanguagesList[];
  branchList: Branch[];
  serviceList: ServiceList[];
  patitientList: PatientList[];
  phone: string;
  pincode: string;
  joiningDate: Date;
  biography: string;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  bio: string;
  languages: string[];
  education: {
    degree: string;
    institute: string;
    year: string;
  }[];
  services: string[];
}

export interface Specialization {
  id: string;
  name: string;
}

export interface ServiceList {
  id: string;
  name: string;
}

export interface LanguagesList {
  id: string;
  name: string;
}

export interface Branch {
  id: number;
  name: string;
  location: string;
  state: string;
  city: string;
  district: string;
  pincode: string;
  country: string;
  latitude: number;
  longitude: number;
  code?: string;
  active?: boolean;
  mapurl?: string;
  image?: string;
}

export interface PatientList {
  id: number;
  firstname: string;
  lastname: string;
}

const DoctorDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [doctor, setDoctorsDetails] = useState<Doctor>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoctorDetails(Number(id));
  }, [id]);

  const fetchDoctorDetails = async (id: number) => {
    try {
      setLoading(true);
      const data = await fetchDoctorById(id);
      
      if (data.data && data.data.branchList) {
        data.data.branchList = data.data.branchList.map((branch: any) => ({
          ...branch,
          code: branch.code || '',
          active: branch.active !== undefined ? branch.active : true,
          mapurl: branch.mapurl || '',
          image: branch.image || ''
        }));
      }
      
      if (data.data && typeof data.data.consultationFee === 'string') {
        data.data.consultationFee = Number(data.data.consultationFee);
      }
      
      setDoctorsDetails(data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const [isRequiredLogin, setIsRequiredLogin] = useState<number>();

  const handleButtonClick = () => {
    setIsRequiredLogin(Math.random());
  };

  if (!doctor) {
    return (
      <AppLayout>
        <div className="container px-4 py-6 max-w-6xl mx-auto">
          <p>Loading doctor details...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-6xl mx-auto">
        <Link to="/doctor/search" className="flex items-center text-primary mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to search
        </Link>

        <DoctorHeader
          doctor={doctor}
          id={id || ""}
          specializationList={doctor.specializationList}
          languageList={doctor.languageList}
          clinics={doctor.clinics}
          onButtonClick={handleButtonClick}
        />

        <DoctorDetailsTabs
          doctor={doctor}
          clinics={doctor.clinics}
          specializationList={doctor.specializationList}
          branchList={doctor.branchList}
          languageList={doctor.languageList}
          serviceList={doctor.serviceList}
        />

        <SimilarDoctors
          specialties={doctor.specializationList}
          latitude={doctor.branchList[0]?.latitude}
          longitude={doctor.branchList[0]?.longitude}
          excludeDoctorId={parseInt(id || "0")}
        />
      </div>
    </AppLayout>
  );
};

export default DoctorDetails;
