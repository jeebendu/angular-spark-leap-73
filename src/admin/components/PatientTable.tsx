
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { PatientType } from "@/admin/types/patient";
import { Button } from "@/components/ui/button";
import { 
  ChevronUp, 
  ChevronDown, 
  MoreHorizontal, 
  User, 
  Edit, 
  Trash2 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PatientTableProps {
  data: PatientType[];
  onSort: (column: string) => void;
  sortColumn: string;
  sortDirection: "asc" | "desc";
  onEdit: (patient: PatientType) => void;
  onDelete: (id: string) => void;
}

const PatientTable = ({
  data,
  onSort,
  sortColumn,
  sortDirection,
  onEdit,
  onDelete
}: PatientTableProps) => {
  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const handleSort = (column: string) => {
    onSort(column);
  };

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 sticky top-0 z-10">
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="w-[250px]">
              <Button
                variant="ghost"
                onClick={() => handleSort("fullName")}
                className="flex items-center font-semibold text-xs uppercase tracking-wide"
              >
                Patient Name
                {renderSortIcon("fullName")}
              </Button>
            </TableHead>
            <TableHead className="w-[120px] hidden sm:table-cell">
              <Button
                variant="ghost"
                onClick={() => handleSort("dateOfBirth")}
                className="flex items-center font-semibold text-xs uppercase tracking-wide"
              >
                Date of Birth
                {renderSortIcon("dateOfBirth")}
              </Button>
            </TableHead>
            <TableHead className="w-[100px] hidden md:table-cell">
              <Button
                variant="ghost"
                onClick={() => handleSort("gender")}
                className="flex items-center font-semibold text-xs uppercase tracking-wide"
              >
                Gender
                {renderSortIcon("gender")}
              </Button>
            </TableHead>
            <TableHead className="w-[150px] hidden sm:table-cell">
              <Button
                variant="ghost"
                onClick={() => handleSort("contactNumber")}
                className="flex items-center font-semibold text-xs uppercase tracking-wide"
              >
                Contact
                {renderSortIcon("contactNumber")}
              </Button>
            </TableHead>
            <TableHead className="w-[150px] hidden lg:table-cell">
              <Button
                variant="ghost"
                onClick={() => handleSort("lastVisit")}
                className="flex items-center font-semibold text-xs uppercase tracking-wide"
              >
                Last Visit
                {renderSortIcon("lastVisit")}
              </Button>
            </TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-[calc(100vh-260px)]">
        <Table>
          <TableBody>
            {data.map((patient) => (
              <TableRow
                key={patient.id}
                className="border-b hover:bg-sky-50 cursor-pointer"
              >
                <TableCell className="py-3">
                  <div className="flex items-center">
                    <span className="mr-3 text-sky-500">
                      <User className="h-5 w-5" />
                    </span>
                    <span className="font-medium">{patient.fullName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600 hidden sm:table-cell">
                  {patient.dateOfBirth}
                </TableCell>
                <TableCell className="text-sm text-gray-600 hidden md:table-cell">
                  {patient.gender}
                </TableCell>
                <TableCell className="text-sm text-gray-600 hidden sm:table-cell">
                  {patient.contactNumber}
                </TableCell>
                <TableCell className="text-sm text-gray-600 hidden lg:table-cell">
                  {formatDistanceToNow(new Date(patient.lastVisit), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(patient);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(patient.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default PatientTable;
