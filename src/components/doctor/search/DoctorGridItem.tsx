
import React from "react";
import { motion } from "framer-motion";
import { DoctorCard } from "@/components/DoctorCard";

interface DoctorGridItemProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    price: number;
    imageSrc: string;
    experience: string;
    languages: string[];
    clinics: any[];
  };
  index: number;
  isLastItem: boolean;
  lastDoctorElementRef: (node: HTMLDivElement | null) => void;
  handleBookAppointment: (doctorName: string) => void;
}

export function DoctorGridItem({ doctor, index, isLastItem, lastDoctorElementRef, handleBookAppointment }: DoctorGridItemProps) {
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
}
