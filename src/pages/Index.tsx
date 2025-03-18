
import { Calendar, Clock, Filter, MapPin, Star, FileText, Stethoscope, Heart, Activity } from "lucide-react";
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
          <div className="rounded-xl bg-white p-6 mb-6 md:p-8 lg:flex items-center justify-between overflow-hidden relative card-shadow">
            <div className="mb-6 lg:mb-0 lg:max-w-lg">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Book Tests & Health Checkups</h1>
              <p className="text-muted-foreground mb-4">
                Schedule your tests at home or visit a nearby diagnostic center
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <SearchBar />
                <Button className="whitespace-nowrap orange-button rounded-full" size="lg">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
            <div className="hidden lg:block max-w-xs relative z-10">
              <img 
                src="https://placehold.co/400x300/fff5eb/FF6B00?text=Health+Tests&font=montserrat" 
                alt="Health tests" 
                className="rounded-lg"
              />
            </div>
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full opacity-10 orange-gradient"></div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Our Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-none card-shadow">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center hover:bg-orange-50 transition-colors">
                <div className="w-12 h-12 rounded-full orange-gradient flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium">Lab Tests</h3>
              </CardContent>
            </Card>
            <Card className="border-none card-shadow">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center hover:bg-orange-50 transition-colors">
                <div className="w-12 h-12 rounded-full orange-gradient flex items-center justify-center mb-3">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium">Doctors</h3>
              </CardContent>
            </Card>
            <Card className="border-none card-shadow">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center hover:bg-orange-50 transition-colors">
                <div className="w-12 h-12 rounded-full orange-gradient flex items-center justify-center mb-3">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium">Health Packages</h3>
              </CardContent>
            </Card>
            <Card className="border-none card-shadow">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center hover:bg-orange-50 transition-colors">
                <div className="w-12 h-12 rounded-full orange-gradient flex items-center justify-center mb-3">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium">Health Concerns</h3>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="mb-10">
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
              imageSrc="https://placehold.co/200/fff5eb/FF6B00?text=SJ&font=montserrat"
              status="upcoming"
            />
            <AppointmentCard
              doctorName="Dr. Michael Chen"
              specialty="Dermatologist"
              date="Tomorrow, 16 May"
              time="02:30 PM"
              imageSrc="https://placehold.co/200/fff5eb/FF6B00?text=MC&font=montserrat"
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
            <TabsList className="mb-4 bg-white border border-gray-100">
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
                  price="₹1,200"
                  imageSrc="https://placehold.co/400x300/fff5eb/FF6B00?text=Dr.+Thompson&font=montserrat"
                />
                <DoctorCard
                  name="Dr. James Wilson"
                  specialty="Neurologist"
                  rating={4.7}
                  reviewCount={98}
                  price="₹1,500"
                  imageSrc="https://placehold.co/400x300/fff5eb/FF6B00?text=Dr.+Wilson&font=montserrat"
                />
                <DoctorCard
                  name="Dr. Emily Parker"
                  specialty="Dermatologist"
                  rating={4.8}
                  reviewCount={156}
                  price="₹1,350"
                  imageSrc="https://placehold.co/400x300/fff5eb/FF6B00?text=Dr.+Parker&font=montserrat"
                />
                <DoctorCard
                  name="Dr. Robert Kim"
                  specialty="Pediatrician"
                  rating={4.9}
                  reviewCount={210}
                  price="₹1,100"
                  imageSrc="https://placehold.co/400x300/fff5eb/FF6B00?text=Dr.+Kim&font=montserrat"
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
                  price="₹1,200"
                  imageSrc="https://placehold.co/400x300/fff5eb/FF6B00?text=Dr.+Thompson&font=montserrat"
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
                  price="₹1,350"
                  imageSrc="https://placehold.co/400x300/fff5eb/FF6B00?text=Dr.+Parker&font=montserrat"
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
                  price="₹1,100"
                  imageSrc="https://placehold.co/400x300/fff5eb/FF6B00?text=Dr.+Kim&font=montserrat"
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
