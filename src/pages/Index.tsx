
import { Calendar, Clock, Filter, MapPin, Star } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { SearchBar } from "@/components/SearchBar";
import { DoctorCard } from "@/components/DoctorCard";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <AppLayout>
      <div className="container px-4 py-6">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="rounded-lg bg-white p-6 mb-6 md:p-8 lg:flex items-center justify-between">
            <div className="mb-6 lg:mb-0 lg:max-w-lg">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Find and Book Your Doctor</h1>
              <p className="text-muted-foreground mb-4">
                Book appointments with the best doctors and specialists in your area
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <SearchBar />
                <Button className="whitespace-nowrap" size="lg">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
            <div className="hidden lg:block max-w-xs">
              <img 
                src="https://placehold.co/400x300/e6f7ff/0099cc?text=Doctor+Consultation&font=montserrat" 
                alt="Doctor consultation" 
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-sm">Appointments</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-medium text-sm">Top Doctors</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium text-sm">Available Now</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-medium text-sm">Nearby</h3>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            <Button variant="link" className="text-primary">View All</Button>
          </div>
          <div className="grid gap-4">
            <AppointmentCard
              doctorName="Dr. Sarah Johnson"
              specialty="Cardiologist"
              date="Today, 15 May"
              time="10:00 AM"
              imageSrc="https://placehold.co/200/e6f7ff/0099cc?text=SJ&font=montserrat"
              status="upcoming"
            />
            <AppointmentCard
              doctorName="Dr. Michael Chen"
              specialty="Dermatologist"
              date="Tomorrow, 16 May"
              time="02:30 PM"
              imageSrc="https://placehold.co/200/e6f7ff/0099cc?text=MC&font=montserrat"
              status="upcoming"
            />
          </div>
        </section>

        {/* Popular Doctors */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Popular Doctors</h2>
            <Button variant="link" className="text-primary">View All</Button>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cardiologist">Cardiologist</TabsTrigger>
              <TabsTrigger value="dermatologist">Dermatologist</TabsTrigger>
              <TabsTrigger value="pediatrician">Pediatrician</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <DoctorCard
                  name="Dr. Melissa Thompson"
                  specialty="Cardiologist"
                  rating={4.9}
                  reviewCount={124}
                  price="$120"
                  imageSrc="https://placehold.co/400x300/e6f7ff/0099cc?text=Dr.+Thompson&font=montserrat"
                />
                <DoctorCard
                  name="Dr. James Wilson"
                  specialty="Neurologist"
                  rating={4.7}
                  reviewCount={98}
                  price="$150"
                  imageSrc="https://placehold.co/400x300/e6f7ff/0099cc?text=Dr.+Wilson&font=montserrat"
                />
                <DoctorCard
                  name="Dr. Emily Parker"
                  specialty="Dermatologist"
                  rating={4.8}
                  reviewCount={156}
                  price="$135"
                  imageSrc="https://placehold.co/400x300/e6f7ff/0099cc?text=Dr.+Parker&font=montserrat"
                />
                <DoctorCard
                  name="Dr. Robert Kim"
                  specialty="Pediatrician"
                  rating={4.9}
                  reviewCount={210}
                  price="$110"
                  imageSrc="https://placehold.co/400x300/e6f7ff/0099cc?text=Dr.+Kim&font=montserrat"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="cardiologist" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <DoctorCard
                  name="Dr. Melissa Thompson"
                  specialty="Cardiologist"
                  rating={4.9}
                  reviewCount={124}
                  price="$120"
                  imageSrc="https://placehold.co/400x300/e6f7ff/0099cc?text=Dr.+Thompson&font=montserrat"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="dermatologist" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <DoctorCard
                  name="Dr. Emily Parker"
                  specialty="Dermatologist"
                  rating={4.8}
                  reviewCount={156}
                  price="$135"
                  imageSrc="https://placehold.co/400x300/e6f7ff/0099cc?text=Dr.+Parker&font=montserrat"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="pediatrician" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <DoctorCard
                  name="Dr. Robert Kim"
                  specialty="Pediatrician"
                  rating={4.9}
                  reviewCount={210}
                  price="$110"
                  imageSrc="https://placehold.co/400x300/e6f7ff/0099cc?text=Dr.+Kim&font=montserrat"
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
