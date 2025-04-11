
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AppointmentProcess } from "@/components/admin/appointments/AppointmentProcess";
import PageHeader from "@/admin/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { AllAppointment } from "@/admin/types/allappointment";
import { Patient } from "@/admin/types/patient";
import { getAppointmentById, updateAppointmentStatus } from "../services/appointmentService";
import AdminLayout from "@/admin/components/AdminLayout";
import { getMockPatientById } from "../services/patientMockService";

const ProcessAppointment = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<AllAppointment | null>(null);
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);

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

  const getPageContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading appointment details...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
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
      );
    }

    if (!appointment) {
      return (
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
      <>
        <div className="mb-4 flex items-center">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/appointments")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Appointments</span>
          </Button>
        </div>
        
        <AppointmentProcess
          appointment={appointment}
          onClose={handleClose}
          onStatusUpdate={handleStatusUpdate}
        />
      </>
    );
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <PageHeader 
          title="Process Appointment" 
          onRefreshClick={() => window.location.reload()}
        />
        
        {getPageContent()}
      </div>
    </AdminLayout>
  );
};

export default ProcessAppointment;
