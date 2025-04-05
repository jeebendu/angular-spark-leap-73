
import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  BuildingIcon, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Shield, 
  LineChart, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ProvidersMenu } from "@/components/ProvidersMenu";

const ClinicManagementLanding = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center gap-8 mb-16"
        >
          <div className="lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Streamline Your Clinic Management
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              A comprehensive SaaS solution designed specifically for healthcare providers to optimize operations, improve patient care, and boost revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="sky-button" asChild>
                <Link to="/clinic-registration">Get Started Free</Link>
              </Button>
              <Button variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://preview--appointify-platform-67.lovable.app/lovable-uploads/8ecf0148-aeef-4d33-acd7-b29efebedf9d.png"
              alt="Clinic Management Dashboard"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </motion.div>

        {/* Features Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Clinics</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage your practice efficiently in one integrated platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none card-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full sky-gradient flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Appointment Scheduling</h3>
                  <p className="text-gray-600">
                    Automated booking system with customizable time slots and real-time availability updates
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none card-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full sky-gradient flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Patient Management</h3>
                  <p className="text-gray-600">
                    Comprehensive patient profiles, medical history tracking, and personalized care plans
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none card-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full sky-gradient flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Electronic Health Records</h3>
                  <p className="text-gray-600">
                    Secure digital records with easy documentation and compliance with healthcare regulations
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none card-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full sky-gradient flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                  <p className="text-gray-600">
                    Data-driven insights to track performance, optimize operations, and improve patient outcomes
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none card-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full sky-gradient flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Billing & Payments</h3>
                  <p className="text-gray-600">
                    Streamlined invoicing, insurance processing, and secure online payment options
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none card-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full sky-gradient flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Compliance & Security</h3>
                  <p className="text-gray-600">
                    HIPAA-compliant platform with enterprise-grade security to protect sensitive patient data
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Registration/Login Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-md"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                <h2 className="text-2xl font-bold mb-4">Join Our Clinic Management Platform</h2>
                <p className="text-gray-600 mb-6">
                  Transform your healthcare practice with our comprehensive clinic management solution designed for modern healthcare providers.
                </p>
                
                <ul className="space-y-3">
                  {[
                    "Streamline administrative tasks and reduce overhead",
                    "Enhance patient experience with online booking and reminders",
                    "Access critical data anytime, anywhere with cloud-based solution",
                    "Scale your practice with flexible subscription options"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="lg:w-1/2 lg:pl-8 border-t lg:border-t-0 lg:border-l border-gray-200 pt-8 lg:pt-0 lg:pl-12">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Access Portal</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Clinic Subdomain
                        </label>
                        <div className="flex">
                          <Input placeholder="your-clinic" className="rounded-r-none" />
                          <div className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center text-gray-500">
                            .clinichub.com
                          </div>
                        </div>
                      </div>
                      <Button className="w-full sky-button">
                        Access Portal <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Clinic Name
                        </label>
                        <Input placeholder="Enter clinic name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input type="email" placeholder="email@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Choose Subdomain
                        </label>
                        <div className="flex">
                          <Input placeholder="your-clinic" className="rounded-r-none" />
                          <div className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center text-gray-500">
                            .clinichub.com
                          </div>
                        </div>
                      </div>
                      <Button className="w-full sky-button">
                        Get Started Free
                      </Button>
                      <p className="text-xs text-center text-gray-500">
                        By signing up, you agree to our Terms of Service and Privacy Policy
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Testimonials */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted by Healthcare Professionals</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See what our customers say about their experience with our platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "The scheduling system has reduced our no-show rate by 30%. Patients love the reminders and our staff loves the automation.",
                  name: "Dr. Sarah Jensen",
                  role: "Family Practice, Medical Director"
                },
                {
                  quote: "Implementation was smooth and the support team was there every step of the way. Now we spend less time on paperwork and more time with patients.",
                  name: "James Wilson",
                  role: "Practice Manager, City Health Clinic"
                },
                {
                  quote: "The analytics dashboard gives us insights we never had before. We've been able to optimize staffing and increase revenue by 22%.",
                  name: "Dr. Michael Chen",
                  role: "Cardiologist, Heart Care Center"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-none card-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-primary">★</span>
                      ))}
                    </div>
                    <p className="italic mb-4 text-gray-600">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center py-12 px-4 bg-gradient-to-r from-primary/10 to-primary/20 rounded-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Practice?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Join thousands of healthcare providers who are streamlining their operations with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="sky-button" asChild>
              <Link to="/clinic-registration">
                Start Free Trial
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required. 14-day free trial.</p>
        </motion.section>
      </div>
    </AppLayout>
  );
};

export default ClinicManagementLanding;
