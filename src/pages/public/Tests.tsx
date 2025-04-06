
import { AppLayout } from "@/components/AppLayout";
import { SearchBar } from "@/components/public/home/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, CalendarDays, ChevronRight, Clock, Heart, Syringe, TestTubes, Thermometer } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function Tests() {
  const { t } = useTranslation();
  
  return (
    <AppLayout>
      <div className="container px-4 mx-auto py-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-[#333]">{t('tests.title')}</h1>
          
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <SearchBar />
            <Button className="bg-primary hover:bg-primary/90 text-white">{t('tests.bookTest')}</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TestPackageCard 
              title={t('tests.packages.cbc.title')}
              description={t('tests.packages.cbc.description')}
              price={599}
              originalPrice={799}
              tests={8}
              icon={<Beaker className="w-6 h-6 text-primary" />}
            />
            
            <TestPackageCard 
              title={t('tests.packages.diabetes.title')}
              description={t('tests.packages.diabetes.description')}
              price={899}
              originalPrice={1299}
              tests={5}
              icon={<Syringe className="w-6 h-6 text-primary" />}
            />
            
            <TestPackageCard 
              title={t('tests.packages.thyroid.title')}
              description={t('tests.packages.thyroid.description')}
              price={699}
              originalPrice={999}
              tests={3}
              icon={<Thermometer className="w-6 h-6 text-primary" />}
            />
            
            <TestPackageCard 
              title={t('tests.packages.heart.title')}
              description={t('tests.packages.heart.description')}
              price={1299}
              originalPrice={1999}
              tests={10}
              icon={<Heart className="w-6 h-6 text-primary" />}
            />
            
            <TestPackageCard 
              title={t('tests.packages.vitamin.title')}
              description={t('tests.packages.vitamin.description')}
              price={899}
              originalPrice={1499}
              tests={6}
              icon={<TestTubes className="w-6 h-6 text-primary" />}
            />
            
            <TestPackageCard 
              title={t('tests.packages.women.title')}
              description={t('tests.packages.women.description')}
              price={1599}
              originalPrice={2499}
              tests={12}
              icon={<Beaker className="w-6 h-6 text-primary" />}
            />
          </div>
          
          <h2 className="text-xl font-semibold text-[#333] mt-4">{t('tests.healthConcerns')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <HealthConcernCard label={t('healthConcerns.diabetes')} icon={<Syringe className="w-5 h-5" />} />
            <HealthConcernCard label={t('healthConcerns.thyroid')} icon={<Thermometer className="w-5 h-5" />} />
            <HealthConcernCard label={t('healthConcerns.heart')} icon={<Heart className="w-5 h-5" />} />
            <HealthConcernCard label={t('healthConcerns.liver')} icon={<Beaker className="w-5 h-5" />} />
            <HealthConcernCard label={t('healthConcerns.kidney')} icon={<TestTubes className="w-5 h-5" />} />
            <HealthConcernCard label={t('healthConcerns.allergy')} icon={<TestTubes className="w-5 h-5" />} />
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
  const { t } = useTranslation();
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
            {discount}% {t('common.off')}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <CardDescription className="text-sm text-gray-600 mb-3">{description}</CardDescription>
        <div className="flex items-center gap-3 my-2">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <TestTubes className="w-4 h-4" />
            <span>{tests} {t('tests.testsIncluded')}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{t('tests.turnaround')}</span>
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
            <span className="text-gray-600">{t('tests.availableToday')}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
            {t('tests.bookNow')} <ChevronRight className="w-4 h-4 ml-1" />
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
