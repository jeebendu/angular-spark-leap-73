
import { useState, useEffect } from 'react';
import { Doctor } from '@/models/Doctor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DoctorCard } from '@/components/DoctorCard';
import { ArrowRight, Clock } from 'lucide-react';
import { fetchSimilarDoctors } from '@/services/doctorService';

interface SimilarDoctorsProps {
  specialties: Array<{id?: number; name: string}>;
  latitude: number;
  longitude: number;
  excludeDoctorId: number;
}

export function SimilarDoctors({ specialties, latitude, longitude, excludeDoctorId }: SimilarDoctorsProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadSimilarDoctors = async () => {
      setIsLoading(true);
      try {
        // Only fetch if we have coordinates and specialties
        if (latitude && longitude && specialties?.length > 0) {
          const response = await fetchSimilarDoctors(specialties, latitude, longitude);
          
          if (response && response.data) {
            // Filter out the current doctor and limit to 4 doctors
            const filteredDoctors = response.data
              .filter((doc: Doctor) => doc.id !== excludeDoctorId)
              .slice(0, 4);
              
            setDoctors(filteredDoctors);
          }
        }
      } catch (error) {
        console.error('Error fetching similar doctors:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSimilarDoctors();
  }, [specialties, latitude, longitude, excludeDoctorId]);
  
  if (doctors.length === 0) {
    return null;
  }
  
  return (
    <Card className="border-none card-shadow my-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Similar Doctors Nearby
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {doctors.map((doctor) => (
            <DoctorCard 
              key={doctor.id}
              doctor={doctor}
              isSimple
            />
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="flex items-center">
            See more similar doctors
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
