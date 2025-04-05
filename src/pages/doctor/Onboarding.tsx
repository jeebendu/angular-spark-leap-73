
import { useState } from "react";
import { DoctorLayout } from "@/components/DoctorLayout";
import { OnboardingWizard } from "@/components/doctor/onboarding/OnboardingWizard";

const DoctorOnboarding = () => {
  return (
    <DoctorLayout>
      <div className="max-w-3xl mx-auto py-6">
        <OnboardingWizard />
      </div>
    </DoctorLayout>
  );
};

export default DoctorOnboarding;
