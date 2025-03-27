
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb
} from "@/components/ui/slider";
import { DoctorCard } from "@/components/DoctorCard";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, Heart, Star, X, Filter } from "lucide-react";
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

const DoctorSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [filterOpen, setFilterOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const specialties = [
    "All Specialties",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Internal Medicine",
    "Ophthalmology"
  ];
  
  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Find the Right Doctor</h1>
          <p className="text-muted-foreground">Search from our network of specialized doctors</p>
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
              <DialogContent className="bg-white sm:max-w-md">
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
                <div className="space-y-4 py-4">
                  {/* Mobile filters */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Specialty</h3>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Specialties" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty.toLowerCase()}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          {!isMobile && (
            <div className="w-full md:w-64 shrink-0">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-4">Filters</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Specialty</h4>
                      <div className="space-y-1">
                        {specialties.map((specialty) => (
                          <div key={specialty} className="flex items-center">
                            <input
                              type="radio"
                              id={specialty.toLowerCase()}
                              name="specialty"
                              className="mr-2 h-4 w-4 text-primary"
                            />
                            <label htmlFor={specialty.toLowerCase()} className="text-sm">
                              {specialty}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Price Range</h4>
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
                      <h4 className="font-medium">Availability</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="available-today"
                            className="mr-2 h-4 w-4 text-primary"
                          />
                          <label htmlFor="available-today" className="text-sm">
                            Available Today
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="available-week"
                            className="mr-2 h-4 w-4 text-primary"
                          />
                          <label htmlFor="available-week" className="text-sm">
                            Available This Week
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Rating</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="rating-4-plus"
                            className="mr-2 h-4 w-4 text-primary"
                          />
                          <label htmlFor="rating-4-plus" className="text-sm flex items-center">
                            <span>4+</span>
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="rating-3-plus"
                            className="mr-2 h-4 w-4 text-primary"
                          />
                          <label htmlFor="rating-3-plus" className="text-sm flex items-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(9)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <DoctorCard
                    name={`Dr. ${["Robert", "Emily", "James", "Sarah", "Michael", "Jennifer"][index % 6]} ${["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller"][index % 6]}`}
                    specialty={["Cardiologist", "Neurologist", "Orthopedist", "Dermatologist", "Pediatrician", "Ophthalmologist"][index % 6]}
                    rating={4 + (index % 10) / 10}
                    reviewCount={80 + index * 5}
                    price={`₹${900 + index * 100}`}
                    imageSrc={`https://placehold.co/400x300/eaf7fc/33C3F0?text=Dr.+${index+1}&font=montserrat`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DoctorSearch;
