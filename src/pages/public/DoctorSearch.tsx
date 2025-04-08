import { AppLayout } from "@/components/AppLayout";
import { BookAppointmentModal } from "@/components/public/appointments/BookAppointmentModal";
import { DoctorFilters } from "@/components/public/doctor/search/DoctorFilters";
import { DoctorSearchBar } from "@/components/public/doctor/search/DoctorSearchBar";
import { DoctorsList } from "@/components/public/doctor/search/DoctorsList";
import { useIsMobile } from "@/hooks/use-mobile";
import { DoctorSearchForm, DoctorSearchPageble, DoctorSearchView } from "@/models/doctor/Doctor";
import { fetchAllDoctorClinics } from "@/services/DoctorService";
import { setPageTitle, updateMetaTags } from "@/utils/seoUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DoctorSearch = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const initialSpecialty = searchParams.get("specialty") || "";
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const radius = searchParams.get("radius") ? parseFloat(searchParams.get("radius")!) : null;

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 2000]);
  const isMobile = useIsMobile();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    initialSpecialty ? [initialSpecialty] : []
  );
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [doctors, setDoctors] = useState<DoctorSearchView[]>([]);
  const [showNoMoreDoctors, setShowNoMoreDoctors] = useState(false);
  const [bookAppointmentOpen, setBookAppointmentOpen] = useState(false);
  const [initialStep, setInitialStep] = useState(1);

  const observer = useRef<IntersectionObserver>();


  const isFetching = useRef(false); // Move this to the top level of the component

  useEffect(() => {
    setPageTitle("Find Doctors");
    updateMetaTags(
      "Search and find the best doctors near you. Filter by specialty, experience, gender, and more.",
      "doctor search, find specialist, medical professionals, healthcare providers"
    );

    const fetchDoctors = async (pageNumber: number) => {
      if (isFetching.current) return; // Prevent duplicate calls
      isFetching.current = true;

      setLoading(true);
      try {
        const searchFilters: DoctorSearchForm = {
          doctorName: searchTerm || undefined,
          clinicName: selectedClinic || undefined,
          gender: selectedGenders.length > 0 ? parseInt(selectedGenders[0], 10) : undefined,
          expYearFirst: selectedExperience.length > 0 ? parseInt(selectedExperience[0], 10) : undefined,
          expYearLast: selectedExperience.length > 1 ? parseInt(selectedExperience[1], 10) : undefined,
          radius: radius || 50,
          latitude: latitude ? parseFloat(latitude) : undefined,
          longitude: longitude ? parseFloat(longitude) : undefined,
        };

        const response = await fetchAllDoctorClinics({ ...searchFilters, page: pageNumber, size: 10 });
        const data: DoctorSearchPageble = response.data;
        const doctorClinicData = data.content;
        setDoctors((prev) => [...prev, ...doctorClinicData]);
        setHasMore(!data.last);
      } catch (error) {
        console.error("Error fetching doctor clinics:", error);
      } finally {
        setLoading(false);
        isFetching.current = false; // Reset API call status
      }
    };

    fetchDoctors(page);
  }, [page]);

  const lastDoctorElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );


  useEffect(() => {
    if (isMobile) {
      setFilterOpen(false);
    } else {
      setFilterOpen(true);
    }
  }, [isMobile]);

  const toggleSpecialty = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const toggleGender = (gender: string) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter((g) => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const toggleExperience = (experience: string) => {
    if (selectedExperience.includes(experience)) {
      setSelectedExperience(selectedExperience.filter((e) => e !== experience));
    } else {
      setSelectedExperience([...selectedExperience, experience]);
    }
  };
  
  const handleBookAppointment = (doctorName: string, clinicId?: string) => {
    setSelectedDoctor(doctorName);
    setBookAppointmentOpen(true);
    setInitialStep(1);
    
    if (clinicId) {
      setSelectedClinic(clinicId);
      setInitialStep(2);
    } else {
      setSelectedClinic(null);
    }
  };
  
  const applyFilters = () => {
    if (isMobile) {
      setFilterOpen(false);
    }
  };
  
  return (
    <AppLayout>
      <div className="container px-2 sm:px-4 py-3 sm:py-6">
        <DoctorSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          selectedSpecialties={selectedSpecialties}
          selectedGenders={selectedGenders}
          selectedLanguages={selectedLanguages}
          selectedExperience={selectedExperience}
          priceRange={priceRange}
          toggleSpecialty={toggleSpecialty}
          toggleGender={toggleGender}
          toggleLanguage={toggleLanguage}
          toggleExperience={toggleExperience}
          setPriceRange={setPriceRange}
          applyFilters={applyFilters}
          setSelectedSpecialties={setSelectedSpecialties}
          setSelectedGenders={setSelectedGenders}
          setSelectedLanguages={setSelectedLanguages}
          setSelectedExperience={setSelectedExperience}
        />
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4">
          {!isMobile && (
            <div className="w-full md:w-64 shrink-0">
              <DoctorFilters 
                selectedSpecialties={selectedSpecialties}
                selectedGenders={selectedGenders}
                selectedLanguages={selectedLanguages}
                selectedExperience={selectedExperience}
                priceRange={priceRange}
                toggleSpecialty={toggleSpecialty}
                toggleGender={toggleGender}
                toggleLanguage={toggleLanguage}
                toggleExperience={toggleExperience}
                setPriceRange={setPriceRange}
                applyFilters={applyFilters}
              />
            </div>
          )}
          
          <div className="flex-1">
            <DoctorsList
              doctors={doctors}
              viewMode={viewMode}
              lastDoctorElementRef={lastDoctorElementRef}
              loading={loading}
              handleBookAppointment={handleBookAppointment}
              showNoMoreDoctors={showNoMoreDoctors}
            />
          </div>
        </div>
        
        <BookAppointmentModal
          doctorName={selectedDoctor || undefined}
          initialClinicId={selectedClinic || undefined}
          initialStep={initialStep}
          trigger={<></>}
          open={bookAppointmentOpen}
          onOpenChange={setBookAppointmentOpen} doctor={undefined}        />
      </div>
    </AppLayout>
  );
};

export default DoctorSearch;
