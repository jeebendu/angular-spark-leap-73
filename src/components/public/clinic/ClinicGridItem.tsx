
import React from 'react';
import { motion } from "framer-motion";
import { ClinicCard } from './ClinicCard';
import { Clinic } from '@/models/clinic/Clinic';

interface ClinicGridItemProps {
  clinic: Clinic;
  index: number;
  isLastItem: boolean;
  lastClinicElementRef?: (node: HTMLDivElement | null) => void;
}

export const ClinicGridItem: React.FC<ClinicGridItemProps> = ({ clinic, index, isLastItem, lastClinicElementRef }) => {
  return (
    <motion.div
      ref={isLastItem ? lastClinicElementRef : null}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index % 12 * 0.05, duration: 0.3 }}
      className="h-full"
    >
      <ClinicCard clinic={clinic} />
    </motion.div>
  );
};
