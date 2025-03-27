
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onConfirm: () => void;
}

export function NavigationButtons({ 
  step, 
  totalSteps, 
  onNext, 
  onPrev, 
  onConfirm 
}: NavigationButtonsProps) {
  return (
    <div className="p-6 border-t flex justify-between">
      {step > 1 ? (
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      ) : (
        <div></div>
      )}
      
      {step < totalSteps ? (
        <Button onClick={onNext} className="sky-button">
          Continue
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      ) : (
        <Button onClick={onConfirm} className="sky-button">
          Confirm & Pay
        </Button>
      )}
    </div>
  );
}
