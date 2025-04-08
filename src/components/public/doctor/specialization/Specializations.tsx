import { Button } from "@/components/ui/button";
import { fetchAllSpecializations } from "@/services/SpecializationService";
import { motion } from "framer-motion";
import * as Icons from "lucide-react"; // Import all icons dynamically
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpecializationsModal } from "./SpecializationsModal";

export function Specializations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specializations, setSpecializations] = useState<any[]>([]);
  const navigate = useNavigate();

  // Fetch specializations from the API
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetchAllSpecializations(); // Call the API
        setSpecializations(response.data); // Assuming the API response has a `data` field
      } catch (error) {
        console.error("Failed to fetch specializations:", error);
      }
    };

    fetchSpecialties();
  }, []);

  // const handleSpecializationClick = (specialization: string) => {
  //   navigate(`/doctor/search?specialty=${encodeURIComponent(specialization)}`);
  // };
  const handleSpecializationClick = (id: number) => {
    const latitude = 22.3511148;
    const longitude = 78.6677428;
    const radius = 5000.0;
  
    navigate(
      `/doctor/search?specialty=${encodeURIComponent(id)}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
    );
  };

  return (
    <>
      <div className="py-8 bg-white rounded-xl shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-primary font-semibold text-sm uppercase tracking-wide">SPECIALIZATIONS</h2>
          <h3 className="text-2xl font-bold mt-2">Find specialized medical care</h3>
          <p className="text-gray-600 mt-2">Discover our network of specialists and find the right doctor for your healthcare needs.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4">
          {specializations.slice(0, 9).map((item, index) => {
            // Dynamically get the icon component from the imported Icons
            const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[item.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleSpecializationClick(item.id)}
              >
                <div className={`w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2 shadow-md hover:shadow-lg transition-all`}>
                  {IconComponent ? <IconComponent className="w-6 h-6 text-white" /> : null}
                </div>
                <span className="text-sm font-medium text-center">{item.name}</span>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: specializations.length * 0.05, duration: 0.3 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
              <Icons.Plus className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-center">See more</span>
          </motion.div>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="rounded-full border-primary text-primary hover:bg-accent"
            onClick={() => setIsModalOpen(true)}
          >
            View All Specializations
          </Button>
        </div>
      </div>

      <SpecializationsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        specializations={specializations}
      />
    </>
  );
}