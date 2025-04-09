
import { DoctorSearchView } from "@/models/doctor/Doctor";
import { motion } from "framer-motion";
import { DoctorCard } from "./DoctorCard";

interface DoctorGridItemProps {
  doctor: DoctorSearchView;
  index: number;
  isLastItem: boolean;
  lastDoctorElementRef: (node: HTMLDivElement | null) => void;
  handleBookAppointment: (doctorName: string) => void;
}

export function DoctorGridItem({ doctor, index, isLastItem, lastDoctorElementRef, handleBookAppointment }: DoctorGridItemProps) {
  return (
    <motion.div
      key={doctor.doctorId}
      ref={isLastItem ? lastDoctorElementRef : null}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index % 12 * 0.05, duration: 0.3 }}
    >
      <DoctorCard
        id={doctor.doctorId}
        name={doctor.doctorName}
        specialty={doctor.specialties}
        rating={Number(doctor.averageRating)}
        reviewCount={Number(doctor.reviewCount)}
        price={`₹${doctor.price}`}
        imageSrc={doctor.imageSrc}
        experience={doctor.experienceYears}
        languages={doctor.languages}
        clinics={doctor.clinicName ? [{ name: doctor.clinicName, location: 'NA' }] : [{ name: 'No Clinics', location: 'NA' }]}
        onBookNow={(name) => handleBookAppointment(name)}
      />
    </motion.div>
  );
}
