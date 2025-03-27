import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Clock,
  Star,
  MapPin,
  Award,
  ThumbsUp,
  Languages,
  CalendarDays,
  Building,
  CheckCircle2,
  Phone,
  Mail,
  MessageSquare,
  User,
  Heart,
  Share2,
  ArrowLeft
} from "lucide-react";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";

const DoctorDetails = () => {
  const { id } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedClinic, setSelectedClinic] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  // Mock doctor data (in a real app, you'd fetch this based on the ID)
  const doctor = {
    id: id || "1",
    name: "Dr. Emily Johnson",
    specialty: "Cardiologist",
    qualifications: "MBBS, MD (Cardiology), DNB",
    experience: "12+ years",
    rating: 4.8,
    reviewCount: 235,
    consultationFee: "₹1,200",
    bio: "Dr. Emily Johnson is a highly skilled cardiologist with over 12 years of experience in diagnosing and treating heart diseases. She specializes in interventional cardiology and has performed more than 1,000 cardiac procedures.",
    languages: ["English", "Hindi", "Tamil"],
    education: [
      { degree: "MBBS", institute: "AIIMS, New Delhi", year: "2008" },
      { degree: "MD (Cardiology)", institute: "PGIMER, Chandigarh", year: "2012" },
      { degree: "DNB (Cardiology)", institute: "National Board of Examinations", year: "2013" }
    ],
    services: [
      "Comprehensive Cardiac Evaluation",
      "Echocardiography",
      "ECG",
      "Stress Testing",
      "Heart Disease Management",
      "Heart Failure Treatment"
    ],
    clinics: [
      {
        name: "HeartCare Clinic",
        address: "123 ABC Road, Koramangala, Bangalore",
        phone: "+91 9876543210",
        timings: "9:00 AM - 6:00 PM",
        days: "Monday to Saturday"
      },
      {
        name: "City Heart Center",
        address: "456 XYZ Road, Indiranagar, Bangalore",
        phone: "+91 9876543211",
        timings: "10:00 AM - 4:00 PM",
        days: "Monday, Wednesday, Friday"
      }
    ]
  };
  
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];
  
  const handleTimeSlotSelection = (slot: string) => {
    setSelectedTimeSlot(slot);
  };

  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-6xl mx-auto">
        {/* Back button */}
        <Link to="/doctor-search" className="flex items-center text-primary mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to search
        </Link>
        
        {/* Doctor Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="md:flex">
            <div className="md:w-1/3 relative">
              <img 
                src={`https://placehold.co/600x400/eaf7fc/33C3F0?text=Dr.+Emily&font=montserrat`}
                alt={doctor.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 right-4 md:hidden">
                <Button variant="outline" size="icon" className="rounded-full bg-white">
                  <Heart className="h-5 w-5 text-rose-500" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-white ml-2">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
                    <p className="text-gray-600">{doctor.specialty}</p>
                    <p className="text-sm text-gray-500">{doctor.qualifications}</p>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({doctor.reviewCount} reviews)</span>
                      </div>
                      <span className="mx-2 text-gray-300">|</span>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-primary" />
                        <span className="ml-1 text-sm">98% Recommended</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                        <Award className="h-3 w-3" />
                        <span>{doctor.experience}</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                        <Languages className="h-3 w-3" />
                        <span>{doctor.languages.join(", ")}</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3 py-1">
                        <Building className="h-3 w-3" />
                        <span>{doctor.clinics.length} Clinics</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Heart className="h-5 w-5 text-rose-500" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full ml-2">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <p className="text-gray-700 text-sm md:text-base">{doctor.bio}</p>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div>
                  <p className="text-gray-500 text-sm">Consultation Fee</p>
                  <p className="text-xl font-bold text-primary">{doctor.consultationFee}</p>
                </div>
                
                <BookAppointmentModal 
                  doctorName={doctor.name}
                  specialty={doctor.specialty}
                  trigger={
                    <Button className="sky-button rounded-full">Book Appointment</Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Doctor Details Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <Tabs defaultValue="clinics">
            <TabsList className="w-full border-b">
              <TabsTrigger value="clinics" className="flex-1">Clinics</TabsTrigger>
              <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
              <TabsTrigger value="services" className="flex-1">Services</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="clinics" className="p-6">
              <h3 className="text-lg font-medium mb-4">Available Clinics</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {doctor.clinics.map((clinic, index) => (
                  <Card key={index} className={`cursor-pointer border-2 ${selectedClinic === index ? 'border-primary' : 'border-gray-100'}`} onClick={() => setSelectedClinic(index)}>
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-base">{clinic.name}</h4>
                          <p className="text-sm text-gray-500 flex items-start mt-1">
                            <MapPin className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
                            {clinic.address}
                          </p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            <span>{clinic.days}</span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{clinic.timings}</span>
                          </div>
                        </div>
                        {selectedClinic === index && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Select Appointment Date & Time</h3>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                  
                  <div className="md:w-1/2">
                    <h4 className="font-medium mb-2">Available Slots</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTimeSlot === slot ? "default" : "outline"}
                          size="sm"
                          className={selectedTimeSlot === slot ? 'bg-primary text-white' : ''}
                          onClick={() => handleTimeSlotSelection(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                    
                    <BookAppointmentModal 
                      doctorName={doctor.name}
                      specialty={doctor.specialty}
                      trigger={
                        <Button className="w-full sky-button mt-6" disabled={!selectedTimeSlot}>
                          Book Appointment
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Education & Qualifications</h3>
                  <div className="space-y-3">
                    {doctor.education.map((edu, index) => (
                      <div key={index} className="flex">
                        <div className="mr-3 mt-1">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <div>
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-gray-500">{edu.institute} • {edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Languages Spoken</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="rounded-full">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <span>+91 9876543210</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>dr.emily@example.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="services" className="p-6">
              <h3 className="text-lg font-medium mb-4">Services Offered</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {doctor.services.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium">Patient Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-5 w-5 ${star <= Math.floor(doctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">{doctor.rating} out of 5</span>
                  </div>
                </div>
                
                <Button variant="outline">Write a Review</Button>
              </div>
              
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {["Rahul S.", "Priya M.", "Amit K."][index]}
                          </h4>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-3 w-3 ${star <= 5-(index % 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-xs text-gray-500">
                              {["2 months ago", "1 week ago", "3 months ago"][index]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      {[
                        "Dr. Johnson was very thorough in her examination and explained everything clearly. The staff was also very helpful and courteous.",
                        "I had a great experience with Dr. Johnson. She took the time to listen to my concerns and provided a comprehensive treatment plan.",
                        "Excellent doctor with great knowledge. Very patient and answered all my questions in detail. Highly recommended!"
                      ][index]}
                    </p>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Load More Reviews
              </Button>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Similar Doctors */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Similar Specialists</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="overflow-hidden border-none card-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-3">
                      <img 
                        src={`https://placehold.co/200/eaf7fc/33C3F0?text=Dr.+${index+1}&font=montserrat`}
                        alt={`Dr. ${index+1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">{`Dr. ${["Robert Smith", "Sarah Williams", "James Brown"][index]}`}</h4>
                      <p className="text-sm text-gray-500">{["Cardiologist", "Cardiologist", "Cardiac Surgeon"][index]}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-xs">{4.5 + (index * 0.1)}</span>
                        <span className="ml-1 text-xs text-gray-500">({150 + (index * 25)})</span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/doctor/${index + 2}`}>
                    <Button variant="outline" className="m-4 w-[calc(100%-32px)] border-primary text-primary hover:bg-primary hover:text-white">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DoctorDetails;
