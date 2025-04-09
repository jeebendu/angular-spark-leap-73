
import React from "react";
import { PatientType } from "@/admin/types/patient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Edit, Eye, Mail, MapPin, Phone, Trash2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PatientCardViewProps {
  data: PatientType[];
  onEdit: (patient: PatientType) => void;
  onDelete: (id: string) => void;
}

const PatientCardView = ({ data, onEdit, onDelete }: PatientCardViewProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4 pb-4">
      {data.map((patient) => (
        <Card key={patient.id} className="hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
          <CardContent className="p-5">
            <div className="flex justify-between flex-wrap gap-2">
              <div className="flex items-start">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                  patient.gender === "Female" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                )}>
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-medium">{patient.fullName}</h2>
                    <span className="text-gray-500 text-sm">#{patient.patientId || "PT-0000"}</span>
                    <span className="text-gray-500 text-sm">{patient.age || calculateAge(patient.dateOfBirth)} yrs • {patient.gender}</span>
                  </div>
                  <div className="flex items-center mt-2 gap-4 flex-wrap">
                    <div className="flex items-center text-gray-600 text-sm">
                      <span className="text-sm">DOB: {patient.dateOfBirth}</span>
                    </div>
                    {patient.lastVisit && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <span className="mr-1">Last visit:</span>
                        {formatDistanceToNow(new Date(patient.lastVisit), { addSuffix: true })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="rounded-full" onClick={() => onEdit(patient)}>
                  <Edit className="h-4 w-4 mr-1" />
                  {!isMobile && "Edit"}
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Eye className="h-4 w-4 mr-1" />
                  {!isMobile && "View"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full text-red-500 hover:text-red-700 hover:border-red-300"
                  onClick={() => onDelete(patient.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {!isMobile && "Delete"}
                </Button>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center text-gray-600 text-sm truncate">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                {patient.contactNumber}
              </div>
              {patient.address && (
                <div className="flex items-center text-gray-600 text-sm truncate">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{patient.address}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default PatientCardView;
