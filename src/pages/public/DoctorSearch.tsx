
import { AppLayout } from "@/components/AppLayout";
import { BookAppointmentModal } from "@/components/public/appointments/BookAppointmentModal";
import { DoctorFilters } from "@/components/public/doctor/search/DoctorFilters";
import { DoctorSearchBar } from "@/components/public/doctor/search/DoctorSearchBar";
import { DoctorsList } from "@/components/public/doctor/search/DoctorsList";
import { useIsMobile } from "@/hooks/use-mobile";
import { DoctorSearchForm, DoctorSearchPageble, DoctorSearchView } from "@/models/doctor/Doctor";
import { searchDoctorClinics } from "@/services/DoctorClinicService";
import { setPageTitle, updateMetaTags } from "@/utils/seoUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

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
  const [page, setPage] = useState(0); // Changed to start from 0 for API pagination
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [doctors, setDoctors] = useState<DoctorSearchView[]>([]);
  const [showNoMoreDoctors, setShowNoMoreDoctors] = useState(false);
  const [bookAppointmentOpen, setBookAppointmentOpen] = useState(false);
  const [initialStep, setInitialStep] = useState(1);
  const { toast } = useToast();

  const observer = useRef<IntersectionObserver>();
  const isFetching = useRef(false);

  // This is the main function to fetch doctors with filters
  const fetchDoctorsWithFilters = useCallback(async (pageNumber: number, resetList: boolean = false) => {
    if (isFetching.current) return;
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

      // If specialties are selected, add them to the search filters
      if (selectedSpecialties.length > 0) {
        // You may need to modify this based on your API requirements
        searchFilters.specialtyNames = selectedSpecialties;
      }

      // If languages are selected, add them to the search filters
      if (selectedLanguages.length > 0) {
        searchFilters.languageNames = selectedLanguages;
      }

      // Apply sorting based on sortBy value
      if (sortBy !== "relevance") {
        switch (sortBy) {
          case "rating":
            searchFilters.sortBy = "rating";
            searchFilters.sortDirection = "DESC";
            break;
          case "price_low":
            searchFilters.sortBy = "price";
            searchFilters.sortDirection = "ASC";
            break;
          case "price_high":
            searchFilters.sortBy = "price";
            searchFilters.sortDirection = "DESC";
            break;
          case "experience":
            searchFilters.sortBy = "experienceYears";
            searchFilters.sortDirection = "DESC";
            break;
        }
      }

      const response = await searchDoctorClinics(searchFilters, pageNumber, 10);
      const data = response.data;
      
      if (resetList) {
        setDoctors(data.content);
      } else {
        setDoctors((prev) => [...prev, ...data.content]);
      }
      
      setHasMore(!data.last);
      setShowNoMoreDoctors(data.content.length === 0 || data.last);
    } catch (error) {
      console.error("Error fetching doctor clinics:", error);
      toast({
        title: "Error",
        description: "Failed to load doctors. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [searchTerm, selectedClinic, selectedGenders, selectedExperience, selectedSpecialties, selectedLanguages, radius, latitude, longitude, sortBy, toast]);

  // Initial load of doctors
  useEffect(() => {
    setPageTitle("Find Doctors");
    updateMetaTags(
      "Search and find the best doctors near you. Filter by specialty, experience, gender, and more.",
      "doctor search, find specialist, medical professionals, healthcare providers"
    );
    
    fetchDoctorsWithFilters(0, true);
  }, [fetchDoctorsWithFilters]);

  // Handle infinite scroll
  const lastDoctorElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
          fetchDoctorsWithFilters(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchDoctorsWithFilters, page]
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
  
  // Apply filters when the user clicks Apply
  const applyFilters = () => {
    // Reset page to 0 when applying new filters
    setPage(0);
    // Fetch doctors with the new filters, resetting the list
    fetchDoctorsWithFilters(0, true);
    
    if (isMobile) {
      setFilterOpen(false);
    }
  };

  // Handle search term changes
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    // Don't trigger API call here, let the user apply filters manually
  };

  // Handle sort changes
  const handleSortByChange = (value: string) => {
    setSortBy(value);
    // Reset page and fetch with new sort
    setPage(0);
    fetchDoctorsWithFilters(0, true);
  };
  
  return (
    <AppLayout>
      <div className="container px-2 sm:px-4 py-3 sm:py-6">
        <DoctorSearchBar
          searchTerm={searchTerm}
          setSearchTerm={handleSearchTermChange}
          sortBy={sortBy}
          setSortBy={handleSortByChange}
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
          onOpenChange={setBookAppointmentOpen} 
          doctor={undefined}        
        />
      </div>
    </AppLayout>
  );
};

export default DoctorSearch;
