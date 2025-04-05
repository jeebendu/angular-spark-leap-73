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
import { fetchAllDoctorClinics } from "@/services/doctorService";
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
  // Rest of the file remains the same
  // ... keep existing code
};

export default DoctorSearch;
