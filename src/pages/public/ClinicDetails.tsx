
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { getClinicById } from '@/services/ClinicService';
import { Clinic } from '@/models/clinic/Clinic';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Phone, Mail, Building, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function ClinicDetails() {
  const { clinicId } = useParams<{ clinicId: string }>();
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchClinicDetails = async () => {
      if (!clinicId) return;
      
      try {
        setLoading(true);
        const response = await getClinicById(clinicId);
        setClinic(response.data);
      } catch (error) {
        console.error("Error fetching clinic details:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load clinic details. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchClinicDetails();
  }, [clinicId, toast]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p>Loading clinic details...</p>
        </div>
      </AppLayout>
    );
  }
  
  if (!clinic) {
    return (
      <AppLayout>
        <div className="flex flex-col justify-center items-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">Clinic not found</h2>
          <p className="mb-6 text-muted-foreground">The clinic you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/clinics')}>Go to All Clinics</Button>
        </div>
      </AppLayout>
    );
  }
  
  const defaultImage = "https://res.cloudinary.com/dzxuxfagt/image/upload/assets/clinic-placeholder.jpg";
  const imageUrl = clinic.branchList?.[0]?.image || defaultImage;

  return (
    <AppLayout>
      <div className="py-6">
        {/* Back Button */}
        <Link to="/clinics" className="inline-flex items-center text-primary mb-4 hover:underline">
          ← Back to All Clinics
        </Link>
        
        {/* Clinic Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={imageUrl} 
                alt={clinic.name} 
                className="w-full h-full object-cover max-h-[300px] md:max-h-none"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{clinic.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-primary">Health Center</Badge>
                    <Badge variant="outline">{clinic.branchList?.length || 0} {clinic.branchList?.length === 1 ? 'Branch' : 'Branches'}</Badge>
                  </div>
                </div>
                <Button>Book Appointment</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{clinic.address}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p className="text-muted-foreground">{clinic.timings || 'Open 24/7'}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p className="text-muted-foreground">{clinic.contact}</p>
                </div>
                {clinic.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                    <p className="text-muted-foreground">{clinic.email}</p>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-4">
                <Button variant="outline">Get Directions</Button>
                <Button variant="outline">Call Clinic</Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Clinic Details Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <Tabs defaultValue="about">
            <TabsList className="w-full border-b">
              <TabsTrigger value="about" className="flex-1 flex items-center justify-center">
                <Building className="h-4 w-4 mr-2" />
                About
              </TabsTrigger>
              <TabsTrigger value="branches" className="flex-1 flex items-center justify-center">
                <Building className="h-4 w-4 mr-2" />
                Branches
              </TabsTrigger>
              <TabsTrigger value="doctors" className="flex-1 flex items-center justify-center">
                <Users className="h-4 w-4 mr-2" />
                Doctors
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="p-6">
              <h2 className="text-xl font-semibold mb-4">About {clinic.name}</h2>
              <p className="text-muted-foreground">
                {clinic.name} is a healthcare facility providing comprehensive medical services to patients.
                The clinic is equipped with modern technology and staffed with experienced healthcare professionals.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Operating Hours</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <p className="font-medium">Saturday</p>
                  <p className="text-muted-foreground">10:00 AM - 4:00 PM</p>
                </div>
                <div>
                  <p className="font-medium">Sunday</p>
                  <p className="text-muted-foreground">Closed</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Services Offered</h3>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>General Consultation</li>
                <li>Diagnostic Services</li>
                <li>Preventive Care</li>
                <li>Emergency Services</li>
                <li>Laboratory Services</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="branches" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Branches</h2>
              {clinic.branchList && clinic.branchList.length > 0 ? (
                <div className="space-y-4">
                  {clinic.branchList.map((branch, index) => (
                    <div key={branch.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg">{branch.name || `Branch ${index + 1}`}</h3>
                      <div className="mt-2 space-y-2">
                        {branch.address && (
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                            <p className="text-muted-foreground">{branch.address}</p>
                          </div>
                        )}
                        {branch.city && (
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                            <p className="text-muted-foreground">
                              {[branch.city, branch.state?.name, branch.country?.name]
                                .filter(Boolean)
                                .join(', ')}
                            </p>
                          </div>
                        )}
                        {branch.pincode && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <p className="text-muted-foreground">Pincode: {branch.pincode}</p>
                          </div>
                        )}
                      </div>
                      {branch.mapurl && (
                        <Button variant="outline" size="sm" className="mt-3">
                          View on Map
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No branch information available for this clinic.</p>
              )}
            </TabsContent>
            
            <TabsContent value="doctors" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Doctors at {clinic.name}</h2>
              <div className="flex justify-between mb-4">
                <p className="text-muted-foreground">Find doctors associated with this clinic</p>
                <Link to="/doctor/search">
                  <Button variant="outline">Find Doctors</Button>
                </Link>
              </div>
              <p className="text-muted-foreground">
                Doctor information is available when you search for specific medical specialties.
                Please use the doctor search feature to find practitioners at this clinic.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
