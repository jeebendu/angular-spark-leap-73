
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Calendar, ClipboardCheck, Clock, FileText, Pill, Plus, Stethoscope, XCircle } from "lucide-react";
import { AllAppointment, StatusUpdate } from "@/admin/types/allappointment";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AppointmentProcessProps {
  appointment: AllAppointment;
  onClose: () => void;
  onStatusUpdate: (id: number, status: string) => void;
}

// Define consultation form schema
const consultationSchema = z.object({
  diagnosis: z.string().min(1, "Diagnosis is required"),
  symptoms: z.string().min(1, "Symptoms are required"),
  notes: z.string().optional(),
  followUpDate: z.string().optional(),
  vitalSigns: z.object({
    temperature: z.string().optional(),
    pulse: z.string().optional(),
    respiratoryRate: z.string().optional(),
    spo2: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    bmi: z.string().optional(),
  }),
  medications: z.array(
    z.object({
      name: z.string(),
      dosage: z.string(),
      frequency: z.string(),
      duration: z.string(),
    })
  ).optional(),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

export const AppointmentProcess = ({ appointment, onClose, onStatusUpdate }: AppointmentProcessProps) => {
  const [activeTab, setActiveTab] = useState("vitals");
  const [isCompleteDrawerOpen, setIsCompleteDrawerOpen] = useState(false);
  const [medicationList, setMedicationList] = useState<Array<{ name: string; dosage: string; frequency: string; duration: string }>>([]);

  // Initialize the form with default values
  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      diagnosis: "",
      symptoms: "",
      notes: "",
      followUpDate: "",
      vitalSigns: {
        temperature: "",
        pulse: "",
        respiratoryRate: "",
        spo2: "",
        height: "",
        weight: "",
        bmi: "",
      },
      medications: [],
    },
  });

  const onSubmit = (data: ConsultationFormValues) => {
    // Add medications to the form data
    data.medications = medicationList;
    
    // Here you would normally save the consultation data
    console.log("Consultation data:", data);
    
    // Show success toast
    toast.success("Consultation data saved successfully");
    
    // Close the drawer
    setIsCompleteDrawerOpen(false);
    
    // Update appointment status
    onStatusUpdate(appointment.id, "COMPLETED");
    
    // Close the appointment process
    onClose();
  };

  const addMedication = () => {
    setMedicationList([
      ...medicationList,
      { name: "", dosage: "", frequency: "", duration: "" },
    ]);
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const updatedList = [...medicationList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setMedicationList(updatedList);
  };

  const removeMedication = (index: number) => {
    const updatedList = [...medicationList];
    updatedList.splice(index, 1);
    setMedicationList(updatedList);
  };

  const calculateBMI = () => {
    const height = parseFloat(form.getValues("vitalSigns.height"));
    const weight = parseFloat(form.getValues("vitalSigns.weight"));
    
    if (height && weight) {
      // Height in meters (convert from cm)
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      form.setValue("vitalSigns.bmi", bmi);
    }
  };

  const handleCompleteAppointment = () => {
    setIsCompleteDrawerOpen(true);
  };

  const cancelAppointment = () => {
    // Confirmation before cancelling
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      onStatusUpdate(appointment.id, "CANCELLED");
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      {/* Patient Info Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold">
            {appointment.patient.firstname} {appointment.patient.lastname}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{appointment.slot?.date ? new Date(appointment.slot.date).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{appointment.slot?.startTime || 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="destructive" size="sm" onClick={cancelAppointment}>
            Cancel Appointment
          </Button>
          <Button variant="default" size="sm" onClick={handleCompleteAppointment}>
            Complete Consultation
          </Button>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="vitals" className="flex items-center gap-1">
            <Stethoscope className="h-4 w-4" />
            <span>Vitals</span>
          </TabsTrigger>
          <TabsTrigger value="consultation" className="flex items-center gap-1">
            <ClipboardCheck className="h-4 w-4" />
            <span>Consultation</span>
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-1">
            <Pill className="h-4 w-4" />
            <span>Medications</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Notes</span>
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form>
            {/* Vitals Tab */}
            <TabsContent value="vitals">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Vitals</CardTitle>
                  <CardDescription>Record the patient's vital signs</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="vitalSigns.temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature (°C)</FormLabel>
                        <FormControl>
                          <Input placeholder="36.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vitalSigns.pulse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pulse (bpm)</FormLabel>
                        <FormControl>
                          <Input placeholder="75" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vitalSigns.respiratoryRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Respiratory Rate (bpm)</FormLabel>
                        <FormControl>
                          <Input placeholder="16" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vitalSigns.spo2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SpO2 (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="98" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vitalSigns.height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="170" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              setTimeout(calculateBMI, 100);
                            }} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vitalSigns.weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="70" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              setTimeout(calculateBMI, 100);
                            }} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vitalSigns.bmi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BMI</FormLabel>
                        <FormControl>
                          <Input readOnly placeholder="Calculated" {...field} />
                        </FormControl>
                        <FormDescription>Calculated automatically</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Consultation Tab */}
            <TabsContent value="consultation">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation Details</CardTitle>
                  <CardDescription>Record symptoms and diagnosis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symptoms</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Patient's reported symptoms"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your diagnosis"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="followUpDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follow-up Date (if needed)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Medications Tab */}
            <TabsContent value="medications">
              <Card>
                <CardHeader>
                  <CardTitle>Prescribed Medications</CardTitle>
                  <CardDescription className="flex justify-between items-center">
                    <span>Add medications prescribed to the patient</span>
                    <Button 
                      type="button" 
                      onClick={addMedication} 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Medication</span>
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {medicationList.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No medications added yet. Click "Add Medication" to prescribe.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {medicationList.map((medication, index) => (
                        <div 
                          key={index} 
                          className="p-4 border rounded-md relative"
                        >
                          <button
                            type="button"
                            onClick={() => removeMedication(index)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                              <FormLabel htmlFor={`med-name-${index}`}>Medication Name</FormLabel>
                              <Input
                                id={`med-name-${index}`}
                                value={medication.name}
                                onChange={(e) => updateMedication(index, "name", e.target.value)}
                                placeholder="Medication name"
                              />
                            </div>
                            <div>
                              <FormLabel htmlFor={`med-dosage-${index}`}>Dosage</FormLabel>
                              <Input
                                id={`med-dosage-${index}`}
                                value={medication.dosage}
                                onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                                placeholder="e.g., 500mg"
                              />
                            </div>
                            <div>
                              <FormLabel htmlFor={`med-freq-${index}`}>Frequency</FormLabel>
                              <Input
                                id={`med-freq-${index}`}
                                value={medication.frequency}
                                onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                                placeholder="e.g., Twice daily"
                              />
                            </div>
                            <div>
                              <FormLabel htmlFor={`med-duration-${index}`}>Duration</FormLabel>
                              <Input
                                id={`med-duration-${index}`}
                                value={medication.duration}
                                onChange={(e) => updateMedication(index, "duration", e.target.value)}
                                placeholder="e.g., 7 days"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                  <CardDescription>Any other relevant information or instructions</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Enter any additional notes, instructions or observations"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>

      {/* Complete Appointment Drawer */}
      <Drawer open={isCompleteDrawerOpen} onOpenChange={setIsCompleteDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle>Complete Consultation</DrawerTitle>
              <DrawerDescription>
                Review and confirm the consultation details before completing
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-8">
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Patient</h4>
                        <p className="text-gray-700">{appointment.patient.firstname} {appointment.patient.lastname}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Diagnosis</h4>
                        <p className="text-gray-700">{form.getValues("diagnosis") || "No diagnosis provided"}</p>
                      </div>
                      
                      {form.getValues("followUpDate") && (
                        <div>
                          <h4 className="font-medium mb-1">Follow-up Date</h4>
                          <p className="text-gray-700">{form.getValues("followUpDate")}</p>
                        </div>
                      )}
                      
                      {medicationList.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-1">Medications ({medicationList.length})</h4>
                          <ul className="list-disc pl-5 text-gray-700">
                            {medicationList.map((med, i) => (
                              <li key={i}>
                                {med.name} {med.dosage}, {med.frequency}, for {med.duration}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCompleteDrawerOpen(false)}>
                    Back to Editing
                  </Button>
                  <Button type="button" onClick={() => form.handleSubmit(onSubmit)()}>
                    Complete Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
