
import { Heart, Brain, Eye, Stethoscope, Bone, Baby, Activity, Scissors } from "lucide-react";
import { motion } from "framer-motion";

interface SpecialtyItemProps {
  icon: React.ReactNode;
  name: string;
}

const SpecialtyItem = ({ icon, name }: SpecialtyItemProps) => (
  <motion.div
    className="specialty-item"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div className="specialty-icon">{icon}</div>
    <span className="text-sm font-medium">{name}</span>
  </motion.div>
);

export function SpecialtyList() {
  const specialties = [
    { name: "Cardiology", icon: <Heart className="h-5 w-5" /> },
    { name: "Neurology", icon: <Brain className="h-5 w-5" /> },
    { name: "Ophthalmology", icon: <Eye className="h-5 w-5" /> },
    { name: "Internal Medicine", icon: <Stethoscope className="h-5 w-5" /> },
    { name: "Orthopedics", icon: <Bone className="h-5 w-5" /> },
    { name: "Pediatrics", icon: <Baby className="h-5 w-5" /> },
    { name: "Dentistry", icon: <Scissors className="h-5 w-5" /> },
    { name: "General Health", icon: <Activity className="h-5 w-5" /> }
  ];
  
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4">
      {specialties.map((specialty, index) => (
        <SpecialtyItem 
          key={specialty.name}
          icon={specialty.icon}
          name={specialty.name}
        />
      ))}
    </div>
  );
}
