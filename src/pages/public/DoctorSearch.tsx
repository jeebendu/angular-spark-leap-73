import { AppLayout } from "@/components/AppLayout";
import { BookingModal } from "@/components/public/appointments/BookingModal";
import { BookingSuccessDialog } from "@/components/public/appointments/BookingSuccessDialog";
import { DoctorFilters } from "@/components/public/doctor/search/DoctorFilters";
import { DoctorSearchBar } from "@/components/public/doctor/search/DoctorSearchBar";
import { DoctorsList } from "@/components/public/doctor/search/DoctorsList";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { setPageTitle, updateMetaTags } from "@/utils/seoUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DoctorSearch = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const initialSpecialty = searchParams.get("specialty") || "";
  
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
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [showNoMoreDoctors, setShowNoMoreDoctors] = useState(false);
  
  const observer = useRef<IntersectionObserver>();
  const { toast } = useToast();

  useEffect(() => {
    setPageTitle("Find Doctors");
    updateMetaTags(
      "Search and find the best doctors near you. Filter by specialty, experience, gender, and more.",
      "doctor search, find specialist, medical professionals, healthcare providers"
    );
    
    setLoading(true);
    setTimeout(() => {
      const initialDoctors = [...Array(12)].map((_, index) => ({
        id: String(index + 1),
        name: `Dr. ${["Robert", "Emily", "James", "Sarah", "Michael", "Jennifer", "David", "Maria", "Thomas", "Jessica", "William", "Lisa"][index % 12]} ${["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"][index % 10]}`,
        specialty: ["Cardiologist", "Neurologist", "Orthopedist", "Dermatologist", "Pediatrician", "Ophthalmologist", "Dentist", "Gynecologist", "ENT Specialist", "Psychiatrist"][index % 10],
        rating: 4 + (index % 10) / 10,
        reviewCount: 80 + index * 5,
        price: 900 + index * 100,
        imageSrc: `https://res.cloudinary.com/dzxuxfagt/image/upload/w_150,h_150,c_thumb,g_face/assets/doctor_placeholder.png`,
        experience: `${8 + (index % 15)}+ years`,
        languages: index % 3 === 0 ? ["English", "Hindi", "Tamil"] : ["English", "Hindi"],
        clinics: doctorClinics[index % doctorClinics.length]
      }));
      
      setDoctors(initialDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  const lastDoctorElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreDoctors();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadMoreDoctors = () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    
    setTimeout(() => {
      if (page >= 3) {
        setHasMore(false);
        setShowNoMoreDoctors(true);
        setLoading(false);
        return;
      }
      
      const newDoctors = [...Array(8)].map((_, index) => {
        const realIndex = page * 12 + index;
        return {
          id: String(realIndex + 1),
          name: `Dr. ${["Robert", "Emily", "James", "Sarah", "Michael", "Jennifer", "David", "Maria", "Thomas", "Jessica", "William", "Lisa"][realIndex % 12]} ${["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"][realIndex % 10]}`,
          specialty: ["Cardiologist", "Neurologist", "Orthopedist", "Dermatologist", "Pediatrician", "Ophthalmologist", "Dentist", "Gynecologist", "ENT Specialist", "Psychiatrist"][realIndex % 10],
          rating: 4 + (realIndex % 10) / 10,
          reviewCount: 80 + realIndex * 5,
          price: 900 + realIndex * 100,
          imageSrc: `https://placehold.co/400x300/eaf7fc/33C3F0?text=Dr.+${realIndex+1}&font=montserrat`,
          experience: `${8 + (realIndex % 15)}+ years`,
          languages: realIndex % 3 === 0 ? ["English", "Hindi", "Tamil"] : ["English", "Hindi"],
          clinics: doctorClinics[realIndex % doctorClinics.length]
        };
      });
      
      setDoctors(prev => [...prev, ...newDoctors]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (initialSpecialty) {
      toast({
        title: "Filter Applied",
        description: `Showing doctors specialized in ${initialSpecialty}`,
      });
    }
  }, [initialSpecialty]);

  useEffect(() => {
    if (isMobile) {
      setFilterOpen(false);
    } else {
      setFilterOpen(true);
    }
  }, [isMobile]);

  const toggleSpecialty = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };
  
  const toggleGender = (gender: string) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter(g => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };
  
  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  
  const toggleExperience = (experience: string) => {
    if (selectedExperience.includes(experience)) {
      setSelectedExperience(selectedExperience.filter(e => e !== experience));
    } else {
      setSelectedExperience([...selectedExperience, experience]);
    }
  };
  
  const handleBookAppointment = (doctorName: string, clinicId?: string) => {
    setSelectedDoctor(doctorName);
    setBookingOpen(true);
    setBookingStep(1);
    
    if (clinicId) {
      setSelectedClinic(clinicId);
      setBookingStep(2);
    }
  };
  
  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };
  
  const nextStep = () => {
    if (bookingStep < 4) {
      setBookingStep(bookingStep + 1);
    } else {
      setBookingOpen(false);
      setSuccessDialogOpen(true);
    }
  };
  
  const prevStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
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
        
        <BookingModal
          open={bookingOpen}
          onOpenChange={setBookingOpen}
          bookingStep={bookingStep}
          selectedDoctor={selectedDoctor}
          selectedClinic={selectedClinic}
          date={date}
          selectedSlot={selectedSlot}
          timeSlots={timeSlots}
          doctors={doctors}
          setSelectedClinic={setSelectedClinic}
          setDate={setDate}
          handleSlotSelection={handleSlotSelection}
          nextStep={nextStep}
          prevStep={prevStep}
        />
        
        <BookingSuccessDialog
          open={successDialogOpen}
          onOpenChange={setSuccessDialogOpen}
          selectedDoctor={selectedDoctor}
          selectedClinic={selectedClinic}
          date={date}
          selectedSlot={selectedSlot}
          doctors={doctors}
        />
      </div>
    </AppLayout>
  );
};

export default DoctorSearch;
