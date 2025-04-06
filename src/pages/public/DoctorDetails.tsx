import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Doctor } from "@/models/Doctor";
import { fetchDoctorById } from "@/services/DoctorService"; // Import the service function
import { DoctorHeader } from "@/components/public/doctor/details/DoctorHeader";
import { DoctorDetailsTabs } from "@/components/public/doctor/details/DoctorDetailsTabs";
import { SimilarDoctors } from "@/components/public/doctor/details/SimilarDoctors";

const DoctorDetails = () => {
  const { doctorId } = useParams(); // Get the doctor ID from the URL
  console.log("Doctor ID:", doctorId);
  const location = useLocation();
  const [doctor, setDoctor] = useState<Doctor | null>(null); // State to store doctor data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading

  useEffect(() => {
    const loadDoctor = async () => {
      if (doctorId) {
        try {
          setLoading(true); // Set loading to true before fetching
          const response = await fetchDoctorById(doctorId); // Fetch doctor data
          setDoctor(response.data); // Update state with fetched data
        } catch (error) {
          console.error("Failed to fetch doctor details:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };

    loadDoctor();
  }, [doctorId]); // Re-run the effect when the ID changes

  // Show loading state if data is being fetched
  if (loading) {
    return (
      <AppLayout>
        <div className="container px-4 py-6 max-w-6xl mx-auto">
          <p>Loading doctor details...</p>
        </div>
      </AppLayout>
    );
  }

  // Show a message if no doctor data is found
  if (!doctor) {
    return (
      <AppLayout>
        <div className="container px-4 py-6 max-w-6xl mx-auto">
          <p>Doctor not found.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-6xl mx-auto">
        {/* Back button */}
        <Link to="/doctor/search" className="flex items-center text-primary mb-6 hover:underline">
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