
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PatientType } from "@/admin/types/patient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon, Upload } from "lucide-react";
import { generatePatientId } from "@/admin/utils/patientUtils";

const patientSchema = z.object({
  id: z.string().optional(),
  patientId: z.string().optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  contactNumber: z.string().min(5, "Contact number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  lastVisit: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactRelationship: z.string().min(2, "Relationship is required"),
  emergencyContactPhone: z.string().min(5, "Emergency contact phone is required"),
  photoUrl: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface PatientFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (patient: PatientType) => void;
  patient?: PatientType;
  title: string;
}

const PatientForm = ({ open, onClose, onSave, patient, title }: PatientFormProps) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(patient?.photoUrl || null);
  
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: patient ? {
      id: patient.id,
      patientId: patient.patientId,
      firstName: patient.firstName || "",
      lastName: patient.lastName || "",
      dateOfBirth: patient.dateOfBirth || "",
      gender: patient.gender || "Male",
      contactNumber: patient.contactNumber || "",
      email: patient.email || "",
      address: patient.address || "",
      lastVisit: patient.lastVisit || "",
      insuranceProvider: patient.insuranceProvider || "",
      insurancePolicyNumber: patient.insurancePolicyNumber || "",
      emergencyContactName: patient.emergencyContact?.name || "",
      emergencyContactRelationship: patient.emergencyContact?.relationship || "",
      emergencyContactPhone: patient.emergencyContact?.phone || "",
      photoUrl: patient.photoUrl || "",
    } : {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "Male",
      contactNumber: "",
      email: "",
      address: "",
      lastVisit: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactPhone: "",
      photoUrl: "",
    }
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        form.setValue("photoUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: PatientFormValues) => {
    const patientData: PatientType = {
      id: values.id || crypto.randomUUID(),
      patientId: values.patientId || generatePatientId(),
      firstName: values.firstName,
      lastName: values.lastName,
      fullName: `${values.firstName} ${values.lastName}`,
      dateOfBirth: values.dateOfBirth,
      age: calculateAge(values.dateOfBirth),
      gender: values.gender,
      contactNumber: values.contactNumber,
      email: values.email,
      address: values.address,
      lastVisit: values.lastVisit || new Date().toISOString(),
      insuranceProvider: values.insuranceProvider,
      insurancePolicyNumber: values.insurancePolicyNumber,
      emergencyContact: {
        name: values.emergencyContactName,
        relationship: values.emergencyContactRelationship,
        phone: values.emergencyContactPhone,
      },
      photoUrl: values.photoUrl,
      createdAt: patient?.createdAt || new Date().toISOString(),
    };
    
    onSave(patientData);
    onClose();
  };

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] bg-white/90 backdrop-blur-sm border border-sky-100">
        <DialogHeader>
          <DialogTitle className="text-sky-800">{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <div className="flex items-start gap-6">
              <div className="w-1/4 flex flex-col items-center">
                <div className="mb-2 relative w-32 h-32 rounded-full bg-gray-100 border-2 border-sky-200 overflow-hidden flex items-center justify-center">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Patient" className="w-full h-full object-cover" />
                  ) : (
                    <CameraIcon className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="flex items-center text-sm text-sky-600 gap-1 mt-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Photo</span>
                  </div>
                  <input 
                    id="photo-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
              
              <div className="w-3/4 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="patient@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="123 Main St, City, State 12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-sky-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-sky-800 mb-3">Insurance Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="insuranceProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Provider</FormLabel>
                      <FormControl>
                        <Input placeholder="Insurance provider" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="insurancePolicyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Policy Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Policy number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-sky-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-sky-800 mb-3">Emergency Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="emergencyContactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContactRelationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="Spouse, Parent, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 987-6543" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-sky-600 hover:bg-sky-700">
                Save Patient
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientForm;
