
import { Link, useParams, useLocation } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft } from "lucide-react";
import { DoctorHeader } from "@/components/doctor/DoctorHeader";
import { DoctorDetailsTabs } from "@/components/doctor/DoctorDetailsTabs";
import { SimilarDoctors } from "@/components/doctor/SimilarDoctors";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Type for doctor
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  experience: string;
  rating: number;
  reviewCount: number;
  consultationFee: string;
  bio: string;
  languages: string[];
  education: {
    degree: string;
    institute: string;
    year: string;
  }[];
  services: string[];
  clinics: {
    name: string;
    address: string;
    phone: string;
    timings: string;
    days: string;
  }[];
}

const DoctorDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  
  // Use an effect to load doctor data and only re-run when ID changes
  useEffect(() => {
    // In a real app, this would fetch from API
    const mockDoctor: Doctor = {
      id: id || "1",
      name: "Dr. Emily Johnson",
      specialty: "Cardiologist",
      qualifications: "MBBS, MD (Cardiology), DNB",
      experience: "12+ years",
      rating: 4.8,
      reviewCount: 235,
      consultationFee: "1,200",
      bio: "Dr. Emily Johnson is a highly skilled cardiologist with over 12 years of experience in diagnosing and treating heart diseases. She specializes in interventional cardiology and has performed more than 1,000 cardiac procedures.",
      languages: ["English", "Hindi", "Tamil"],
      education: [
        { degree: "MBBS", institute: "AIIMS, New Delhi", year: "2008" },
        { degree: "MD (Cardiology)", institute: "PGIMER, Chandigarh", year: "2012" },
        { degree: "DNB (Cardiology)", institute: "National Board of Examinations", year: "2013" }
      ],
      services: [
        "Comprehensive Cardiac Evaluation",
        "Echocardiography",
        "ECG",
        "Stress Testing",
        "Heart Disease Management",
        "Heart Failure Treatment"
      ],
      clinics: [
        {
          name: "HeartCare Clinic",
          address: "123 ABC Road, Koramangala, Bangalore",
          phone: "+91 9876543210",
          timings: "9:00 AM - 6:00 PM",
          days: "Monday to Saturday"
        },
        {
          name: "City Heart Center",
          address: "456 XYZ Road, Indiranagar, Bangalore",
          phone: "+91 9876543211",
          timings: "10:00 AM - 4:00 PM",
          days: "Monday, Wednesday, Friday"
        }
      ]
    };
    
    // For demo, let's pretend we're fetching data
    const timer = setTimeout(() => {
      setDoctor(mockDoctor);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [id]); // Only re-run if the ID changes
  
  // Show loading state if doctor is null
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
        {/* Back button */}
        <Link to="/doctor-search" className="flex items-center text-primary mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to search
        </Link>
        
        {/* Doctor Header */}
        <div className="relative">
          <DoctorHeader doctor={doctor} />
          
          {/* Bio card that overlaps */}
          <Card className="mx-4 -mt-6 mb-6 relative z-10 shadow-md">
            <CardContent className="p-4 text-gray-700 text-sm leading-relaxed">
              {doctor.bio}
            </CardContent>
          </Card>
        </div>
        
        {/* Doctor Details Tabs */}
        <DoctorDetailsTabs doctor={doctor} />
        
        {/* Similar Doctors */}
        <SimilarDoctors />
      </div>
    </AppLayout>
  );
};

export default DoctorDetails;
