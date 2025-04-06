
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CitySelectorProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export function CitySelector({ selectedCity, setSelectedCity }: CitySelectorProps) {
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityDialogOpen(false);
  };

  return (
    <Dialog open={cityDialogOpen} onOpenChange={setCityDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm font-medium ml-1 p-1 md:p-2">
          <MapPin className="text-primary h-4 w-4" />
          {!isMobile && <span className="font-medium">{selectedCity}</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-8 bg-white modal-background">
        <div className="absolute right-4 top-4">
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold mb-8">Select your city</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <button 
            onClick={() => handleCitySelect("Bangalore")} 
            className={`city-selector-card ${selectedCity === "Bangalore" ? "border-primary" : "border-gray-100"}`}
          >
            <div className="city-icon bg-sky-50 p-3 rounded-full">
              <span className="text-2xl">🏙️</span>
            </div>
            <span className="city-name">Bangalore</span>
          </button>
          <button 
            onClick={() => handleCitySelect("Mumbai")} 
            className={`city-selector-card ${selectedCity === "Mumbai" ? "border-primary" : "border-gray-100"}`}
          >
            <div className="city-icon bg-sky-50 p-3 rounded-full">
              <span className="text-2xl">🌇</span>
            </div>
            <span className="city-name">Mumbai</span>
          </button>
          <button 
            onClick={() => handleCitySelect("Delhi")} 
            className={`city-selector-card ${selectedCity === "Delhi" ? "border-primary" : "border-gray-100"}`}
          >
            <div className="city-icon bg-sky-50 p-3 rounded-full">
              <span className="text-2xl">🏛️</span>
            </div>
            <span className="city-name">Delhi</span>
          </button>
          <button 
            onClick={() => handleCitySelect("Hyderabad")} 
            className={`city-selector-card ${selectedCity === "Hyderabad" ? "border-primary" : "border-gray-100"}`}
          >
            <div className="city-icon bg-sky-50 p-3 rounded-full">
              <span className="text-2xl">🏯</span>
            </div>
            <span className="city-name">Hyderabad</span>
          </button>
          <button 
            onClick={() => handleCitySelect("Chennai")} 
            className={`city-selector-card ${selectedCity === "Chennai" ? "border-primary" : "border-gray-100"}`}
          >
            <div className="city-icon bg-sky-50 p-3 rounded-full">
              <span className="text-2xl">🌴</span>
            </div>
            <span className="city-name">Chennai</span>
          </button>
          <button 
            onClick={() => handleCitySelect("Kolkata")} 
            className={`city-selector-card ${selectedCity === "Kolkata" ? "border-primary" : "border-gray-100"}`}
          >
            <div className="city-icon bg-sky-50 p-3 rounded-full">
              <span className="text-2xl">🌉</span>
            </div>
            <span className="city-name">Kolkata</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
