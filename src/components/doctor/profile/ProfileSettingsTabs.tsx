
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicDetailsForm } from "./BasicDetailsForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { AwardsForm } from "./AwardsForm";
import { ClinicsForm } from "./ClinicsForm";

export const ProfileSettingsTabs = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-2">
        <TabsTrigger value="basic">Basic Details</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="awards">Awards</TabsTrigger>
        <TabsTrigger value="clinics">Clinics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic" className="mt-4">
        <BasicDetailsForm />
      </TabsContent>
      
      <TabsContent value="experience" className="mt-4">
        <ExperienceForm />
      </TabsContent>
      
      <TabsContent value="education" className="mt-4">
        <EducationForm />
      </TabsContent>
      
      <TabsContent value="awards" className="mt-4">
        <AwardsForm />
      </TabsContent>
      
      <TabsContent value="clinics" className="mt-4">
        <ClinicsForm />
      </TabsContent>
    </Tabs>
  );
};
