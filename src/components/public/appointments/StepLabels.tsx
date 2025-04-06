
import React from "react";

interface StepLabelsProps {
  labels: string[];
  currentStep: number;
}

export function StepLabels({ labels, currentStep }: StepLabelsProps) {
  return (
    <div className="flex justify-center mb-6 text-sm">
      {labels.map((label, index) => (
        <div 
          key={index}
          className={`mx-2 font-medium ${currentStep === index + 1 ? "text-primary" : "text-gray-500"}`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
