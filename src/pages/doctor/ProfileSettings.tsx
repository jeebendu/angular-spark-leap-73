
import React from "react";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import { ProfileSettingsTabs } from "@/components/doctor/profile/ProfileSettingsTabs";
import { PageHeader } from "@/components/doctor/profile/PageHeader";

const ProfileSettings = () => {
  return (
    <DoctorLayout>
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <PageHeader 
          title="Profile Settings" 
          description="Manage your professional profile information"
        />
        <ProfileSettingsTabs />
      </div>
    </DoctorLayout>
  );
};

export default ProfileSettings;
