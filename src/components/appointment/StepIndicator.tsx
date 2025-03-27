
import React from "react";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (stepNumber: number) => void;
  validateCurrentStep: () => boolean;
}

export function StepIndicator({ 
  currentStep, 
  totalSteps, 
  onStepClick, 
  validateCurrentStep 
}: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2 w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              } cursor-pointer shadow-sm hover:shadow-md transition-all`}
              onClick={() => currentStep > step - 1 || (validateCurrentStep() && currentStep > step - 2) ? onStepClick(step) : null}
            >
              {currentStep > step ? <Check className="h-5 w-5" /> : step}
            </div>
            
            {index < totalSteps - 1 && (
              <div className={`h-1 flex-grow ${currentStep > step ? "bg-primary" : "bg-gray-200"}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
