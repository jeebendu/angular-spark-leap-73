
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Clinic } from "@/models/Clinic";
import { Building, Mail, Phone, MapPin } from "lucide-react";

const ClinicRegistration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"register" | "access">("register");
  const form = useForm<Partial<Clinic & { subdomain: string }>>();
  
  const onSubmitRegistration = (data: Partial<Clinic & { subdomain: string }>) => {
    console.log("Registration data:", data);
    toast({
      title: "Registration submitted",
      description: "Your clinic registration request has been received.",
    });
  };
  
  const onSubmitAccess = (data: { clinicCode: string; subdomain: string }) => {
    console.log("Access data:", data);
    toast({
      title: "Redirecting to your clinic",
      description: "You will be redirected to your clinic dashboard.",
    });
    // In a real app, this would redirect to the subdomain
    setTimeout(() => {
      window.location.href = `https://${data.subdomain}.example.com`;
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Clinic Management Platform</h1>
            <p className="text-gray-600">
              Register your clinic or access your existing clinic portal
            </p>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "register" | "access")}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="register">Register New Clinic</TabsTrigger>
                  <TabsTrigger value="access">Access Existing Clinic</TabsTrigger>
                </TabsList>
                
                <TabsContent value="register">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitRegistration)} className="space-y-6">
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center">
                          <Building className="mr-2 h-5 w-5 text-primary" />
                          Basic Information
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
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
                            control={form.control}
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
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center">
                          <Mail className="mr-2 h-5 w-5 text-primary" />
                          Contact Information
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
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
                            control={form.control}
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
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-primary" />
                          Location
                        </h2>
                        
                        <FormField
                          control={form.control}
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
                      
                      <div className="pt-4 flex justify-end">
                        <Button type="submit" size="lg">Register Clinic</Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="access">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitAccess)} className="space-y-6">
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Access Your Clinic Portal</h2>
                        <p className="text-gray-600">
                          Enter your clinic code and subdomain to access your clinic portal
                        </p>
                        
                        <FormField
                          control={form.control}
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
                          control={form.control}
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
                      
                      <div className="pt-4 flex justify-end">
                        <Button type="submit" size="lg">Access Clinic Portal</Button>
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
  );
};

export default ClinicRegistration;
