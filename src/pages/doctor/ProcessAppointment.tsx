
import React, { useState } from "react";
import { DoctorLayout } from "@/components/DoctorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Clock, Save } from "lucide-react";

const ProcessAppointment = () => {
  const [timeLeft, setTimeLeft] = useState("08m:00s");
  const { toast } = useToast();
  const form = useForm();
  
  const handleSave = () => {
    toast({
      title: "Section saved",
      description: "Your changes have been saved successfully."
    });
  };

  const handleSubmit = () => {
    toast({
      title: "Appointment Completed",
      description: "The appointment has been processed successfully."
    });
  };

  return (
    <DoctorLayout>
      <div className="container py-6">
        {/* Patient header section */}
        <Card className="mb-6 border-l-4 border-l-blue-500 sticky top-0 z-20 shadow-md">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Doctor/Patient Information */}
              <div className="flex items-center gap-4 p-4 flex-grow">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-blue-100">
                  <img 
                    src="public/lovable-uploads/ddaa4eb5-e08d-4b90-b05a-b76c050231c6.png" 
                    alt="Patient"
                    className="object-cover h-full w-full"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/200/eaf7fc/33C3F0?text=KJ&font=montserrat`;
                    }}
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <span className="text-xs font-medium text-blue-500">#app0001</span>
                    <h2 className="text-lg font-semibold">Kelly Joseph</h2>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">28 Years • Female • O+ve</div>
                  <div className="text-xs text-gray-600 mb-1">Kelly@Example.Com</div>
                  <div className="text-xs text-gray-600">+1 504 368 6874</div>
                </div>
              </div>
              
              {/* Appointment Details */}
              <div className="grid grid-cols-2 md:grid-cols-2 border-t md:border-t-0 md:border-l border-gray-200">
                <div className="p-4 border-r border-b md:border-b-0">
                  <div className="text-xs text-gray-500">Appointment Date & Time</div>
                  <div className="font-medium">22 Jul 2023 - 12:00 pm</div>
                </div>
                <div className="p-4 border-b md:border-b-0">
                  <div className="text-xs text-gray-500">Clinic</div>
                  <div className="font-medium">Adrian's Dentistry</div>
                </div>
              </div>
              
              {/* Status */}
              <div className="p-4 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col items-center justify-center min-w-36">
                <div className="mb-2">
                  <div className="font-medium text-center">Consultation Fees: <span className="text-primary">$200</span></div>
                </div>
                <div className="px-4 py-1 bg-amber-100 text-amber-600 rounded-full text-sm font-medium">
                  Upcoming
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Session timer */}
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-6 sticky top-[105px] z-10 shadow-sm">
          <div className="font-medium">Session Ends in</div>
          <div className="flex items-center gap-2 font-bold text-lg">
            <Clock className="h-5 w-5 text-primary" />
            {timeLeft}
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-6 sticky top-[165px] bg-white py-2 z-10">Create Appointment Details</h2>
        
        {/* Patient information */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-500 mb-2">Address</div>
                <div>Newyork, United States</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">No of Visit</div>
                <div>0</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Vitals */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Vitals</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Temperature</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Eg : 97.8" className="h-9" />
                  <span className="text-sm">F</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Pulse</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Eg : 97.8" className="h-9" />
                  <span className="text-sm">mmHg</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Respiratory Rate</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Eg : 97.8" className="h-9" />
                  <span className="text-sm">rpm</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">SPO2</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Eg : 98" className="h-9" />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Height</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Eg : 97.8" className="h-9" />
                  <span className="text-sm">cm</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Weight</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Eg : 97.8" className="h-9" />
                  <span className="text-sm">Kg</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Waist</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Eg : 97.8" className="h-9" />
                  <span className="text-sm">cm</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">BSA</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Eg : 54" className="h-9" />
                  <span className="text-sm">M</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">BMI</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Eg : 45.4" className="h-9" />
                  <span className="text-sm">kg/cm</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Previous Medical History */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Previous Medical History</h3>
            <div className="min-h-24">
              <textarea
                className="w-full min-h-24 border border-input bg-background px-3 py-2 rounded-md"
                placeholder="Enter previous medical history details here..."
              ></textarea>
            </div>
          </CardContent>
        </Card>
        
        {/* Clinical Notes */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Clinical Notes</h3>
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
            <div className="min-h-24">
              <textarea
                className="w-full min-h-24 border border-input bg-background px-3 py-2 rounded-md"
                placeholder="Enter clinical notes here..."
              ></textarea>
            </div>
          </CardContent>
        </Card>
        
        {/* Laboratory Tests */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Laboratory Tests</h3>
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
            <div className="min-h-24">
              <textarea
                className="w-full min-h-24 border border-input bg-background px-3 py-2 rounded-md"
                placeholder="Enter laboratory test details here..."
              ></textarea>
            </div>
          </CardContent>
        </Card>
        
        {/* Complaints */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Complaints</h3>
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
            <div className="min-h-24">
              <textarea
                className="w-full min-h-24 border border-input bg-background px-3 py-2 rounded-md"
                placeholder="Enter patient complaints here..."
              ></textarea>
            </div>
          </CardContent>
        </Card>
        
        {/* Diagnosis */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Diagnosis</h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-center">
                <div className="w-32">Fever</div>
                <Input placeholder="Diagnosis" className="flex-grow" />
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-32">Headache</div>
                <Input placeholder="Diagnosis" className="flex-grow" />
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-32">Stomach Pain</div>
                <Input placeholder="Diagnosis" className="flex-grow" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Medications */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Medications</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium text-sm">Name</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Type</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Dosage</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Duration</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Instruction</th>
                    <th className="text-left py-2 px-4 font-medium text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">
                      <Input placeholder="Name" className="h-9 w-full" />
                    </td>
                    <td className="py-2 px-4">
                      <Select>
                        <SelectTrigger className="h-9 w-28">
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tablet">Tablet</SelectItem>
                          <SelectItem value="syrup">Syrup</SelectItem>
                          <SelectItem value="capsule">Capsule</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-2 px-4">
                      <Input placeholder="1-0-0" className="h-9 w-24" />
                    </td>
                    <td className="py-2 px-4">
                      <Select>
                        <SelectTrigger className="h-9 w-28">
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="10">10 days</SelectItem>
                          <SelectItem value="15">15 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-2 px-4">
                      <Input placeholder="Instructions" className="h-9 w-full" />
                    </td>
                    <td className="py-2 px-4">
                      <Button variant="destructive" size="icon" className="h-9 w-9">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                        </svg>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <Button variant="link" className="text-primary">
                  Add New
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Advice */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Advice</h3>
            <div className="min-h-24">
              <textarea
                className="w-full min-h-24 border border-input bg-background px-3 py-2 rounded-md"
                placeholder="Enter your advice here..."
              ></textarea>
            </div>
          </CardContent>
        </Card>
        
        {/* Follow Up */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Follow Up</h3>
            <div className="min-h-24">
              <textarea
                className="w-full min-h-24 border border-input bg-background px-3 py-2 rounded-md"
                placeholder="Enter follow up details here..."
              ></textarea>
            </div>
          </CardContent>
        </Card>
        
        {/* Submit buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={handleSubmit}>
            Save & End Appointment
          </Button>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default ProcessAppointment;
