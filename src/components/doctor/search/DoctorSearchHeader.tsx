
import React from "react";
import { MapPin } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";

export function DoctorSearchHeader() {
  const { location } = useLocation();

  return (
    <div className="mb-8">
      {location.locality && (
        <div className="flex items-center mt-2 text-sm text-primary">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Showing results near {location.locality}</span>
        </div>
      )}
    </div>
  );
}
