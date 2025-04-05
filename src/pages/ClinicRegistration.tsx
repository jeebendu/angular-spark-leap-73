
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Building, Mail, Phone, MapPin } from "lucide-react";
import { DoctorLoginDialog } from "@/components/doctor/DoctorLoginDialog";

// Define types for our forms
interface ClinicRegistrationForm {
  name: string;
  email: string;
  contact: string;
  address: string;
  subdomain: string;
}

interface ClinicAccessForm {
  clinicCode: string;
  subdomain: string;
}

// Define validation schemas
const registerFormSchema = z.object({
  name: z.string().min(2, "Clinic name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  contact: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  subdomain: z.string()
    .min(3, "Subdomain must be at least 3 characters")
    .max(20, "Subdomain cannot exceed 20 characters")
    .regex(/^[a-z0-9-]+$/, "Subdomain can only contain lowercase letters, numbers, and hyphens")
});

const accessFormSchema = z.object({
  clinicCode: z.string().min(1, "Clinic code is required"),
  subdomain: z.string().min(1, "Subdomain is required")
});

const ClinicRegistration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"register" | "access">("register");
  
  // Create separate form instances for registration and access
  const registrationForm = useForm<ClinicRegistrationForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      address: "",
      subdomain: ""
    }
  });
  
  const accessForm = useForm<ClinicAccessForm>({
    resolver: zodResolver(accessFormSchema),
    defaultValues: {
      clinicCode: "",
      subdomain: ""
    }
  });
  
  const onSubmitRegistration = (data: ClinicRegistrationForm) => {
    console.log("Registration data:", data);
    toast({
      title: "Registration submitted",
      description: "Your clinic registration request has been received.",
    });
  };
  
  const onSubmitAccess = (data: ClinicAccessForm) => {
    console.log("Access data:", data);
    toast({
      title: "Redirecting to your clinic",
      description: "You will be redirected to your clinic dashboard.",
    });
    // In a real app, this would redirect to the subdomain
    setTimeout(() => {
      window.location.href = `https://${data.subdomain}.clinichub.com`;
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left side - SaaS Product Info */}
          <div className="md:col-span-7">
            <div className="mb-8">
              <img 
                src="https://res.cloudinary.com/dzxuxfagt/image/upload/h_100/assets/logo.png" 
                alt="Clinic Hub" 
                className="h-16 mb-6"
              />
              <h1 className="text-4xl font-bold mb-4">Clinic Management Platform</h1>
              <p className="text-xl text-gray-600 mb-6">
                The all-in-one solution for modern healthcare practices
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Patient Management</h3>
                  <p className="text-gray-600">
                    Easily manage patient records, appointments, and medical history.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Online Booking</h3>
                  <p className="text-gray-600">
                    Let patients book appointments online and reduce no-shows.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Billing & Invoicing</h3>
                  <p className="text-gray-600">
                    Streamline payments with automated billing and insurance processing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Reporting & Analytics</h3>
                  <p className="text-gray-600">
                    Gain insights into your practice with comprehensive data analytics.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex space-x-4 mb-8">
              <Button size="lg">Learn More</Button>
              <Button size="lg" variant="outline">Schedule Demo</Button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-500">For healthcare providers:</span>
              <DoctorLoginDialog />
            </div>
          </div>
          
          {/* Right side - Registration/Access Form */}
          <div className="md:col-span-5">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "register" | "access")}>
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="register">Register New Clinic</TabsTrigger>
                    <TabsTrigger value="access">Access Existing Clinic</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="register">
                    <Form {...registrationForm}>
                      <form onSubmit={registrationForm.handleSubmit(onSubmitRegistration)} className="space-y-6">
                        <div className="space-y-4">
                          <FormField
                            control={registrationForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Clinic Name*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your clinic name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={registrationForm.control}
                            name="subdomain"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Subdomain*</FormLabel>
                                <FormControl>
                                  <div className="flex items-center">
                                    <Input placeholder="yourclinic" {...field} className="rounded-r-none" />
                                    <div className="bg-gray-100 px-3 py-2 border border-l-0 border-input rounded-r-md text-gray-500">
                                      .clinichub.com
                                    </div>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <FormField
                            control={registrationForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address*</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="clinic@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={registrationForm.control}
                            name="contact"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number*</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <FormField
                            control={registrationForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address*</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Main St, City, Country" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button type="submit" size="lg" className="w-full">Register Clinic</Button>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="access">
                    <Form {...accessForm}>
                      <form onSubmit={accessForm.handleSubmit(onSubmitAccess)} className="space-y-6">
                        <div className="space-y-4">
                          <FormField
                            control={accessForm.control}
                            name="clinicCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Clinic Code*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your clinic code" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={accessForm.control}
                            name="subdomain"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subdomain*</FormLabel>
                                <FormControl>
                                  <div className="flex items-center">
                                    <Input placeholder="yourclinic" {...field} className="rounded-r-none" />
                                    <div className="bg-gray-100 px-3 py-2 border border-l-0 border-input rounded-r-md text-gray-500">
                                      .clinichub.com
                                    </div>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button type="submit" size="lg" className="w-full">Access Clinic Portal</Button>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicRegistration;
