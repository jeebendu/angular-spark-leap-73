
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Building, Clock, Star, ThumbsUp, Award, GraduationCap, Languages, MessageCircle, Heart, MapPin } from "lucide-react";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";

export default function DoctorDetails() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { id } = useParams();

  // This would be fetched from an API in a real app
  const doctor = {
    id: id,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    reviewCount: 120,
    price: "₹1200",
    experience: "12+ years",
    description: "Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology, heart failure management, and cardiac rehabilitation.",
    education: [
      { degree: "MD in Cardiology", institution: "All India Institute of Medical Sciences, Delhi", year: "2010" },
      { degree: "MBBS", institution: "Christian Medical College, Vellore", year: "2006" }
    ],
    specializations: ["Preventive Cardiology", "Heart Failure Management", "Cardiac Rehabilitation", "Echocardiography"],
    languages: ["English", "Hindi", "Tamil"],
    clinics: [
      {
        id: "1",
        name: "HeartCare Clinic",
        address: "123 Main Street, Koramangala, Bangalore",
        timings: "Mon-Sat: 9:00 AM - 1:00 PM",
        fees: "₹1200"
      },
      {
        id: "2",
        name: "City Heart Center",
        address: "456 Park Avenue, Indiranagar, Bangalore",
        timings: "Mon, Wed, Fri: 5:00 PM - 8:00 PM",
        fees: "₹1500"
      }
    ],
    imageSrc: `https://placehold.co/400x400/eaf7fc/33C3F0?text=Dr.+${id}&font=montserrat`
  };

  return (
    <AppLayout>
      <div className="grid gap-6 md:grid-cols-7">
        {/* Doctor Profile Card */}
        <Card className="md:col-span-2 border-none card-shadow h-fit">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={doctor.imageSrc} alt={doctor.name} />
                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <h1 className="text-xl font-bold">{doctor.name}</h1>
              <p className="text-muted-foreground">{doctor.specialty}</p>
              
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                <span className="ml-1 text-sm text-muted-foreground">({doctor.reviewCount} reviews)</span>
              </div>
              
              <div className="mt-4 w-full">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium">{doctor.experience}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Consultation Fee</span>
                  <span className="font-medium">{doctor.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="font-medium">{doctor.languages.join(", ")}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3 w-full">
                <BookAppointmentModal 
                  doctorName={doctor.name}
                  specialty={doctor.specialty}
                  trigger={
                    <Button className="w-full sky-button">
                      Book Appointment
                    </Button>
                  }
                />
                
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Consult Online
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Doctor Details */}
        <div className="md:col-span-5">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card className="border-none card-shadow">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-3">About</h2>
                  <p className="text-muted-foreground">{doctor.description}</p>
                  
                  <div className="grid gap-6 mt-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                        Education
                      </h3>
                      <ul className="space-y-3">
                        {doctor.education.map((edu, index) => (
                          <li key={index} className="text-sm">
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-muted-foreground">{edu.institution}, {edu.year}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-primary" />
                        Specializations
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {doctor.specializations.map((spec, index) => (
                          <li key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none card-shadow">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Clinic Locations</h2>
                  
                  <div className="space-y-4">
                    {doctor.clinics.map((clinic, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{clinic.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1 flex items-start">
                              <MapPin className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                              <span>{clinic.address}</span>
                            </p>
                            <p className="text-sm text-muted-foreground mt-1 flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{clinic.timings}</span>
                            </p>
                            <p className="text-sm mt-1 flex items-center">
                              <span className="font-medium">Consultation Fee: {clinic.fees}</span>
                            </p>
                          </div>
                          
                          <BookAppointmentModal 
                            doctorName={doctor.name}
                            specialty={doctor.specialty}
                            trigger={
                              <Button size="sm" className="sky-button whitespace-nowrap">
                                Book Now
                              </Button>
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none card-shadow">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Patient Experience</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Overall Rating</span>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{doctor.rating} out of 5</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <ThumbsUp className="h-6 w-6 text-primary mb-2" />
                        <span className="text-lg font-bold">98%</span>
                        <span className="text-xs text-muted-foreground text-center">Patients recommend this doctor</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <Clock className="h-6 w-6 text-primary mb-2" />
                        <span className="text-lg font-bold">10 mins</span>
                        <span className="text-xs text-muted-foreground text-center">Average wait time</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card className="border-none card-shadow">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Patient Reviews</h2>
                  
                  <div className="space-y-6">
                    {/* This would be mapped from actual reviews in a real app */}
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>
                                {['JD', 'AB', 'SK'][index]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium">
                                  {['John D.', 'Ananya B.', 'Suresh K.'][index]}
                                </h4>
                                <span className="text-xs text-muted-foreground ml-2">
                                  {['2 weeks ago', '1 month ago', '3 months ago'][index]}
                                </span>
                              </div>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`h-3 w-3 ${i < [5, 4, 5][index] ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Building className="h-3 w-3 mr-1" />
                            <span>{doctor.clinics[index % doctor.clinics.length].name}</span>
                          </div>
                        </div>
                        
                        <p className="mt-3 text-sm">
                          {[
                            "Dr. Johnson was extremely knowledgeable and took the time to explain my condition in detail. Very professional and caring.",
                            "Great experience overall. The doctor was punctual and addressed all my concerns. The clinic staff was also very helpful.",
                            "Excellent doctor with a good bedside manner. Made me feel comfortable and provided clear guidance for my treatment."
                          ][index]}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-6">
                    Load More Reviews
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="faqs">
              <Card className="border-none card-shadow">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
                  
                  <div className="space-y-4">
                    {[
                      {
                        q: "What conditions does Dr. Johnson treat?", 
                        a: "Dr. Johnson specializes in treating various heart conditions including coronary artery disease, heart failure, arrhythmias, heart valve diseases, and hypertension."
                      },
                      {
                        q: "How should I prepare for my appointment?", 
                        a: "Please bring your previous medical records, list of medications, and recent test results if any. It's also helpful to prepare a list of your symptoms and questions beforehand."
                      },
                      {
                        q: "Does Dr. Johnson provide online consultations?", 
                        a: "Yes, Dr. Johnson offers online consultations for follow-up appointments and non-emergency situations."
                      },
                      {
                        q: "What payment methods are accepted?", 
                        a: "The clinic accepts cash, all major credit/debit cards, and popular digital payment methods. They also provide assistance with insurance claims."
                      },
                      {
                        q: "How long does a typical consultation last?", 
                        a: "Initial consultations typically last 30-45 minutes, while follow-up appointments are usually 15-20 minutes."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <h3 className="font-medium mb-2">{faq.q}</h3>
                        <p className="text-sm text-muted-foreground">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
