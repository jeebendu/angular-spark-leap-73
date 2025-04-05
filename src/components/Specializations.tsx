
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Activity, Brain, Bone, Stethoscope, Syringe, Microscope, Plus, TestTube, Eye, 
  ShieldAlert, Baby, User, Thermometer, Ear, ShieldCheck, Pill, Cross, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AllSpecializationsModal } from "./AllSpecializationsModal";

export function Specializations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const specializations = [
    { 
      name: "General Physician", 
      icon: <Stethoscope className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Cardiology", 
      icon: <Heart className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Neurology", 
      icon: <Brain className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Orthopedics", 
      icon: <Bone className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Pharmacy", 
      icon: <Pill className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Vaccinations", 
      icon: <Syringe className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Pathology", 
      icon: <Microscope className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Lab Tests", 
      icon: <TestTube className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Cardio Tests", 
      icon: <Activity className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    }
  ];
  
  // Extended specializations list for the modal
  const allSpecializations = [
    ...specializations,
    { 
      name: "Ophthalmology", 
      icon: <Eye className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Dentistry", 
      icon: <ShieldAlert className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Pediatrics", 
      icon: <Baby className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Dermatology", 
      icon: <User className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Pulmonology", 
      icon: <Thermometer className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "ENT", 
      icon: <Ear className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Infectious Disease", 
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Ayurveda", 
      icon: <Leaf className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    },
    { 
      name: "Emergency Medicine", 
      icon: <Cross className="w-6 h-6 text-white" />,
      bg: "bg-primary" 
    }
  ];

  const handleSpecializationClick = (specialization: string) => {
    navigate(`/doctor-search?specialty=${encodeURIComponent(specialization)}`);
  };

  return (
    <>
      <div className="py-8 bg-accent rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-primary font-semibold text-sm uppercase tracking-wide">SPECIALIZATIONS</h2>
          <h3 className="text-2xl font-bold mt-2">Find specialized medical care</h3>
          <p className="text-gray-600 mt-2">Discover our network of specialists and find the right doctor for your healthcare needs.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4">
          {specializations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSpecializationClick(item.name)}
            >
              <div className={`w-16 h-16 rounded-full ${item.bg} flex items-center justify-center mb-2 shadow-md hover:shadow-lg transition-all`}>
                {item.icon}
              </div>
              <span className="text-sm font-medium text-center">{item.name}</span>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: specializations.length * 0.05, duration: 0.3 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
              <Plus className="w-6 h-6 text-primary" />
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
      
      <AllSpecializationsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        specializations={allSpecializations} 
      />
    </>
  );
}
