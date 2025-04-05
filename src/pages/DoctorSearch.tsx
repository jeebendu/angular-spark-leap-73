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
import { Specialization } from "./DoctorDetails";
import { Clinic } from "@/models/Clinic";
import { fetchAllSpecializations, fetchLanguageList, fetchSpecializationById } from "@/services/SpecializationService";

export interface SearchDoctorClinic {
  specialisations: Specialization[];
  gender: number;
  expYearFirst: number;
  expYearLast: number;
  languageList: languageList[];
  latitude: number;
  longitude: number;
  radius: number;
  rating: number;
}

export interface DoctorClinic {
  id: number;
  doctor: Doctor;
  clinic: Clinic;
}

export interface Doctor {
  id: number;
  userId: number;
  user: User;
  uid: string;
  image: string;
  designation: string;
  isExternal: boolean;
  expYear: string;
  qualification: string;
  joiningDate: Date;
  specialization: string;
  specializationList: Specialization[];
  language:string;
  languageList:languageList[]
  serviceList: ServiceList[];
  branchList: Branch[];
}

export interface languageList {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Branch {
  id: number;
  name: string;
  code: string;
  location: string;
  active: boolean;
  state: State;
  district: District;
  country: Country;
  city: string;
  mapurl: string;
  pincode: number;
  image: string;
  latitude: number;
  longitude: number;
}

export interface Country {
  id: number;
  name: string;
  code: string;
}

export interface State {
  id: number;
  name: string;
  code: string;
}

export interface District {
  id: number;
  name: string;
  code: string;
}

export interface ServiceList {
  id: number;
  name: string;
  price: number;
}

const DoctorSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [viewType, setViewType] = useState<string>("list");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<Specialization[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<languageList[]>([]);
  const [gender, setGender] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [availabilityFilter, setAvailabilityFilter] = useState({
    today: false,
    tomorrow: false,
    weekend: false,
    online: false,
    inPerson: true,
  });
  const [experienceRange, setExperienceRange] = useState<number[]>([0, 30]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedLocationRadius, setSelectedLocationRadius] = useState<number>(5);
  
  const { currentLocation } = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [languages, setLanguages] = useState<languageList[]>([]);
  const [isLoadingSpecializations, setIsLoadingSpecializations] = useState<boolean>(false);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState<boolean>(false);
  const [showAllSpecialities, setShowAllSpecialities] = useState<boolean>(false);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const doctorsMockData = [
    {
      id: 1,
      doctor: {
        id: 1,
        userId: 101,
        user: {
          id: 101,
          name: "Dr. Sarah Johnson",
          email: "sarah.johnson@example.com",
          phone: "123-456-7890"
        },
        uid: "DOC001",
        image: "https://placehold.co/400x400/eaf7fc/33C3F0?text=Dr.+Sarah&font=montserrat",
        designation: "Senior Cardiologist",
        isExternal: false,
        expYear: "15",
        qualification: "MD, DM (Cardiology)",
        joiningDate: new Date("2008-05-15"),
        specialization: "Cardiology",
        specializationList: [{ id: 1, name: "Cardiology" }],
        language: "English, Hindi",
        languageList: [{ id: 1, name: "English" }, { id: 2, name: "Hindi" }],
        serviceList: [
          { id: 1, name: "Heart Checkup", price: 1500 },
          { id: 2, name: "ECG", price: 800 }
        ],
        branchList: [],
        rating: 4.8,
        reviewCount: 120,
        biography: "Dr. Sarah Johnson is a renowned cardiologist with over 15 years of experience specializing in interventional cardiology and heart failure management. She completed her medical education at Harvard Medical School and advanced cardiology training at Cleveland Clinic."
      },
      clinic: {
        id: 1,
        name: "HeartCare Clinic",
        location: "123 Main St, New York",
        distance: 2.5
      }
    },
    {
      id: 2,
      doctor: {
        id: 2,
        userId: 102,
        user: {
          id: 102,
          name: "Dr. Michael Chen",
          email: "michael.chen@example.com",
          phone: "234-567-8901"
        },
        uid: "DOC002",
        image: "https://placehold.co/400x400/eaf7fc/33C3F0?text=Dr.+Michael&font=montserrat",
        designation: "Head of Dermatology",
        isExternal: false,
        expYear: "12",
        qualification: "MD (Dermatology), PhD",
        joiningDate: new Date("2011-03-22"),
        specialization: "Dermatology",
        specializationList: [{ id: 2, name: "Dermatology" }],
        language: "English, Mandarin",
        languageList: [{ id: 1, name: "English" }, { id: 3, name: "Mandarin" }],
        serviceList: [
          { id: 3, name: "Skin Consultation", price: 1200 },
          { id: 4, name: "Acne Treatment", price: 900 }
        ],
        branchList: [],
        rating: 4.6,
        reviewCount: 95,
        biography: "Dr. Michael Chen is a board-certified dermatologist specializing in cosmetic dermatology and skin cancer treatment. With 12 years of experience, he has pioneered several innovative skincare treatments."
      },
      clinic: {
        id: 2,
        name: "DermCare Center",
        location: "456 Oak Ave, Boston",
        distance: 3.2
      }
    },
    {
      id: 3,
      doctor: {
        id: 3,
        userId: 103,
        user: {
          id: 103,
          name: "Dr. Emily Rodriguez",
          email: "emily.rodriguez@example.com",
          phone: "345-678-9012"
        },
        uid: "DOC003",
        image: "https://placehold.co/400x400/eaf7fc/33C3F0?text=Dr.+Emily&font=montserrat",
        designation: "Pediatric Specialist",
        isExternal: false,
        expYear: "10",
        qualification: "MD, DCH",
        joiningDate: new Date("2013-09-10"),
        specialization: "Pediatrics",
        specializationList: [{ id: 3, name: "Pediatrics" }],
        language: "English, Spanish",
        languageList: [{ id: 1, name: "English" }, { id: 4, name: "Spanish" }],
        serviceList: [
          { id: 5, name: "Child Checkup", price: 1000 },
          { id: 6, name: "Vaccination", price: 500 }
        ],
        branchList: [],
        rating: 4.9,
        reviewCount: 150,
        biography: "Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence. She has a special interest in developmental pediatrics and preventive care."
      },
      clinic: {
        id: 3,
        name: "KidsCare Clinic",
        location: "789 Pine St, Chicago",
        distance: 1.8
      }
    },
    {
      id: 4,
      doctor: {
        id: 4,
        userId: 104,
        user: {
          id: 104,
          name: "Dr. James Wilson",
          email: "james.wilson@example.com",
          phone: "456-789-0123"
        },
        uid: "DOC004",
        image: "https://placehold.co/400x400/eaf7fc/33C3F0?text=Dr.+James&font=montserrat",
        designation: "Orthopedic Surgeon",
        isExternal: false,
        expYear: "20",
        qualification: "MS (Ortho), FRCS",
        joiningDate: new Date("2003-11-05"),
        specialization: "Orthopedics",
        specializationList: [{ id: 4, name: "Orthopedics" }],
        language: "English",
        languageList: [{ id: 1, name: "English" }],
        serviceList: [
          { id: 7, name: "Joint Replacement", price: 2500 },
          { id: 8, name: "Sports Injury", price: 1800 }
        ],
        branchList: [],
        rating: 4.7,
        reviewCount: 110,
        biography: "Dr. James Wilson is a senior orthopedic surgeon with two decades of experience in joint replacement surgeries and sports medicine. He has treated numerous professional athletes and has pioneered minimally invasive joint replacement techniques."
      },
      clinic: {
        id: 4,
        name: "OrthoHealth Center",
        location: "321 Elm St, San Francisco",
        distance: 4.5
      }
    },
    {
      id: 5,
      doctor: {
        id: 5,
        userId: 105,
        user: {
          id: 105,
          name: "Dr. Priya Patel",
          email: "priya.patel@example.com",
          phone: "567-890-1234"
        },
        uid: "DOC005",
        image: "https://placehold.co/400x400/eaf7fc/33C3F0?text=Dr.+Priya&font=montserrat",
        designation: "Neurologist",
        isExternal: false,
        expYear: "14",
        qualification: "MD, DM (Neurology)",
        joiningDate: new Date("2009-07-20"),
        specialization: "Neurology",
        specializationList: [{ id: 5, name: "Neurology" }],
        language: "English, Hindi, Gujarati",
        languageList: [
          { id: 1, name: "English" }, 
          { id: 2, name: "Hindi" }, 
          { id: 5, name: "Gujarati" }
        ],
        serviceList: [
          { id: 9, name: "Neurological Assessment", price: 1700 },
          { id: 10, name: "EEG", price: 900 }
        ],
        branchList: [],
        rating: 4.8,
        reviewCount: 85,
        biography: "Dr. Priya Patel is a highly skilled neurologist specializing in headache disorders, epilepsy, and stroke management. She combines traditional neurological approaches with the latest technological advancements for comprehensive patient care."
      },
      clinic: {
        id: 5,
        name: "NeuroHealth Institute",
        location: "567 Maple Ave, Seattle",
        distance: 2.9
      }
    }
  ];
  
  const filteredDoctors = doctorsMockData.filter((doc) => {
    const matchesQuery = query 
      ? doc.doctor.user.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.doctor.specialization.toLowerCase().includes(query.toLowerCase()) ||
        doc.doctor.specializationList.some(s => 
          Array.isArray(s.name) 
            ? s.name.some(n => n.toLowerCase().includes(query.toLowerCase()))
            : s.name.toLowerCase().includes(query.toLowerCase())
        )
      : true;
    
    const matchesSpecialty = selectedSpecialties.length === 0 ? true :
      doc.doctor.specializationList.some(docSpec => 
        selectedSpecialties.some(selSpec => docSpec.id === selSpec.id)
      );
    
    const matchesLanguage = selectedLanguages.length === 0 ? true :
      doc.doctor.languageList.some(docLang => 
        selectedLanguages.some(selLang => docLang.id === selLang.id)
      );
    
    const matchesGender = !gender ? true :
      (gender === 'male' && doc.doctor.user.name.includes('Dr. ')) || 
      (gender === 'female' && doc.doctor.user.name.includes('Dr. '));
    
    const matchesPrice = doc.doctor.serviceList.some(
      service => service.price >= priceRange[0] && service.price <= priceRange[1]
    );
    
    const matchesExperience = parseInt(doc.doctor.expYear) >= experienceRange[0] && 
      parseInt(doc.doctor.expYear) <= experienceRange[1];
    
    const matchesRating = doc.doctor.rating >= ratingFilter;
    
    const matchesLocation = doc.clinic.distance <= selectedLocationRadius;
    
    return matchesQuery && matchesSpecialty && matchesLanguage && 
      matchesGender && matchesPrice && matchesExperience && 
      matchesRating && matchesLocation;
  });
  
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch(sortBy) {
      case 'rating':
        return b.doctor.rating - a.doctor.rating;
      case 'experience':
        return parseInt(b.doctor.expYear) - parseInt(a.doctor.expYear);
      case 'price_low':
        const aMinPrice = Math.min(...a.doctor.serviceList.map(s => s.price));
        const bMinPrice = Math.min(...b.doctor.serviceList.map(s => s.price));
        return aMinPrice - bMinPrice;
      case 'price_high':
        const aMaxPrice = Math.max(...a.doctor.serviceList.map(s => s.price));
        const bMaxPrice = Math.max(...b.doctor.serviceList.map(s => s.price));
        return bMaxPrice - aMaxPrice;
      case 'distance':
        return a.clinic.distance - b.clinic.distance;
      default: // relevance
        const aRelevance = query && (
          a.doctor.user.name.toLowerCase().includes(query.toLowerCase()) ? 2 :
          a.doctor.specialization.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
        );
        const bRelevance = query && (
          b.doctor.user.name.toLowerCase().includes(query.toLowerCase()) ? 2 :
          b.doctor.specialization.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
        );
        return bRelevance - aRelevance;
    }
  });
  
  const updateSearchParams = (newParams: Record<string, string>) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key);
      }
    });
    setSearchParams(updatedParams);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearch = () => {
    updateSearchParams({ query: searchQuery });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleSpecialtySelection = (specialty: Specialization) => {
    const isSelected = selectedSpecialties.some(s => s.id === specialty.id);
    
    if (isSelected) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s.id !== specialty.id));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const toggleLanguageSelection = (language: languageList) => {
    const isSelected = selectedLanguages.some(l => l.id === language.id);
    
    if (isSelected) {
      setSelectedLanguages(selectedLanguages.filter(l => l.id !== language.id));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  
  const resetFilters = () => {
    setSelectedSpecialties([]);
    setSelectedLanguages([]);
    setGender("");
    setPriceRange([0, 2000]);
    setAvailabilityFilter({
      today: false,
      tomorrow: false,
      weekend: false,
      online: false,
      inPerson: true,
    });
    setExperienceRange([0, 30]);
    setRatingFilter(0);
    setSelectedLocationRadius(5);
  };

  const toggleFiltersMobile = () => {
    setShowFiltersMobile(!showFiltersMobile);
  };

  const applyFilters = () => {
    if (isMobile) {
      setShowFiltersMobile(false);
    }
    
    toast({
      title: "Filters applied",
      description: `Found ${filteredDoctors.length} doctors matching your criteria.`,
    });
  };
  
  useEffect(() => {
    const getSpecializations = async () => {
      setIsLoadingSpecializations(true);
      try {
        const res = await fetchAllSpecializations();
        setSpecializations(res.data);
      } catch (error) {
        console.error("Error fetching specializations:", error);
        setSpecializations([
          { id: 1, name: "Cardiology" },
          { id: 2, name: "Dermatology" },
          { id: 3, name: "Pediatrics" },
          { id: 4, name: "Orthopedics" },
          { id: 5, name: "Neurology" },
          { id: 6, name: "Gynecology" },
          { id: 7, name: "Ophthalmology" },
          { id: 8, name: "Dentistry" },
          { id: 9, name: "Psychiatry" },
          { id: 10, name: "Urology" }
        ]);
      } finally {
        setIsLoadingSpecializations(false);
      }
    };
    
    const getLanguages = async () => {
      setIsLoadingLanguages(true);
      try {
        const res = await fetchLanguageList();
        setLanguages(res.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
        setLanguages([
          { id: 1, name: "English" },
          { id: 2, name: "Hindi" },
          { id: 3, name: "Mandarin" },
          { id: 4, name: "Spanish" },
          { id: 5, name: "Gujarati" },
          { id: 6, name: "Tamil" },
          { id: 7, name: "Telugu" },
          { id: 8, name: "Bengali" }
        ]);
      } finally {
        setIsLoadingLanguages(false);
      }
    };
    
    getSpecializations();
    getLanguages();
  }, []);

  const displayedSpecialties = showAllSpecialities 
    ? specializations 
    : specializations.slice(0, 5);
  
  const displayedLanguages = languages.slice(0, 6);

  return (
    <AppLayout>
      <div className="container px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Find a Doctor</h1>
          <p className="text-gray-600">Search for the best doctors in your area</p>
        </div>
        
        <div className="relative mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border p-2">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by doctor name, specialty, etc."
                className="border-0 ring-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 h-11"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
            <Button onClick={handleSearch} className="rounded-md h-11">
              Search
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-3 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 border sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" onClick={resetFilters} className="text-xs h-8 px-2">
                  Reset All
                </Button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Specialty</h3>
                <div className="space-y-2">
                  {isLoadingSpecializations ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                  ) : (
                    displayedSpecialties.map((specialty) => (
                      <div key={specialty.id} className="flex items-center">
                        <Checkbox
                          id={`specialty-${specialty.id}`}
                          checked={selectedSpecialties.some(s => s.id === specialty.id)}
                          onCheckedChange={() => toggleSpecialtySelection(specialty)}
                        />
                        <label
                          htmlFor={`specialty-${specialty.id}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {specialty.name}
                        </label>
                      </div>
                    ))
                  )}
                  {!isLoadingSpecializations && specializations.length > 5 && (
                    <Button
                      variant="link"
                      onClick={() => setShowAllSpecialities(!showAllSpecialities)}
                      className="text-primary p-0 h-auto"
                    >
                      {showAllSpecialities ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Language</h3>
                <div className="space-y-2">
                  {isLoadingLanguages ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                  ) : (
                    displayedLanguages.map((language) => (
                      <div key={language.id} className="flex items-center">
                        <Checkbox
                          id={`language-${language.id}`}
                          checked={selectedLanguages.some(l => l.id === language.id)}
                          onCheckedChange={() => toggleLanguageSelection(language)}
                        />
                        <label
                          htmlFor={`language-${language.id}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {language.name}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Gender</h3>
                <div className="flex flex-wrap gap-2">
                  <ToggleGroup 
                    type="single" 
                    className="justify-start"
                    value={gender}
                    onValueChange={(value) => setGender(value)}
                  >
                    <ToggleGroupItem value="male" aria-label="Male" className="text-xs">
                      Male
                    </ToggleGroupItem>
                    <ToggleGroupItem value="female" aria-label="Female" className="text-xs">
                      Female
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <span className="text-xs text-gray-500">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </span>
                </div>
                <div className="mt-4 px-2">
                  <Slider
                    defaultValue={[0, 2000]}
                    max={2000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Experience</h3>
                  <span className="text-xs text-gray-500">
                    {experienceRange[0]} - {experienceRange[1]} years
                  </span>
                </div>
                <div className="mt-4 px-2">
                  <Slider
                    defaultValue={[0, 30]}
                    max={30}
                    step={1}
                    value={experienceRange}
                    onValueChange={setExperienceRange}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Rating</h3>
                <div className="flex items-center gap-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <Button
                      key={rating}
                      variant={ratingFilter === rating ? "default" : "outline"}
                      size="sm"
                      className={`px-3 py-1 text-xs ${
                        ratingFilter === rating ? "bg-primary text-white" : ""
                      }`}
                      onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                    >
                      {rating}+ <Star className="h-3 w-3 ml-1" />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Location Radius</h3>
                  <span className="text-xs text-gray-500">{selectedLocationRadius} km</span>
                </div>
                <div className="mt-4 px-2">
                  <Slider
                    defaultValue={[5]}
                    max={10}
                    step={1}
                    value={[selectedLocationRadius]}
                    onValueChange={(value) => setSelectedLocationRadius(value[0])}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="available-today"
                      checked={availabilityFilter.today}
                      onCheckedChange={(checked) => 
                        setAvailabilityFilter({...availabilityFilter, today: checked as boolean})
                      }
                    />
                    <label
                      htmlFor="available-today"
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Available today
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="available-tomorrow"
                      checked={availabilityFilter.tomorrow}
                      onCheckedChange={(checked) => 
                        setAvailabilityFilter({...availabilityFilter, tomorrow: checked as boolean})
                      }
                    />
                    <label
                      htmlFor="available-tomorrow"
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Available tomorrow
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="available-weekend"
                      checked={availabilityFilter.weekend}
                      onCheckedChange={(checked) => 
                        setAvailabilityFilter({...availabilityFilter, weekend: checked as boolean})
                      }
                    />
                    <label
                      htmlFor="available-weekend"
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Available this weekend
                    </label>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDatePickerOpen(true)}
                      className="text-xs flex items-center gap-1 w-full justify-center"
                    >
                      <Calendar className="h-3 w-3" />
                      {selectedDate ? selectedDate.toLocaleDateString() : "Select a date"}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Consultation Type</h3>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="in-person"
                      checked={availabilityFilter.inPerson}
                      onCheckedChange={(checked) => 
                        setAvailabilityFilter({...availabilityFilter, inPerson: checked})
                      }
                    />
                    <label
                      htmlFor="in-person"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      In-Person
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="online"
                      checked={availabilityFilter.online}
                      onCheckedChange={(checked) => 
                        setAvailabilityFilter({...availabilityFilter, online: checked})
                      }
                    />
                    <label
                      htmlFor="online"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Online
                    </label>
                  </div>
                </div>
              </div>
              
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
          
          <div className="md:hidden fixed bottom-16 right-4 z-20">
            <Button 
              className="rounded-full h-12 w-12 shadow-lg flex items-center justify-center"
              onClick={toggleFiltersMobile}
            >
              <Filter />
            </Button>
          </div>
          
          <Dialog open={showFiltersMobile} onOpenChange={setShowFiltersMobile}>
            <DialogContent className="h-[80vh] max-w-full sm:max-w-lg overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Filters</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Specialty</h3>
                  <div className="space-y-2">
                    {isLoadingSpecializations ? (
                      <div className="animate-pulse space-y-2">
                        <div className="h-6 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </div>
                    ) : (
                      displayedSpecialties.map((specialty) => (
                        <div key={specialty.id} className="flex items-center">
                          <Checkbox
                            id={`mobile-specialty-${specialty.id}`}
                            checked={selectedSpecialties.some(s => s.id === specialty.id)}
                            onCheckedChange={() => toggleSpecialtySelection(specialty)}
                          />
                          <label
                            htmlFor={`mobile-specialty-${specialty.id}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {specialty.name}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Language</h3>
                  <div className="space-y-2">
                    {isLoadingLanguages ? (
                      <div className="animate-pulse space-y-2">
                        <div className="h-6 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </div>
                    ) : (
                      displayedLanguages.map((language) => (
                        <div key={language.id} className="flex items-center">
                          <Checkbox
                            id={`mobile-language-${language.id}`}
                            checked={selectedLanguages.some(l => l.id === language.id)}
                            onCheckedChange={() => toggleLanguageSelection(language)}
                          />
                          <label
                            htmlFor={`mobile-language-${language.id}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {language.name}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Gender</h3>
                  <div className="flex flex-wrap gap-2">
                    <ToggleGroup 
                      type="single" 
                      className="justify-start"
                      value={gender}
                      onValueChange={(value) => setGender(value)}
                    >
                      <ToggleGroupItem value="male" aria-label="Male" className="text-xs">
                        Male
                      </ToggleGroupItem>
                      <ToggleGroupItem value="female" aria-label="Female" className="text-xs">
                        Female
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <span className="text-xs text-gray-500">
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                    </span>
                  </div>
                  <div className="mt-4 px-2">
                    <Slider
                      defaultValue={[0, 2000]}
                      max={2000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Experience</h3>
                    <span className="text-xs text-gray-500">
                      {experienceRange[0]} - {experienceRange[1]} years
                    </span>
                  </div>
                  <div className="mt-4 px-2">
                    <Slider
                      defaultValue={[0, 30]}
                      max={30}
                      step={1}
                      value={experienceRange}
                      onValueChange={setExperienceRange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <Button variant="outline" onClick={resetFilters}>
                  Reset All
                </Button>
                <Button onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <AlertDialog open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Select a date</AlertDialogTitle>
                <AlertDialogDescription>
                  Choose a specific date to find available doctors.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4 flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => setIsDatePickerOpen(false)}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <div className="md:col-span-9 lg:col-span-9">
            <div className="bg-white mb-4 p-4 rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-2 border">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{sortedDoctors.length}</span> doctors found
                  {query && <span> for "<span className="text-primary font-medium">{query}</span>"</span>}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px] h-8 text-xs border-none shadow-none focus:ring-0">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="experience">Most Experienced</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="hidden md:flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-l-md rounded-r-none ${viewType === 'list' ? 'bg-gray-100' : ''}`}
                    onClick={() => setViewType('list')}
                  >
                    <Rows className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-r-md rounded-l-none ${viewType === 'grid' ? 'bg-gray-100' : ''}`}
                    onClick={() => setViewType('grid')}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className={`space-y-4 ${viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-0' : ''}`}>
              {sortedDoctors.length > 0 ? (
                sortedDoctors.map((doctorClinic) => (
                  <Card key={doctorClinic.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <DoctorCard 
                        id={doctorClinic.doctor.id.toString()}
                        name={doctorClinic.doctor.user.name}
                        specialization={doctorClinic.doctor.specialization}
                        experience={doctorClinic.doctor.expYear}
                        location={doctorClinic.clinic.location}
                        distance={doctorClinic.clinic.distance}
                        rating={doctorClinic.doctor.rating}
                        ratingCount={doctorClinic.doctor.reviewCount || 0}
                        price={Math.min(...doctorClinic.doctor.serviceList.map(s => s.price))}
                        languages={doctorClinic.doctor.languageList.map(l => l.name).join(", ")}
                        imageUrl={doctorClinic.doctor.image}
                        availability={["Today", "Tomorrow"]}
                        isAvailableOnline={true}
                        designation={doctorClinic.doctor.designation}
                        isCard={true}
                        reviews={doctorClinic.doctor.reviewCount || 0}
                        showPhone={false}
                        id_doctor={doctorClinic.doctor.id}
                        id_clinic={doctorClinic.clinic.id}
                      />
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <div className="flex flex-col items-center">
                    <HelpCircle className="h-16 w-16 text-gray-300" />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">No doctors found</h3>
                    <p className="mt-1 text-gray-500">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button className="mt-6" variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DoctorSearch;
