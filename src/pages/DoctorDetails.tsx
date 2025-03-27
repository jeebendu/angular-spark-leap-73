
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft } from "lucide-react";
import { DoctorHeader } from "@/components/doctor/DoctorHeader";
import { DoctorDetailsTabs } from "@/components/doctor/DoctorDetailsTabs";
import { SimilarDoctors } from "@/components/doctor/SimilarDoctors";

const DoctorDetails = () => {
  const { id } = useParams();
  
  // Mock doctor data (in a real app, you'd fetch this based on the ID)
  const doctor = {
    id: id || "1",
    name: "Dr. Emily Johnson",
    specialty: "Cardiologist",
    qualifications: "MBBS, MD (Cardiology), DNB",
    experience: "12+ years",
    rating: 4.8,
    reviewCount: 235,
    consultationFee: "₹1,200",
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

  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-6xl mx-auto">
        {/* Back button */}
        <Link to="/doctor-search" className="flex items-center text-primary mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to search
        </Link>
        
        {/* Doctor Header */}
        <DoctorHeader doctor={doctor} />
        
        {/* Doctor Details Tabs */}
        <DoctorDetailsTabs doctor={doctor} />
        
        {/* Similar Doctors */}
        <SimilarDoctors />
      </div>
    </AppLayout>
  );
};

export default DoctorDetails;
