
import React from 'react';
import { Link } from "react-router-dom";
import { MapPin, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Clinic } from "@/models/clinic/Clinic";

interface ClinicCardProps {
  clinic: Clinic;
}

export const ClinicCard: React.FC<ClinicCardProps> = ({ clinic }) => {
  // Mock data - in a real app, these would come from the API
  const rating = 4.5;
  const ratingCount = Math.floor(Math.random() * 200) + 10; // Random number between 10-210
  const consultationFees = `₹${Math.floor(Math.random() * 1000) + 300}`; // Random price between 300-1300
  const specialtiesCount = clinic.branchList?.length || 1;
  const doctorsCount = Math.floor(Math.random() * 3) + 1; // Random between 1-3 doctors
  const isOpenToday = Math.random() > 0.5; // Randomly determine if open today
  const patientStories = Math.floor(Math.random() * 200) + 10;
  const patientSatisfaction = Math.floor(Math.random() * 10) + 90; // Between 90-100%
  
  // Sample doctor data
  const doctorName = "Dr. " + (clinic.name.split(" ")[0] || "John");
  const doctorSpecialty = ["Dentist", "Homeopath", "Endocrinologist", "Cardiologist", "Dermatologist"][Math.floor(Math.random() * 5)];
  const doctorExperience = Math.floor(Math.random() * 30) + 5; // Between 5-35 years
  
  const clinicLogo = clinic.branchList?.[0]?.image || `https://ui-avatars.com/api/?name=${clinic.name}&background=random&color=fff&size=128`;
  
  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Clinic Logo */}
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={clinicLogo} 
            alt={clinic.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Clinic Information */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row gap-3 justify-between">
            <div>
              {/* Clinic Name and Type */}
              <Link to={`/clinics/${clinic.id}`} className="text-xl font-semibold hover:text-primary">
                {clinic.name}
              </Link>
              <p className="text-sm text-gray-600">Multi-specialty Clinic</p>
              
              {/* Location */}
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{clinic.address?.substring(0, 25) || "Location information unavailable"}</span>
              </div>
              
              {/* Consultation Fee */}
              <div className="mt-1 text-sm">
                {consultationFees} Consultation Fees
              </div>
              
              {/* Specialties and Doctors Count */}
              <div className="mt-1 text-sm">
                {specialtiesCount} {specialtiesCount === 1 ? 'Specialty' : 'Specialties'} • {doctorsCount} {doctorsCount === 1 ? 'Doctor' : 'Doctors'}
              </div>
              
              {/* Open Hours */}
              <div className="flex items-center mt-1 text-xs">
                <Clock className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-600">
                  {isOpenToday ? 'Open Today 10:00 AM - 2:00 PM' : 'Open Tomorrow 10:00 AM - 2:00 PM'}
                </span>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mt-2 md:mt-0">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{rating}</span>
              <span className="text-gray-500 text-xs ml-1">({ratingCount} rated)</span>
            </div>
          </div>
          
          {/* Doctor Information */}
          <div className="mt-4 flex flex-wrap items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={`https://ui-avatars.com/api/?name=${doctorName}&background=random&color=fff`} 
                  alt={doctorName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">{doctorName}</p>
                <p className="text-xs text-gray-600">{doctorSpecialty}</p>
                <p className="text-xs text-gray-600">{doctorExperience} years experience</p>
              </div>
            </div>
            
            {/* Patient Satisfaction */}
            <div>
              <div className="flex items-center mb-1">
                <span className="bg-green-500 text-white p-1 rounded mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-sm font-medium">{patientSatisfaction}%</span>
                <span className="text-xs text-gray-500 ml-1">• {patientStories} Patient Stories</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="md:w-48 flex flex-col gap-2">
          <Button className="w-full bg-blue-500 hover:bg-blue-600">
            Book Clinic Visit
          </Button>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Clinic
          </Button>
        </div>
      </div>
    </div>
  );
};
