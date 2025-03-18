
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarDays, ChevronRight, Clock, Flask, Heart, Needle, SearchIcon, TestTube, ThermometerSun } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";

export default function Tests() {
  return (
    <AppLayout>
      <div className="container px-4 mx-auto py-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-[#333]">Lab Tests</h1>
          
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <SearchBar />
            <Button className="bg-primary hover:bg-primary/90 text-white">Book a Test</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TestPackageCard 
              title="Complete Blood Count" 
              description="Check your overall health with our comprehensive blood test"
              price={599}
              originalPrice={799}
              tests={8}
              icon={<Flask className="w-6 h-6 text-primary" />}
            />
            
            <TestPackageCard 
              title="Diabetes Screening" 
              description="Early detection and monitoring of diabetes"
              price={899}
              originalPrice={1299}
              tests={5}
              icon={<Needle className="w-6 h-6 text-primary" />}
            />
            
            <TestPackageCard 
              title="Thyroid Profile" 
              description="Comprehensive analysis of thyroid function"
              price={699}
              originalPrice={999}
              tests={3}
              icon={<ThermometerSun className="w-6 h-6 text-primary" />}
            />
            
            <TestPackageCard 
              title="Heart Health" 
              description="Comprehensive cardiac risk assessment"
              price={1299}
              originalPrice={1999}
              tests={10}
              icon={<Heart className="w-6 h-6 text-primary" />}
            />
            
            <TestPackageCard 
              title="Vitamin Profile" 
              description="Check for vitamin deficiencies with our test"
              price={899}
              originalPrice={1499}
              tests={6}
              icon={<TestTube className="w-6 h-6 text-primary" />}
            />
            
            <TestPackageCard 
              title="Women's Health" 
              description="Comprehensive panel designed for women's wellness"
              price={1599}
              originalPrice={2499}
              tests={12}
              icon={<Flask className="w-6 h-6 text-primary" />}
            />
          </div>
          
          <h2 className="text-xl font-semibold text-[#333] mt-4">Popular Health Concerns</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <HealthConcernCard label="Diabetes" icon={<Needle className="w-5 h-5" />} />
            <HealthConcernCard label="Thyroid" icon={<ThermometerSun className="w-5 h-5" />} />
            <HealthConcernCard label="Heart" icon={<Heart className="w-5 h-5" />} />
            <HealthConcernCard label="Liver" icon={<Flask className="w-5 h-5" />} />
            <HealthConcernCard label="Kidney" icon={<TestTube className="w-5 h-5" />} />
            <HealthConcernCard label="Allergy" icon={<TestTube className="w-5 h-5" />} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

interface TestPackageCardProps {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  tests: number;
  icon: React.ReactNode;
}

function TestPackageCard({ title, description, price, originalPrice, tests, icon }: TestPackageCardProps) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-orange-50 rounded-lg">
              {icon}
            </div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
          </div>
          <div className="bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded">
            {discount}% OFF
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <CardDescription className="text-sm text-gray-600 mb-3">{description}</CardDescription>
        <div className="flex items-center gap-3 my-2">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <TestTube className="w-4 h-4" />
            <span>{tests} Tests included</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="w-4 h-4" />
            <span>24 hours</span>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-lg font-bold text-primary">₹{price}</p>
          <p className="text-sm text-gray-500 line-through ml-2">₹{originalPrice}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 py-2 px-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1 text-xs">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="text-gray-600">Available today</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
            Book Now <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function HealthConcernCard({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <Card className="border border-gray-100 hover:border-primary/20 hover:bg-orange-50/30 transition-colors cursor-pointer">
      <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
        <div className="p-2 bg-orange-50 rounded-full">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </CardContent>
    </Card>
  );
}
