
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { getClinicById } from '@/services/ClinicService';
import { Clinic } from '@/models/clinic/Clinic';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Phone, Star, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

export default function ClinicDetails() {
  const { clinicId } = useParams<{ clinicId: string }>();
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
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
        <div className="container mx-auto py-6 px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-40 bg-gray-200 rounded mb-6"></div>
            <div className="flex space-x-4 mb-6">
              <div className="h-10 bg-gray-200 rounded w-20 flex-shrink-0"></div>
              <div className="h-10 bg-gray-200 rounded w-20 flex-shrink-0"></div>
              <div className="h-10 bg-gray-200 rounded w-20 flex-shrink-0"></div>
            </div>
            <div className="h-60 bg-gray-200 rounded"></div>
          </div>
        </div>
      </AppLayout>
    );
  }
  
  if (!clinic) {
    return (
      <AppLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col justify-center items-center min-h-[60vh]">
            <h2 className="text-2xl font-bold mb-4">Clinic not found</h2>
            <p className="mb-6 text-muted-foreground">The clinic you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/clinics')}>Go to All Clinics</Button>
          </div>
        </div>
      </AppLayout>
    );
  }
  
  // Mock data
  const rating = 4.5;
  const ratingCount = 153;
  const clinicType = "Diabetology Clinic";
  const location = clinic.address || "Gajapati Nagar, Bhubaneswar";
  const defaultImage = "https://res.cloudinary.com/dzxuxfagt/image/upload/assets/clinic-placeholder.jpg";
  const imageUrl = clinic.branchList?.[0]?.image || defaultImage;
  
  // Mock doctor data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sambit Das",
      specialty: "Endocrinologist",
      qualification: "MBBS, DM - Endocrinology",
      experience: 24,
      patientStories: 56,
      satisfaction: 93,
      fee: "₹800",
      availability: [
        { day: "Mon-Sat", time: "10:00 AM-12:30 PM" }
      ],
      verified: true,
      image: "https://ui-avatars.com/api/?name=Sambit+Das&background=random"
    },
    {
      id: 2,
      name: "Dr. Pitambar Prusty",
      specialty: "Endocrinologist",
      qualification: "MD - Medicine, DM - Endocrinology",
      experience: 45,
      patientStories: 2,
      satisfaction: 100,
      fee: "₹1,200",
      availability: [
        { day: "Mon", time: "10:00 AM-12:30 PM" }
      ],
      verified: true,
      image: "https://ui-avatars.com/api/?name=Pitambar+Prusty&background=random"
    }
  ];
  
  // Mock services
  const services = [
    { id: 1, name: "Diabetes Management" },
    { id: 2, name: "Obesity Treatment" },
    { id: 3, name: "THYROID" },
    { id: 4, name: "Hormonal Treatment" },
    { id: 5, name: "PCOD" },
    { id: 6, name: "PITUITARY DISORDER" },
    { id: 7, name: "GONADS" },
    { id: 8, name: "bioidentical hormone therapy" },
    { id: 9, name: "Lactation Counseling" }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <Link to="/clinics" className="text-primary hover:underline inline-flex items-center">
            ← Back to All Clinics
          </Link>
        </div>
        
        {/* Clinic Header Card */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16">
              <img 
                src={imageUrl}
                alt={clinic.name}
                className="w-full h-full object-contain rounded"
              />
            </div>
            
            <div className="flex-1">
              <span className="text-xs text-gray-500">Profile is claimed</span>
              <h1 className="text-xl font-semibold">{clinic.name}</h1>
              <p className="text-sm text-gray-600">{clinicType}</p>
              
              <div className="flex items-center mt-1">
                <div className="flex">
                  {Array.from({length: 5}).map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-sm font-medium">{rating}</span>
                <span className="text-sm text-gray-500 ml-1">({ratingCount} patient stories)</span>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-y-1">
                <div className="flex items-center text-xs text-gray-600 mr-6">
                  <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12.0001 6V12L16.2426 16.2426" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Wheelchair accessibility available</span>
                </div>
              </div>
              
              <div className="mt-1 text-xs text-gray-600">
                <div className="flex items-start">
                  <MapPin className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
                  <p>
                    {location}
                    <br />
                    {clinic.contact && <>Contact Number: {clinic.contact}</>}
                    <br />
                    {clinic.address && <>Address: {clinic.address}</>}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 text-xs">
                <Button variant="link" className="text-cyan-500 hover:text-cyan-600 p-0 h-auto">
                  Get Directions
                </Button>
              </div>
            </div>
            
            <div>
              <Button className="bg-blue-500 hover:bg-blue-600 w-32">
                <Phone className="h-4 w-4 mr-1" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('doctors')}
              >
                Doctors({doctors.length})
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'stories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('stories')}
              >
                Stories({ratingCount})
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'services' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('services')}
              >
                Services
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'questions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('questions')}
              >
                Questions
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'overview' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-2">About {clinic.name}</h2>
                  <p className="text-sm text-gray-600">
                    {clinic.name} is a {clinicType.toLowerCase()} in {location.split(',')[0]}. The clinic is visited by doctors like Dr. Sambit Das and Dr. Pitambar Prusty.
                    <Button variant="link" className="text-blue-500 hover:text-blue-600 p-0 h-auto text-sm">more...</Button>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-base font-medium mb-2">Timings</h3>
                    <div className="text-sm">
                      <p className="font-medium">Mon - Sat</p>
                      <p className="text-gray-600">09:00 AM - 07:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-base font-medium mb-2">Services</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                      {services.slice(0, 8).map(service => (
                        <div key={service.id} className="text-sm text-gray-600">
                          {service.name}
                        </div>
                      ))}
                    </div>
                    {services.length > 8 && (
                      <Button variant="link" className="text-blue-500 hover:text-blue-600 p-0 h-auto text-sm mt-1">
                        View all ({services.length})
                      </Button>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium mb-2">Photos</h3>
                    <div className="grid grid-cols-4 gap-1">
                      {Array.from({length: 4}).map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded overflow-hidden">
                          <img 
                            src={i === 0 ? imageUrl : `https://picsum.photos/100/100?random=${i}`}
                            alt="Clinic"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-1">
                      <Button variant="link" className="text-blue-500 hover:text-blue-600 p-0 h-auto text-xs">+ 8</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'doctors' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Doctors in {clinic.name}</h2>
                <div className="space-y-6">
                  {doctors.map(doctor => (
                    <div key={doctor.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4">
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                              <img 
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="font-medium text-blue-600">{doctor.name}</h3>
                            {doctor.verified && (
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full mt-1 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Prime
                              </span>
                            )}
                            <div className="text-xs text-gray-600 mt-1">
                              {doctor.qualification}
                            </div>
                            <div className="text-xs text-gray-600">
                              {doctor.specialty}
                            </div>
                            <div className="text-xs text-gray-600">
                              {doctor.experience} years experience overall
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Satisfaction */}
                            <div className="flex items-center">
                              <div className="text-sm font-medium">{doctor.satisfaction}%</div>
                              <div className="ml-2 w-24">
                                <Progress value={doctor.satisfaction} className="h-1.5" />
                              </div>
                              <div className="text-xs text-gray-500 ml-1">({doctor.patientStories} votes)</div>
                            </div>
                            
                            {/* Patient Stories */}
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                              </svg>
                              <span className="ml-1 text-sm">{doctor.patientStories} Patient Stories</span>
                            </div>
                            
                            {/* Fee */}
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                              </svg>
                              <span className="ml-1 text-sm">{doctor.fee}</span>
                            </div>
                            
                            {/* Availability */}
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-600" />
                              <span className="ml-1 text-sm">{doctor.availability[0].day}</span>
                            </div>
                            
                            {/* Availability Time */}
                            <div className="flex items-center">
                              <span className="ml-5 text-sm text-gray-600">{doctor.availability[0].time}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row mt-4 gap-2">
                            <Button variant="outline" className="flex items-center text-blue-600 border-blue-600">
                              <Phone className="h-4 w-4 mr-1" />
                              Contact Clinic
                            </Button>
                            <Button className="bg-blue-500 hover:bg-blue-600">
                              Book Clinic Visit
                              <ExternalLink className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'services' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Services at {clinic.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {services.map(service => (
                    <div key={service.id} className="border rounded-lg p-3">
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Consultation and treatment for {service.name.toLowerCase()}.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'stories' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Patient Stories for {clinic.name}</h2>
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="text-3xl font-bold">{rating}</div>
                    <div className="flex">
                      {Array.from({length: 5}).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{ratingCount} ratings</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <div className="w-24 text-sm text-right mr-2">Very Good</div>
                      <div className="flex-1">
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="w-10 text-sm text-right ml-2">75%</div>
                    </div>
                    <div className="flex items-center mb-1">
                      <div className="w-24 text-sm text-right mr-2">Good</div>
                      <div className="flex-1">
                        <Progress value={15} className="h-2" />
                      </div>
                      <div className="w-10 text-sm text-right ml-2">15%</div>
                    </div>
                    <div className="flex items-center mb-1">
                      <div className="w-24 text-sm text-right mr-2">Average</div>
                      <div className="flex-1">
                        <Progress value={5} className="h-2" />
                      </div>
                      <div className="w-10 text-sm text-right ml-2">5%</div>
                    </div>
                    <div className="flex items-center mb-1">
                      <div className="w-24 text-sm text-right mr-2">Poor</div>
                      <div className="flex-1">
                        <Progress value={3} className="h-2" />
                      </div>
                      <div className="w-10 text-sm text-right ml-2">3%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 text-sm text-right mr-2">Very Poor</div>
                      <div className="flex-1">
                        <Progress value={2} className="h-2" />
                      </div>
                      <div className="w-10 text-sm text-right ml-2">2%</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-center text-gray-600">
                    No stories have been shared for this clinic yet.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'questions' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Questions about {clinic.name}</h2>
                <p className="text-gray-600">
                  Have a question about {clinic.name}? Ask here and get answers from other patients who have visited this clinic.
                </p>
                <Button className="bg-blue-500 hover:bg-blue-600 mt-4">
                  Ask a Question
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
