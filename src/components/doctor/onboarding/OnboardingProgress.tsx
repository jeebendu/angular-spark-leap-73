
import React from "react";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-1">
        <div className="h-1 bg-primary rounded-r-none" 
          style={{ 
            width: `${(currentStep / totalSteps) * 100}%`,
            height: '4px'
          }}
        ></div>
        <div className="h-1 bg-gray-300 flex-grow rounded-l-none"
          style={{ 
            width: `${100 - (currentStep / totalSteps) * 100}%`,
            height: '4px'
          }}
        ></div>
      </div>
      <div className="text-sm text-gray-600 font-medium mt-1">Step {currentStep} of {totalSteps}</div>
    </div>
  );
};
