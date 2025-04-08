

import { DoctorSearchView } from "@/models/doctor/Doctor";
import { DoctorGridItem } from "./DoctorGridItem";
import { DoctorListItem } from "./DoctorListItem";

interface DoctorsList {
  doctors: DoctorSearchView[];
  viewMode: "grid" | "list";
  lastDoctorElementRef: (node: HTMLDivElement | null) => void;
  loading: boolean;
  handleBookAppointment: (doctorName: string, clinicId?: string) => void;
  showNoMoreDoctors: boolean;
}

export function DoctorsList({ 
  doctors, 
  viewMode, 
  lastDoctorElementRef, 
  loading, 
  handleBookAppointment,
  showNoMoreDoctors
}: DoctorsList) {
  if (loading && doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading doctors...</p>
      </div>
    );
  }
  
  return (
    <>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor, index) => (
            <DoctorGridItem
              key={doctor.doctorId}
              doctor={doctor}
              index={index}
              isLastItem={index === doctors.length - 1}
              lastDoctorElementRef={lastDoctorElementRef}
              handleBookAppointment={handleBookAppointment}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {doctors.map((doctor, index) => (
            <DoctorListItem
              key={doctor.doctorId}
              doctor={doctor}
              index={index}
              isLastItem={index === doctors.length - 1}
              lastDoctorElementRef={lastDoctorElementRef}
              handleBookAppointment={handleBookAppointment}
            />
          ))}
        </div>
      )}
      
      {loading && doctors.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-sm text-muted-foreground">Loading more doctors...</span>
        </div>
      )}
      
      {showNoMoreDoctors && (
        <div className="text-center py-8 border-t mt-6">
          <p className="text-muted-foreground">No more doctors to display</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters to see more results</p>
        </div>
      )}
    </>
  );
}
