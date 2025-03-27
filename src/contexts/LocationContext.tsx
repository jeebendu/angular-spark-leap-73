
import React, { createContext, useContext, useState, ReactNode } from "react";

type Coordinates = {
  latitude: number | null;
  longitude: number | null;
};

type LocationData = {
  locality: string;
  pincode?: string;
  coordinates: Coordinates;
};

interface LocationContextType {
  location: LocationData;
  setLocation: (location: LocationData) => void;
}

const defaultLocationContext: LocationContextType = {
  location: {
    locality: "",
    pincode: "",
    coordinates: {
      latitude: null,
      longitude: null
    }
  },
  setLocation: () => {}
};

const LocationContext = createContext<LocationContextType>(defaultLocationContext);

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LocationData>(defaultLocationContext.location);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
