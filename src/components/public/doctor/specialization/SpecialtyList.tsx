import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react"; // Import all icons dynamically
import { fetchAllSpecializations } from "@/services/SpecializationService";

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
  const [specialties, setSpecialties] = useState<any[]>([]);

  // Fetch specialties from the API
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetchAllSpecializations(); // Call the API
        setSpecialties(response.data); // Assuming the API response has a `data` field
      } catch (error) {
        console.error("Failed to fetch specialties:", error);
      }
    };

    fetchSpecialties();
  }, []);

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4">
      {specialties.map((specialty) => {
        // Dynamically get the icon component from the imported Icons
        const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[specialty.icon];
        return (
          <SpecialtyItem
            key={specialty.id} // Assuming each specialty has a unique `id`
            icon={IconComponent ? <IconComponent className="h-5 w-5" /> : null}
            name={specialty.name}
          />
        );
      })}
    </div>
  );
}