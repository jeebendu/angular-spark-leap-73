
import { Heart, Activity, Brain, Bone, Stethoscope, Syringe, Microscope, Plus, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Specializations() {
  const specializations = [
    { 
      name: "General Physician", 
      icon: <Stethoscope className="w-6 h-6 text-primary" />,
      bg: "bg-blue-50" 
    },
    { 
      name: "Cardiology", 
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      bg: "bg-rose-50" 
    },
    { 
      name: "Neurology", 
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      bg: "bg-purple-50" 
    },
    { 
      name: "Orthopedics", 
      icon: <Bone className="w-6 h-6 text-gray-600" />,
      bg: "bg-gray-50" 
    },
    { 
      name: "Pharmacy", 
      icon: <Syringe className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-50" 
    },
    { 
      name: "Vaccinations", 
      icon: <Syringe className="w-6 h-6 text-green-500" />,
      bg: "bg-green-50" 
    },
    { 
      name: "Pathology", 
      icon: <Microscope className="w-6 h-6 text-amber-500" />,
      bg: "bg-amber-50" 
    },
    { 
      name: "Lab Tests", 
      icon: <TestTube className="w-6 h-6 text-cyan-500" />,
      bg: "bg-cyan-50" 
    },
    { 
      name: "Cardio Tests", 
      icon: <Activity className="w-6 h-6 text-red-500" />,
      bg: "bg-red-50" 
    },
    { 
      name: "See more", 
      icon: <Plus className="w-6 h-6 text-primary" />,
      bg: "bg-gray-50" 
    }
  ];

  return (
    <div className="py-8 bg-green-50 rounded-xl">
      <div className="text-center mb-8">
        <h2 className="text-green-600 font-semibold text-sm uppercase tracking-wide">SPECIALIZATIONS</h2>
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
            className="flex flex-col items-center"
          >
            <div className={`w-16 h-16 rounded-full ${item.bg} flex items-center justify-center mb-2`}>
              {item.icon}
            </div>
            <span className="text-sm font-medium text-center">{item.name}</span>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" className="rounded-full border-green-500 text-green-600 hover:bg-green-50">
          View All Specializations
        </Button>
      </div>
    </div>
  );
}
