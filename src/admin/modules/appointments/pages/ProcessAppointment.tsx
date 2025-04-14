
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminLayout from "@/admin/components/AdminLayout";
import PageHeader from "@/admin/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AllAppointment } from "@/admin/types/allappointment";
import { Patient } from "@/admin/types/patient";
import { getAppointmentById, updateAppointmentStatus } from "../services/appointmentService";
import { getMockPatientById } from "../services/patientMockService";

// Define the schema for form validation
const consultationSchema = z.object({
  vitals: z.object({
    temperature: z.string().optional(),
    pulse: z.string().optional(),
    respiratoryRate: z.string().optional(),
    spo2: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    bmi: z.string().optional(),
  }),
  consultation: z.object({
    symptoms: z.string().min(3, "Symptoms are required"),
    diagnosis: z.string().min(3, "Diagnosis is required"),
    followUpDate: z.string().optional(),
  }),
  medications: z.array(
    z.object({
      name: z.string().min(1, "Medication name is required"),
      dosage: z.string().min(1, "Dosage is required"),
      frequency: z.string().min(1, "Frequency is required"),
      duration: z.string().min(1, "Duration is required"),
    })
  ).optional(),
  notes: z.string().optional(),
  advice: z.string().optional(),
  followUp: z.string().optional(),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

const ProcessAppointment = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<AllAppointment | null>(null);
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    vitals: true,
    consultation: true,
    medications: true,
    notes: true,
    advice: true,
    followUp: true,
  });
  const [medicationList, setMedicationList] = useState<Array<{ name: string; dosage: string; frequency: string; duration: string }>>([
    { name: "", dosage: "", frequency: "", duration: "" }
  ]);

  // Form setup
  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      vitals: {
        temperature: "",
        pulse: "",
        respiratoryRate: "",
        spo2: "",
        height: "",
        weight: "",
        bmi: "",
      },
      consultation: {
        symptoms: "",
        diagnosis: "",
        followUpDate: "",
      },
      medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
      notes: "",
      advice: "",
      followUp: "",
    },
  });

  // Fetch appointment data
  const { data, isLoading, error } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointmentById(appointmentId || "0"),
    enabled: !!appointmentId
  });

  useEffect(() => {
    if (data) {
      setAppointment(data.data);
      
      // Once we have the appointment, fetch detailed patient information
      if (data.data?.patient?.id) {
        const patientData = getMockPatientById(data.data.patient.id);
        setPatientDetails(patientData);
      }
    }
  }, [data]);

  // Calculate BMI when height or weight changes
  const calculateBMI = () => {
    const height = parseFloat(form.getValues("vitals.height") || "0");
    const weight = parseFloat(form.getValues("vitals.weight") || "0");
    
    if (height > 0 && weight > 0) {
      // Height in meters (convert from cm)
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      form.setValue("vitals.bmi", bmi);
    }
  };

  // Add medication field
  const addMedication = () => {
    setMedicationList([...medicationList, { name: "", dosage: "", frequency: "", duration: "" }]);
  };

  // Remove medication field
  const removeMedication = (index: number) => {
    const updatedList = [...medicationList];
    updatedList.splice(index, 1);
    setMedicationList(updatedList);
  };

  // Update medication field
  const updateMedication = (index: number, field: string, value: string) => {
    const updatedList = [...medicationList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setMedicationList(updatedList);
    
    // Update form value
    const medications = form.getValues("medications") || [];
    medications[index] = { ...medications[index], [field]: value };
    form.setValue("medications", medications);
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section as keyof typeof expandedSections],
    });
  };

  // Handle form submission
  const onSubmit = (data: ConsultationFormValues) => {
    console.log("Form submitted with:", data);
    
    // In a real app, this would save to the backend
    toast.success("Consultation completed successfully");
    
    // Update appointment status
    handleStatusUpdate(appointment?.id || 0, "COMPLETED");
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await updateAppointmentStatus(id, status);
      toast.success(`Appointment status updated to ${status}`);
      navigate("/admin/appointments");
    } catch (error) {
      toast.error("Failed to update appointment status");
      console.error("Error updating appointment status:", error);
    }
  };

  const handleClose = () => {
    navigate("/admin/appointments");
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <PageHeader 
            title="Process Appointment" 
            onRefreshClick={() => window.location.reload()}
          />
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading appointment details...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <PageHeader 
            title="Process Appointment" 
            onRefreshClick={() => window.location.reload()}
          />
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-red-800">Error Loading Appointment</h3>
            <p className="text-red-600 mt-2">
              There was a problem loading this appointment. Please try again later.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/appointments")}
              className="mt-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Appointments
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!appointment) {
    return (
      <AdminLayout>
        <div className="p-6">
          <PageHeader 
            title="Process Appointment" 
            onRefreshClick={() => window.location.reload()}
          />
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-yellow-800">Appointment Not Found</h3>
            <p className="text-yellow-600 mt-2">
              The appointment you're looking for could not be found.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/appointments")}
              className="mt-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Appointments
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // If we have the appointment and patient details, merge them
  if (patientDetails && appointment.patient) {
    appointment.patient = {
      ...appointment.patient,
      ...patientDetails
    };
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader 
          title="Process Appointment" 
          onRefreshClick={() => window.location.reload()}
          onViewModeToggle={() => {}}
          showAddButton={false}
        />
        
        <div className="mb-4 flex items-center">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/appointments")}
            className="flex items-center gap-1 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Appointments</span>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Patient Info Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b">
            <div>
              <h2 className="text-2xl font-bold">
                {appointment.patient.firstname} {appointment.patient.lastname}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <span>Patient ID: {appointment.patient.id}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{appointment.slot?.date ? new Date(appointment.slot.date).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{appointment.slot?.startTime || 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm" onClick={handleClose} className="rounded-full">
                Close
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleStatusUpdate(appointment.id, "CANCELLED")} className="rounded-full">
                Cancel Appointment
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Vitals Section */}
              <Card className="shadow-sm">
                <CardContent className="p-0">
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleSection('vitals')}
                  >
                    <h3 className="text-lg font-medium">Patient Vitals</h3>
                    {expandedSections.vitals ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  
                  {expandedSections.vitals && (
                    <div className="p-4 pt-0 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="vitals.temperature"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Temperature (°C)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="36.5" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="vitals.pulse"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pulse (bpm)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="75" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="vitals.respiratoryRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Respiratory Rate (bpm)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="16" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="vitals.spo2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SpO2 (%)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="98" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="vitals.height"
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
                          name="vitals.weight"
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
                          name="vitals.bmi"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>BMI</FormLabel>
                              <FormControl>
                                <Input 
                                  readOnly 
                                  placeholder="Calculated" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Consultation Section */}
              <Card className="shadow-sm">
                <CardContent className="p-0">
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleSection('consultation')}
                  >
                    <h3 className="text-lg font-medium">Consultation Details</h3>
                    {expandedSections.consultation ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  
                  {expandedSections.consultation && (
                    <div className="p-4 pt-0 border-t">
                      <div className="space-y-4 mt-4">
                        <FormField
                          control={form.control}
                          name="consultation.symptoms"
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
                          name="consultation.diagnosis"
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
                          name="consultation.followUpDate"
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
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Medications Section */}
              <Card className="shadow-sm">
                <CardContent className="p-0">
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleSection('medications')}
                  >
                    <h3 className="text-lg font-medium">Prescribed Medications</h3>
                    {expandedSections.medications ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  
                  {expandedSections.medications && (
                    <div className="p-4 pt-0 border-t">
                      <div className="mt-4">
                        {medicationList.map((medication, index) => (
                          <div key={index} className="p-4 border rounded-md relative mb-4">
                            <button
                              type="button"
                              onClick={() => removeMedication(index)}
                              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                            >
                              ✕
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                              <div>
                                <Label htmlFor={`med-name-${index}`}>Medication Name</Label>
                                <Input
                                  id={`med-name-${index}`}
                                  value={medication.name}
                                  onChange={(e) => updateMedication(index, "name", e.target.value)}
                                  placeholder="Medication name"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`med-dosage-${index}`}>Dosage</Label>
                                <Input
                                  id={`med-dosage-${index}`}
                                  value={medication.dosage}
                                  onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                                  placeholder="e.g., 500mg"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`med-freq-${index}`}>Frequency</Label>
                                <Select
                                  onValueChange={(value) => updateMedication(index, "frequency", value)}
                                  defaultValue={medication.frequency}
                                >
                                  <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select frequency" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Once daily">Once daily</SelectItem>
                                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                                    <SelectItem value="Three times daily">Three times daily</SelectItem>
                                    <SelectItem value="Four times daily">Four times daily</SelectItem>
                                    <SelectItem value="As needed">As needed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor={`med-duration-${index}`}>Duration</Label>
                                <Select
                                  onValueChange={(value) => updateMedication(index, "duration", value)}
                                  defaultValue={medication.duration}
                                >
                                  <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="3 days">3 days</SelectItem>
                                    <SelectItem value="5 days">5 days</SelectItem>
                                    <SelectItem value="7 days">7 days</SelectItem>
                                    <SelectItem value="10 days">10 days</SelectItem>
                                    <SelectItem value="14 days">14 days</SelectItem>
                                    <SelectItem value="1 month">1 month</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={addMedication}
                          className="w-full mt-2 rounded-full"
                        >
                          + Add Medication
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Notes Section */}
              <Card className="shadow-sm">
                <CardContent className="p-0">
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleSection('notes')}
                  >
                    <h3 className="text-lg font-medium">Additional Notes</h3>
                    {expandedSections.notes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  
                  {expandedSections.notes && (
                    <div className="p-4 pt-0 border-t">
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormControl>
                              <Textarea
                                placeholder="Enter any additional notes, instructions or observations"
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Advice Section */}
              <Card className="shadow-sm">
                <CardContent className="p-0">
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleSection('advice')}
                  >
                    <h3 className="text-lg font-medium">Advice</h3>
                    {expandedSections.advice ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  
                  {expandedSections.advice && (
                    <div className="p-4 pt-0 border-t">
                      <FormField
                        control={form.control}
                        name="advice"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormControl>
                              <Textarea
                                placeholder="Enter your advice here..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Follow Up Section */}
              <Card className="shadow-sm">
                <CardContent className="p-0">
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleSection('followUp')}
                  >
                    <h3 className="text-lg font-medium">Follow Up</h3>
                    {expandedSections.followUp ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  
                  {expandedSections.followUp && (
                    <div className="p-4 pt-0 border-t">
                      <FormField
                        control={form.control}
                        name="followUp"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormControl>
                              <Textarea
                                placeholder="Enter follow up details here..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Submit buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <Button type="button" variant="outline" onClick={handleClose} className="rounded-full">
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save & Complete Appointment
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessAppointment;
