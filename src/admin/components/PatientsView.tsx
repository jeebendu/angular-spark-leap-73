
import React, { useState } from "react";
import { PatientType } from "@/admin/types/patient";
import PatientTable from "./PatientTable";
import PatientCardView from "./PatientCardView";
import PatientViewToggle from "./PatientViewToggle";

interface PatientsViewProps {
  patients: PatientType[];
  sortColumn: string;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
  onEdit: (patient: PatientType) => void;
  onDelete: (id: string) => void;
}

const PatientsView = ({
  patients,
  sortColumn,
  sortDirection,
  onSort,
  onEdit,
  onDelete
}: PatientsViewProps) => {
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Patients</h2>
        <PatientViewToggle view={viewMode} onChange={setViewMode} />
      </div>
      
      {viewMode === "list" ? (
        <PatientTable
          data={patients}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={onSort}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <PatientCardView
          data={patients}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default PatientsView;
