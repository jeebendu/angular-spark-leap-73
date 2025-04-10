
import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Doctor } from "@/models/doctor/Doctor";
import { fetchDoctorById } from "@/services/DoctorService"; // Import the service function
import { DoctorHeader } from "@/components/public/doctor/details/DoctorHeader";
import { DoctorDetailsTabs } from "@/components/public/doctor/details/DoctorDetailsTabs";
import { SimilarDoctors } from "@/components/public/doctor/details/SimilarDoctors";
import { setPageTitle, updateMetaTags } from "@/utils/seoUtils";

const DoctorDetails = () => {
  const { doctorId } = useParams(); // Get the doctor ID from the URL
  // console.log("Doctor ID:", doctorId);
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
          
          // Set SEO tags once doctor data is loaded
          if (response.data) {
            const doctorName = response.data.firstname + " " + response.data.lastname;
            const specialty = Array.isArray(response.data.specializationList) && response.data.specializationList.length > 0
            ? response.data.specializationList[0].name
            : '';
            setPageTitle(`${doctorName} - ${specialty} | ClinicHub.care`);
            updateMetaTags(
              `Book an appointment with ${doctorName}, ${specialty} with ${response.data.expYear} years of experience. View doctor details, clinics, and available time slots.`,
              `doctor, ${specialty}, medical appointment, healthcare, clinichub`
            );
          }
        } catch (error) {
          console.error("Failed to fetch doctor details:", error);
          setPageTitle("Doctor Details | ClinicHub.care");
          updateMetaTags(
            "Doctor profile not found. Browse other doctors or specialists available on ClinicHub.",
            "doctor not found, healthcare, clinichub"
          );
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
        <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading doctors...</p>
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
