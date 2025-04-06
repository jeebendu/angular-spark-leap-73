
import React from "react";

interface StepLabelsProps {
  labels: string[];
  currentStep: number;
}

export function StepLabels({ labels, currentStep }: StepLabelsProps) {
  return (
    <div className="flex justify-between mb-6 text-xs sm:text-sm px-2">
      {labels.map((label, index) => (
        <div 
          key={index}
          className={`flex flex-col items-center ${currentStep === index + 1 ? "text-primary" : "text-gray-500"}`}
        >
          <div className="font-medium flex items-center justify-center">
            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full mr-1 ${
              currentStep === index + 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
            }`}>
              {index + 1}
            </span>
            <span>{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
