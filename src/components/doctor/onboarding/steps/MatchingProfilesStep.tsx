
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, Check } from "lucide-react";

interface MatchingProfile {
  id: string;
  clinicName: string;
  location: string;
  area: string;
  doctorName: string;
  image: string;
  additionalDoctors?: number;
}

interface MatchingProfilesStepProps {
  onBack: () => void;
  onComplete?: () => void;
}

export const MatchingProfilesStep: React.FC<MatchingProfilesStepProps> = ({ 
  onBack,
  onComplete
}) => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  
  const mockProfiles: MatchingProfile[] = [
    {
      id: "1",
      clinicName: "Apollo Dental Clinic",
      location: "Varthur",
      area: "Bangalore",
      doctorName: "Dr. Pallapoiu Vasavi",
      image: "/public/lovable-uploads/0f62ca83-c439-4dfa-8703-5891d34eb742.png",
      additionalDoctors: 2
    },
    {
      id: "2",
      clinicName: "Apollo Dental Clinic",
      location: "Bommanahalli",
      area: "Bangalore",
      doctorName: "Dr. Prity Bhagat Lohia",
      image: "/public/lovable-uploads/0f62ca83-c439-4dfa-8703-5891d34eb742.png"
    }
  ];

  const handleCheckProfile = (profileId: string) => {
    console.log("Checking profile details for:", profileId);
    // In a real application, this would open a modal or navigate to a details page
  };

  const handleConfirm = () => {
    if (selectedProfile) {
      console.log("Profile confirmed:", selectedProfile);
      // In a real application, this would submit the selection and complete onboarding
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Matching profiles</h1>
        <p className="text-gray-600 mt-1">Select your best matching profile</p>
      </div>

      <div className="space-y-4">
        <RadioGroup 
          value={selectedProfile || ""} 
          onValueChange={setSelectedProfile}
        >
          {mockProfiles.map((profile) => (
            <div key={profile.id} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div className="flex">
                  <div className="mr-3 flex items-center">
                    <RadioGroupItem value={profile.id} id={`profile-${profile.id}`} />
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <img 
                        src={profile.image} 
                        alt={profile.clinicName}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-medium">{profile.clinicName}</h3>
                        <p className="text-gray-500 text-sm">{profile.location}</p>
                        <p className="text-gray-500 text-sm">{profile.area}</p>
                      </div>
                    </div>
                    <p className="text-sm mt-1">
                      {profile.doctorName}
                      {profile.additionalDoctors && (
                        <span className="text-primary"> & {profile.additionalDoctors} more doctors</span>
                      )}
                    </p>
                  </div>
                </div>
                
                <Button
                  type="button" 
                  variant="link" 
                  className="text-primary hover:text-primary/90"
                  onClick={() => handleCheckProfile(profile.id)}
                >
                  CHECK PROFILE
                </Button>
              </div>
              
              <div className="mt-2">
                <Label 
                  htmlFor={`profile-${profile.id}`} 
                  className="flex items-center cursor-pointer"
                >
                  <span>This is my profile</span>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="border-t pt-4 mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Button
          className="bg-primary hover:bg-primary/90 px-8 flex items-center"
          onClick={handleConfirm}
          disabled={!selectedProfile}
        >
          <Check className="h-4 w-4 mr-1" />
          Confirm
        </Button>
      </div>
    </div>
  );
};
