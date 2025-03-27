
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { DoctorCard } from "@/components/DoctorCard";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowUpDown,
  Calendar,
  Check,
  Clock,
  Filter,
  Heart,
  LayoutList,
  MapPin,
  Rows,
  Search, 
  SlidersHorizontal, 
  Star, 
  X,
  HelpCircle,
  Building,
  Navigation
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useLocation } from "@/contexts/LocationContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

const DoctorSearch = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const initialSpecialty = searchParams.get("specialty") || "";
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [priceRange, setPriceRange] = useState([500, 2000]);
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
  const isMobile = useIsMobile();
  const { location } = useLocation();
  const { toast } = useToast();
  
  const specialties = [
    "All Specialties",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Internal Medicine",
    "Ophthalmology",
    "Dentistry",
    "Gynecology"
  ];

  const genders = ["Male", "Female"];
  const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"];
  const experienceRanges = ["0-5 years", "5-10 years", "10-15 years", "15+ years"];
  
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];

  const doctorClinics = [
    [
      { id: "1a", name: "HeartCare Clinic", location: "Koramangala", distance: "2.3 km", available: true },
      { id: "1b", name: "City Heart Center", location: "Indiranagar", distance: "5.1 km", available: true }
    ],
    [
      { id: "2a", name: "Neuroscience Institute", location: "JP Nagar", distance: "4.5 km", available: true },
      { id: "2b", name: "Brain & Spine Center", location: "Whitefield", distance: "12.3 km", available: false },
      { id: "2c", name: "City Neuro Hospital", location: "MG Road", distance: "3.8 km", available: true }
    ],
    [
      { id: "3a", name: "Orthopedic Specialties", location: "Marathahalli", distance: "8.7 km", available: true }
    ],
    [
      { id: "4a", name: "Skin & Care Center", location: "Jayanagar", distance: "6.2 km", available: true },
      { id: "4b", name: "Derma Solutions", location: "Electronic City", distance: "15.4 km", available: false }
    ],
    [
      { id: "5a", name: "Kids Care Hospital", location: "Banashankari", distance: "7.1 km", available: true },
      { id: "5b", name: "Children's Special Clinic", location: "HSR Layout", distance: "4.3 km", available: true }
    ],
    [
      { id: "6a", name: "General Health Center", location: "Malleshwaram", distance: "9.8 km", available: true },
      { id: "6b", name: "Family Health Clinic", location: "BTM Layout", distance: "3.5 km", available: true }
    ],
    [
      { id: "7a", name: "Vision Care Center", location: "Richmond Road", distance: "2.9 km", available: true },
      { id: "7b", name: "Eye Specialists", location: "Koramangala", distance: "2.1 km", available: true }
    ],
    [
      { id: "8a", name: "Dental Care Clinic", location: "Indiranagar", distance: "4.7 km", available: true },
      { id: "8b", name: "Smile Specialists", location: "JP Nagar", distance: "5.3 km", available: true }
    ],
    [
      { id: "9a", name: "Women's Health Center", location: "Jayanagar", distance: "6.4 km", available: true },
      { id: "9b", name: "Mother & Child Clinic", location: "Whitefield", distance: "13.2 km", available: false }
    ]
  ];

  // Generate initial set of doctors
  useEffect(() => {
    // Simulate API fetch delay
    setLoading(true);
    setTimeout(() => {
      const initialDoctors = [...Array(12)].map((_, index) => ({
        id: String(index + 1),
        name: `Dr. ${["Robert", "Emily", "James", "Sarah", "Michael", "Jennifer", "David", "Maria", "Thomas", "Jessica", "William", "Lisa"][index % 12]} ${["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"][index % 10]}`,
        specialty: ["Cardiologist", "Neurologist", "Orthopedist", "Dermatologist", "Pediatrician", "Ophthalmologist", "Dentist", "Gynecologist", "ENT Specialist", "Psychiatrist"][index % 10],
        rating: 4 + (index % 10) / 10,
        reviewCount: 80 + index * 5,
        price: 900 + index * 100,
        imageSrc: `https://placehold.co/400x300/eaf7fc/33C3F0?text=Dr.+${index+1}&font=montserrat`,
        experience: `${8 + (index % 15)}+ years`,
        languages: index % 3 === 0 ? ["English", "Hindi", "Tamil"] : ["English", "Hindi"],
        clinics: doctorClinics[index % doctorClinics.length]
      }));
      
      setDoctors(initialDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  // Setup infinite scrolling
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
    
    // Simulate API fetch with timeout
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
    // If initial specialty was provided, apply the filter
    if (initialSpecialty) {
      // Filter logic would be implemented here in a real app
      toast({
        title: "Filter Applied",
        description: `Showing doctors specialized in ${initialSpecialty}`,
      });
    }
  }, [initialSpecialty]);

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
      // If clinic is selected directly, skip to step 2
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

  // Filter function to help with tooltips and contextual help
  const getFilterHelp = (filterType: string) => {
    switch (filterType) {
      case 'specialty':
        return "Select specialties to find doctors with specific expertise";
      case 'gender':
        return "Filter doctors by gender preference";
      case 'experience':
        return "Find doctors with your preferred years of medical experience";
      case 'languages':
        return "Filter doctors who speak specific languages";
      case 'price':
        return "Set your budget range for consultation fees";
      case 'availability':
        return "Find doctors with appointments available soon";
      case 'rating':
        return "Filter by patient satisfaction ratings";
      default:
        return "Apply filters to refine your search";
    }
  };
  
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Find the Right Doctor</h1>
        <p className="text-muted-foreground">Search from our network of specialized doctors</p>
        {location.locality && (
          <div className="flex items-center mt-2 text-sm text-primary">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Showing results near {location.locality}</span>
          </div>
        )}
      </div>
      
      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by doctor name, specialty, condition..."
            className="pl-10 pr-4 py-2 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] md:flex hidden">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
            </SelectContent>
          </Select>
          
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")}>
            <ToggleGroupItem value="grid" aria-label="Grid view" className="md:flex hidden">
              <LayoutList className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view" className="md:flex hidden">
              <Rows className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          {isMobile ? (
            <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border border-gray-200 bg-white"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white sm:max-w-md modal-background">
                <DialogHeader>
                  <DialogTitle className="flex justify-between items-center">
                    <span>Filters</span>
                    <DialogClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </DialogClose>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
                  {/* Mobile filters */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Specialty</h3>
                    <div className="flex flex-wrap gap-2">
                      {specialties.map((specialty) => (
                        <Button
                          key={specialty}
                          variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full text-xs ${selectedSpecialties.includes(specialty) ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => toggleSpecialty(specialty)}
                        >
                          {specialty}
                          {selectedSpecialties.includes(specialty) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Gender</h3>
                    <div className="flex flex-wrap gap-2">
                      {genders.map((gender) => (
                        <Button
                          key={gender}
                          variant={selectedGenders.includes(gender) ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full text-xs ${selectedGenders.includes(gender) ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => toggleGender(gender)}
                        >
                          {gender}
                          {selectedGenders.includes(gender) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Experience</h3>
                    <div className="flex flex-wrap gap-2">
                      {experienceRanges.map((experience) => (
                        <Button
                          key={experience}
                          variant={selectedExperience.includes(experience) ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full text-xs ${selectedExperience.includes(experience) ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => toggleExperience(experience)}
                        >
                          {experience}
                          {selectedExperience.includes(experience) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((language) => (
                        <Button
                          key={language}
                          variant={selectedLanguages.includes(language) ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full text-xs ${selectedLanguages.includes(language) ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => toggleLanguage(language)}
                        >
                          {language}
                          {selectedLanguages.includes(language) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[500, 2000]}
                        max={5000}
                        step={100}
                        onValueChange={(value) => setPriceRange(value)}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Availability</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Available Today</span>
                        <Switch id="available-today" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Available This Week</span>
                        <Switch id="available-week" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Rating</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm flex items-center">
                          <span>4+</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                        </span>
                        <Switch id="rating-4" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm flex items-center">
                          <span>3+</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                        </span>
                        <Switch id="rating-3" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full sky-button">Apply Filters</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border border-gray-200 bg-white"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        {!isMobile && (
          <div className="w-full md:w-64 shrink-0">
            <Card className="sticky top-24 border-none card-shadow">
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-4 flex items-center justify-between">
                  <span>Filters</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64 text-xs">Apply filters to narrow down your search results</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Specialty</h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">{getFilterHelp('specialty')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {specialties.map((specialty) => (
                        <Button
                          key={specialty}
                          variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full text-xs ${selectedSpecialties.includes(specialty) ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => toggleSpecialty(specialty)}
                        >
                          {specialty}
                          {selectedSpecialties.includes(specialty) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Gender</h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">{getFilterHelp('gender')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {genders.map((gender) => (
                        <Button
                          key={gender}
                          variant={selectedGenders.includes(gender) ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full text-xs ${selectedGenders.includes(gender) ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => toggleGender(gender)}
                        >
                          {gender}
                          {selectedGenders.includes(gender) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Experience</h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">{getFilterHelp('experience')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experienceRanges.map((experience) => (
                        <Button
                          key={experience}
                          variant={selectedExperience.includes(experience) ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full text-xs ${selectedExperience.includes(experience) ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => toggleExperience(experience)}
                        >
                          {experience}
                          {selectedExperience.includes(experience) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Languages</h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">{getFilterHelp('languages')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((language) => (
                        <Button
                          key={language}
                          variant={selectedLanguages.includes(language) ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full text-xs ${selectedLanguages.includes(language) ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => toggleLanguage(language)}
                        >
                          {language}
                          {selectedLanguages.includes(language) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Price Range</h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">{getFilterHelp('price')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="px-2">
                      <Slider
                        defaultValue={[500, 2000]}
                        max={5000}
                        step={100}
                        onValueChange={(value) => setPriceRange(value)}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Availability</h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">{getFilterHelp('availability')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Switch id="desktop-available-today" className="mr-2" />
                        <label htmlFor="desktop-available-today" className="text-sm">
                          Available Today
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Switch id="desktop-available-week" className="mr-2" />
                        <label htmlFor="desktop-available-week" className="text-sm">
                          Available This Week
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Rating</h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-xs">{getFilterHelp('rating')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Switch id="desktop-rating-4-plus" className="mr-2" />
                        <label htmlFor="desktop-rating-4-plus" className="text-sm flex items-center">
                          <span>4+</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Switch id="desktop-rating-3-plus" className="mr-2" />
                        <label htmlFor="desktop-rating-3-plus" className="text-sm flex items-center">
                          <span>3+</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full sky-button">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Doctor Results */}
        <div className="flex-1">
          {loading && doctors.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading doctors...</p>
            </div>
          )}
          
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.map((doctor, index) => {
                // Determine if this is the last element for infinite scroll
                const isLastItem = index === doctors.length - 1;
                
                return (
                  <motion.div
                    key={doctor.id}
                    ref={isLastItem ? lastDoctorElementRef : null}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index % 12 * 0.05, duration: 0.3 }}
                  >
                    <DoctorCard
                      id={doctor.id}
                      name={doctor.name}
                      specialty={doctor.specialty}
                      rating={doctor.rating}
                      reviewCount={doctor.reviewCount}
                      price={`₹${doctor.price}`}
                      imageSrc={doctor.imageSrc}
                      experience={doctor.experience}
                      languages={doctor.languages}
                      clinics={doctor.clinics}
                      onBookNow={(name) => handleBookAppointment(name)}
                    />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {doctors.map((doctor, index) => {
                // Determine if this is the last element for infinite scroll
                const isLastItem = index === doctors.length - 1;
                
                return (
                  <motion.div
                    key={doctor.id}
                    ref={isLastItem ? lastDoctorElementRef : null}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index % 12 * 0.05, duration: 0.3 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-none card-shadow group-hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 w-full aspect-[3/2] md:aspect-square relative">
                            <img 
                              src={doctor.imageSrc}
                              alt={doctor.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary flex items-center">
                              <Heart className="h-3 w-3 mr-1 fill-red-500 text-red-500" />
                              98% Recommended
                            </div>
                          </div>
                          
                          <div className="flex-1 p-4 flex flex-col md:flex-row">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-base md:text-lg">{doctor.name}</h3>
                                  <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
                                  
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium">{doctor.rating}</span>
                                    <span className="text-sm text-muted-foreground">({doctor.reviewCount})</span>
                                  </div>
                                </div>
                                
                                <span className="font-semibold md:text-lg">₹{doctor.price}</span>
                              </div>
                              
                              <div className="mt-3 flex flex-wrap gap-2">
                                <div className="px-3 py-1 bg-gray-100 rounded-full text-xs flex items-center">
                                  <span>{doctor.experience}</span>
                                </div>
                                <div className="px-3 py-1 bg-gray-100 rounded-full text-xs flex items-center">
                                  <span>{doctor.languages.join(", ")}</span>
                                </div>
                                <div className="px-3 py-1 bg-gray-100 rounded-full text-xs flex items-center">
                                  <span>Available today</span>
                                </div>
                              </div>
                              
                              <div className="mt-3">
                                <p className="text-xs font-medium mb-2">Available at:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {doctor.clinics.map((clinic, cIndex) => (
                                    <TooltipProvider key={clinic.id}>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div 
                                            className={`px-3 py-2 ${clinic.available ? 'bg-blue-50' : 'bg-gray-100'} rounded-lg text-xs flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-colors`}
                                            onClick={() => clinic.available && handleBookAppointment(doctor.name, clinic.id)}
                                          >
                                            <div className="flex items-center">
                                              <Building className="h-3 w-3 mr-2 text-primary" />
                                              <div>
                                                <p className="font-medium">{clinic.name}</p>
                                                <p className="text-muted-foreground mt-0.5">{clinic.location}</p>
                                              </div>
                                            </div>
                                            <div className="flex items-center">
                                              <Navigation className="h-3 w-3 mr-1 text-gray-500" />
                                              <span className="text-gray-500">{clinic.distance}</span>
                                            </div>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                          {clinic.available ? (
                                            <p className="text-xs">Click to book appointment at this clinic</p>
                                          ) : (
                                            <p className="text-xs">No appointments available at this clinic</p>
                                          )}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="mt-4 flex items-center justify-between md:hidden">
                                <div className="space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="rounded-full border-primary text-primary"
                                    onClick={() => window.location.href = `/doctor/${doctor.id}`}
                                  >
                                    Profile
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className="sky-button rounded-full"
                                    onClick={() => handleBookAppointment(doctor.name)}
                                  >
                                    Book Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-end md:w-32 hidden md:flex">
                              <div className="space-y-2">
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="w-full rounded-full border-primary text-primary"
                                  onClick={() => window.location.href = `/doctor/${doctor.id}`}
                                >
                                  Profile
                                </Button>
                                <Button 
                                  className="w-full sky-button rounded-full"
                                  onClick={() => handleBookAppointment(doctor.name)}
                                >
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
          
          {/* Loading indicator at bottom */}
          {loading && doctors.length > 0 && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-sm text-muted-foreground">Loading more doctors...</span>
            </div>
          )}
          
          {/* No more doctors message */}
          {showNoMoreDoctors && (
            <div className="text-center py-8 border-t mt-6">
              <p className="text-muted-foreground">No more doctors to display</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="bg-white sm:max-w-lg modal-background">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
          </DialogHeader>
          
          {bookingStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Select Clinic</h3>
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                {/* Get the right clinics for the selected doctor */}
                {doctors.find(d => d.name === selectedDoctor)?.clinics.map((clinic, index) => (
                  <div 
                    key={clinic.id}
                    className={`p-3 border rounded-lg hover:border-primary cursor-pointer transition-all ${selectedClinic === clinic.id ? 'border-primary bg-blue-50' : ''} ${!clinic.available ? 'opacity-60 cursor-not-allowed' : ''}`}
                    onClick={() => clinic.available && setSelectedClinic(clinic.id)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{clinic.name}</h4>
                          {!clinic.available && (
                            <span className="ml-2 text-xs text-red-500 py-0.5 px-2 bg-red-50 rounded-full">
                              No Slots Available
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{clinic.location}</p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Navigation className="h-3 w-3 mr-1" />
                          <span>{clinic.distance} from your location</span>
                        </div>
                      </div>
                      <Checkbox 
                        id={`clinic-${index}`} 
                        checked={selectedClinic === clinic.id}
                        disabled={!clinic.available}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  className="sky-button" 
                  onClick={nextStep}
                  disabled={!selectedClinic}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
          
          {bookingStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Select Date & Time</h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/2">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                
                <div className="sm:w-1/2">
                  <h4 className="font-medium mb-2">Available Slots</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedSlot === slot ? "default" : "outline"}
                        size="sm"
                        className={selectedSlot === slot ? 'bg-primary text-white' : ''}
                        onClick={() => handleSlotSelection(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>Back</Button>
                <Button className="sky-button" onClick={nextStep} disabled={!selectedSlot}>Continue</Button>
              </div>
            </div>
          )}
          
          {bookingStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Patient Information</h3>
              
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">First Name</label>
                    <Input placeholder="Enter first name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Last Name</label>
                    <Input placeholder="Enter last name" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input type="email" placeholder="Enter email address" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone Number</label>
                  <Input type="tel" placeholder="Enter phone number" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Reason for Visit</label>
                  <Input placeholder="Briefly describe your symptoms or reason" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>Back</Button>
                <Button className="sky-button" onClick={nextStep}>Continue</Button>
              </div>
            </div>
          )}
          
          {bookingStep === 4 && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Confirm Appointment</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Doctor</span>
                  <span className="text-sm font-medium">{selectedDoctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="text-sm font-medium">{date?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time</span>
                  <span className="text-sm font-medium">{selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Clinic</span>
                  <span className="text-sm font-medium">
                    {doctors.find(d => d.name === selectedDoctor)?.clinics.find(c => c.id === selectedClinic)?.name}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-medium">
                    <span>Consultation Fee</span>
                    <span>₹{doctors.find(d => d.name === selectedDoctor)?.price || 1200}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Payment to be made at the clinic</p>
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>Back</Button>
                <Button className="sky-button" onClick={nextStep}>Confirm Booking</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <AlertDialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <AlertDialogContent className="bg-white modal-background">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl text-green-600">Appointment Confirmed!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your appointment has been successfully booked
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="flex flex-col items-center py-4">
            <div className="bg-gray-50 p-4 rounded-lg w-full max-w-sm mx-auto">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Appointment ID</span>
                <span className="text-sm font-medium">APT123456</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Doctor</span>
                <span className="text-sm font-medium">{selectedDoctor}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Date & Time</span>
                <span className="text-sm font-medium">{date?.toLocaleDateString()} {selectedSlot}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Clinic</span>
                <span className="text-sm font-medium">
                  {doctors.find(d => d.name === selectedDoctor)?.clinics.find(c => c.id === selectedClinic)?.name}
                </span>
              </div>
            </div>
            
            <div className="my-4 bg-white p-2 border rounded-lg">
              <img src="https://placehold.co/200/eaf7fc/33C3F0?text=QR+Code&font=montserrat" alt="Appointment QR Code" className="w-32 h-32 mx-auto" />
            </div>
            
            <p className="text-sm text-center text-muted-foreground">
              Show this QR code at the clinic reception
            </p>
          </div>
          
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="sm:mt-0">Close</AlertDialogCancel>
            <AlertDialogAction className="sky-button">Download Receipt</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default DoctorSearch;
