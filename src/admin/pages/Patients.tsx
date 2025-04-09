
import React, { useState, useEffect } from "react";
import AdminLayout from "@/admin/components/AdminLayout";
import PatientTable from "@/admin/components/PatientTable";
import PatientCardView from "@/admin/components/PatientCardView";
import PatientForm from "@/admin/components/PatientForm";
import { PatientType } from "@/admin/types/patient";
import { Button } from "@/components/ui/button";
import { Grid, List, Filter, UserPlus, Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import PatientViewToggle from "@/admin/components/PatientViewToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Patients = () => {
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [sortColumn, setSortColumn] = useState("fullName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const isMobile = useIsMobile();
  const [viewType, setViewType] = useState<"card" | "list">(isMobile ? "card" : "list");
  const [searchTerm, setSearchTerm] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientType | undefined>(undefined);
  const [patientToDeleteId, setPatientToDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set default view type based on screen size
    setViewType(isMobile ? "card" : "list");
  }, [isMobile]);

  useEffect(() => {
    // Simulate fetching data
    const demoData: PatientType[] = [
      {
        id: "1",
        firstName: "John",
        lastName: "Smith",
        fullName: "John Smith",
        dateOfBirth: "1985-04-12",
        gender: "Male",
        contactNumber: "(555) 123-4567",
        email: "john.smith@example.com",
        address: "123 Main St, Anytown, CA 12345",
        lastVisit: "2025-03-28T10:15:00",
        insuranceProvider: "Blue Cross",
        createdAt: "2024-01-01T00:00:00",
      },
      {
        id: "2",
        firstName: "Emma",
        lastName: "Johnson",
        fullName: "Emma Johnson",
        dateOfBirth: "1990-07-23",
        gender: "Female",
        contactNumber: "(555) 987-6543",
        email: "emma.johnson@example.com",
        address: "456 Oak Ave, Somewhere, CA 67890",
        lastVisit: "2025-04-01T14:30:00",
        insuranceProvider: "Kaiser Permanente",
        createdAt: "2024-01-02T00:00:00",
      },
      {
        id: "3",
        firstName: "Michael",
        lastName: "Williams",
        fullName: "Michael Williams",
        dateOfBirth: "1978-11-05",
        gender: "Male",
        contactNumber: "(555) 345-6789",
        email: "michael.williams@example.com",
        address: "789 Pine Rd, Nowhere, CA 54321",
        lastVisit: "2025-03-15T09:20:00",
        insuranceProvider: "Aetna",
        createdAt: "2024-01-03T00:00:00",
      },
      {
        id: "4",
        firstName: "Sophia",
        lastName: "Brown",
        fullName: "Sophia Brown",
        dateOfBirth: "1995-02-18",
        gender: "Female",
        contactNumber: "(555) 456-7890",
        email: "sophia.brown@example.com",
        address: "101 Elm St, Everywhere, CA 13579",
        lastVisit: "2025-04-05T16:45:00",
        insuranceProvider: "Cigna",
        createdAt: "2024-01-04T00:00:00",
      },
      {
        id: "5",
        firstName: "James",
        lastName: "Jones",
        fullName: "James Jones",
        dateOfBirth: "1982-09-30",
        gender: "Male",
        contactNumber: "(555) 567-8901",
        email: "james.jones@example.com",
        address: "202 Maple Dr, Someplace, CA 24680",
        lastVisit: "2025-04-06T11:30:00",
        insuranceProvider: "UnitedHealthcare",
        createdAt: "2024-01-05T00:00:00",
      },
      {
        id: "6",
        firstName: "Olivia",
        lastName: "Garcia",
        fullName: "Olivia Garcia",
        dateOfBirth: "1988-05-14",
        gender: "Female",
        contactNumber: "(555) 678-9012",
        email: "olivia.garcia@example.com",
        address: "303 Cedar Ln, Anywhere, CA 97531",
        lastVisit: "2025-03-22T13:15:00",
        insuranceProvider: "Humana",
        createdAt: "2024-01-06T00:00:00",
      },
      {
        id: "7",
        firstName: "William",
        lastName: "Martinez",
        fullName: "William Martinez",
        dateOfBirth: "1973-12-09",
        gender: "Male",
        contactNumber: "(555) 789-0123",
        email: "william.martinez@example.com",
        address: "404 Birch Blvd, Nowhere, CA 86420",
        lastVisit: "2025-02-18T10:00:00",
        insuranceProvider: "Medicare",
        createdAt: "2024-01-07T00:00:00",
      },
      {
        id: "8",
        firstName: "Ava",
        lastName: "Rodriguez",
        fullName: "Ava Rodriguez",
        dateOfBirth: "1992-08-25",
        gender: "Female",
        contactNumber: "(555) 890-1234",
        email: "ava.rodriguez@example.com",
        address: "505 Aspen Way, Somewhere, CA 75319",
        lastVisit: "2025-04-02T09:10:00",
        insuranceProvider: "Blue Shield",
        createdAt: "2024-01-08T00:00:00",
      },
      {
        id: "9",
        firstName: "Ethan",
        lastName: "Lee",
        fullName: "Ethan Lee",
        dateOfBirth: "1980-03-20",
        gender: "Male",
        contactNumber: "(555) 901-2345",
        email: "ethan.lee@example.com",
        address: "606 Willow St, Anywhere, CA 15937",
        lastVisit: "2025-04-07T15:45:00",
        insuranceProvider: "Anthem",
        createdAt: "2024-01-09T00:00:00",
      },
      {
        id: "10",
        firstName: "Isabella",
        lastName: "Hernandez",
        fullName: "Isabella Hernandez",
        dateOfBirth: "1998-01-15",
        gender: "Female",
        contactNumber: "(555) 012-3456",
        email: "isabella.hernandez@example.com",
        address: "707 Spruce Ct, Everywhere, CA 35791",
        lastVisit: "2025-03-10T14:20:00",
        insuranceProvider: "Medicaid",
        createdAt: "2024-01-10T00:00:00",
      },
      {
        id: "11",
        firstName: "Alexander",
        lastName: "Clark",
        fullName: "Alexander Clark",
        dateOfBirth: "1976-06-22",
        gender: "Male",
        contactNumber: "(555) 123-4567",
        email: "alexander.clark@example.com",
        address: "808 Redwood Rd, Someplace, CA 86420",
        lastVisit: "2025-03-30T11:25:00",
        insuranceProvider: "Tricare",
        createdAt: "2024-01-11T00:00:00",
      },
      {
        id: "12",
        firstName: "Mia",
        lastName: "Lewis",
        fullName: "Mia Lewis",
        dateOfBirth: "1993-10-08",
        gender: "Female",
        contactNumber: "(555) 234-5678",
        email: "mia.lewis@example.com",
        address: "909 Sequoia Dr, Nowhere, CA 97531",
        lastVisit: "2025-04-04T10:05:00",
        insuranceProvider: "Molina",
        createdAt: "2024-01-12T00:00:00",
      },
    ];

    setPatients(demoData);
  }, []);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new column and default to ascending order
      setSortColumn(column);
      setSortDirection("asc");
    }

    // Sort the data
    const sortedPatients = [...patients].sort((a: any, b: any) => {
      if (a[column] < b[column]) return sortDirection === "asc" ? -1 : 1;
      if (a[column] > b[column]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setPatients(sortedPatients);
    
    toast({
      title: "Sorted by " + column,
      description: `Showing ${sortDirection === "asc" ? "ascending" : "descending"} order`,
    });
  };

  const handleEdit = (patient: PatientType) => {
    setSelectedPatient(patient);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setPatientToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (patientToDeleteId) {
      const updatedPatients = patients.filter(patient => patient.id !== patientToDeleteId);
      setPatients(updatedPatients);
      
      toast({
        title: "Patient deleted",
        description: "Patient has been removed successfully",
      });
    }
    
    setPatientToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleSavePatient = (patient: PatientType) => {
    let updatedPatients: PatientType[];
    const isNew = !patients.some(p => p.id === patient.id);
    
    if (isNew) {
      updatedPatients = [...patients, patient];
      toast({
        title: "Patient added",
        description: `${patient.fullName} has been added successfully`,
      });
    } else {
      updatedPatients = patients.map(p => p.id === patient.id ? patient : p);
      toast({
        title: "Patient updated",
        description: `${patient.fullName}'s information has been updated`,
      });
    }
    
    setPatients(updatedPatients);
  };

  const filteredPatients = patients.filter(patient => 
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contactNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="sticky-header">
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-2xl font-semibold">Patients</h1>
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <PatientViewToggle view={viewType} onChange={setViewType} />
            <Button variant="outline" size="icon" className="hidden md:flex">
              <Filter className="h-4 w-4" />
            </Button>
            <Button onClick={() => {
              setSelectedPatient(undefined);
              setFormOpen(true);
            }}>
              {isMobile ? (
                <Plus className="h-4 w-4" />
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span className="add-button-text">Add Patient</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-220px)] overflow-auto">
        {viewType === "list" ? (
          <PatientTable
            data={filteredPatients}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <PatientCardView
            data={filteredPatients}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Patient Form Dialog */}
      <PatientForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedPatient(undefined);
        }}
        onSave={handleSavePatient}
        patient={selectedPatient}
        title={selectedPatient ? "Edit Patient" : "Add New Patient"}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              patient record from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default Patients;
