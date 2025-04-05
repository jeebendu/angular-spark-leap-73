
import { OnboardingWizard } from "@/components/doctor/onboarding/OnboardingWizard";

const DoctorOnboarding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">
            Fill in the required information to set up your doctor profile and start accepting appointments.
          </p>
        </div>
        <OnboardingWizard />
      </div>
    </div>
  );
};

export default DoctorOnboarding;
