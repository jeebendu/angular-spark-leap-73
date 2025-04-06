
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Filter, PlusCircle, SearchIcon, Share2 } from "lucide-react";

export default function Reports() {
  return (
    <AppLayout>
      <div className="container px-4 mx-auto py-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-[#333]">Test Reports</h1>
          
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all">All Reports</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search reports..."
                    className="pl-10 w-full md:w-[220px] h-10"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Upload
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 gap-4">
                <ReportCard 
                  title="Complete Blood Count (CBC)"
                  date="23 Jun 2023"
                  status="normal"
                  patient="John Doe"
                  lab="Orange Health Labs"
                />
                
                <ReportCard 
                  title="Blood Glucose Fasting"
                  date="15 May 2023"
                  status="attention"
                  patient="John Doe"
                  lab="Apollo Diagnostics"
                />
                
                <ReportCard 
                  title="Thyroid Profile Total"
                  date="02 Apr 2023"
                  status="normal"
                  patient="John Doe"
                  lab="Orange Health Labs"
                />
                
                <ReportCard 
                  title="Lipid Profile"
                  date="18 Mar 2023"
                  status="attention"
                  patient="Sarah Doe"
                  lab="Metropolis Healthcare"
                />
                
                <ReportCard 
                  title="Vitamin D, 25-Hydroxy"
                  date="05 Feb 2023"
                  status="critical"
                  patient="John Doe"
                  lab="Orange Health Labs"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              <div className="grid grid-cols-1 gap-4">
                <ReportCard 
                  title="Complete Blood Count (CBC)"
                  date="23 Jun 2023"
                  status="normal"
                  patient="John Doe"
                  lab="Orange Health Labs"
                />
                
                <ReportCard 
                  title="Blood Glucose Fasting"
                  date="15 May 2023"
                  status="attention"
                  patient="John Doe"
                  lab="Apollo Diagnostics"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="family" className="mt-0">
              <div className="grid grid-cols-1 gap-4">
                <ReportCard 
                  title="Lipid Profile"
                  date="18 Mar 2023"
                  status="attention"
                  patient="Sarah Doe"
                  lab="Metropolis Healthcare"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}

interface ReportCardProps {
  title: string;
  date: string;
  status: "normal" | "attention" | "critical";
  patient: string;
  lab: string;
}

function ReportCard({ title, date, status, patient, lab }: ReportCardProps) {
  const statusColors = {
    normal: "bg-green-50 text-green-600",
    attention: "bg-amber-50 text-amber-600",
    critical: "bg-red-50 text-red-600"
  };
  
  const statusText = {
    normal: "Normal",
    attention: "Needs Attention",
    critical: "Critical"
  };
  
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-orange-50 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-[#333]">{title}</h3>
              <p className="text-sm text-gray-500">{date} • {patient}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className={`text-xs font-medium px-2 py-1 rounded ${statusColors[status]}`}>
              {statusText[status]}
            </div>
            <p className="text-xs text-gray-500">{lab}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 px-2">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-2">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8">View</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
