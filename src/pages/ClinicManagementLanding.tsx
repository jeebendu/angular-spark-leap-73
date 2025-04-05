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
import { Label } from "@/components/ui/label";

const ClinicManagementLanding = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section with Login/Registration Form */}
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
            <div className="hidden sm:flex flex-col sm:flex-row gap-4">
              <Button className="sky-button">
                Schedule Demo
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 rounded-lg shadow-lg overflow-hidden">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Access Portal</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="p-6 bg-white">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <Input type="password" placeholder="Enter your password" />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                      Remember me
                    </label>
                    <a href="#" className="text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Button className="w-full sky-button">
                    Access Portal <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="register" className="p-6 bg-white">
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
        </motion.div>
        
        {/* Banner Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <div className="rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1470"
              alt="Healthcare professionals" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Healthcare Practice</h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                  Join thousands of clinics using our platform to deliver better patient care
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white bg-primary/30 hover:bg-white/20">
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Banner Before Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border border-blue-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Experience Healthcare Management Reimagined</h3>
                <p className="text-gray-600 max-w-xl">
                  Our intuitive platform streamlines administrative tasks, enhances patient communication,
                  and optimizes your practice workflow with AI-powered insights.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm font-medium">HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm font-medium">24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm font-medium">99.9% Uptime</span>
                  </div>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=600" 
                alt="Digital healthcare" 
                className="rounded-lg shadow-lg w-full md:w-80 h-60 object-cover"
              />
            </div>
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
            <Button size="lg" className="sky-button">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="bg-white/80 hover:bg-white">
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
