
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Specialization } from "./Specializations";

// type Specialization = {
//   name: string;
//   icon: JSX.Element;
//   bg: string;
// };

interface AllSpecializationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  specializations: Specialization[];
}

export function AllSpecializationsModal({ isOpen, onClose, specializations }: AllSpecializationsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSpecializationClick = (specialization: string) => {
    navigate(`/doctor-search?specialty=${encodeURIComponent(specialization)}`);
    onClose();
  };

  const filteredSpecializations = specializations.filter(
    (spec) => spec.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white sm:max-w-3xl modal-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">All Specializations</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search specializations..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto p-1">
          {filteredSpecializations.map((spec, index) => (
            <div
              key={index}
              onClick={() => handleSpecializationClick(spec.name)}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {/* <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2`}>
                {spec.icon}
              </div> */}
                {spec.icon}
              <span className="text-sm font-medium text-center">{spec.name}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
