
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    
    // Show toast notification when language changes
    toast({
      title: t('languageSwitcher.language') + ' ' + t('common.changed'),
      description: getCurrentLanguageFullName(lng),
      variant: "default" ,
    });
  };

  const getCurrentLanguageName = () => {
    switch(i18n.language) {
      case 'en': return 'EN';
      case 'hi': return 'HI';
      case 'ta': return 'TA';
      case 'te': return 'TE';
      case 'bn': return 'BN';
      case 'od': return 'OD';
      default: return 'EN';
    }
  };
  
  const getCurrentLanguageFullName = (lang: string) => {
    switch(lang) {
      case 'en': return 'English';
      case 'hi': return 'हिंदी (Hindi)';
      case 'ta': return 'தமிழ் (Tamil)';
      case 'te': return 'తెలుగు (Telugu)';
      case 'bn': return 'বাংলা (Bengali)';
      case 'od': return 'ଓଡ଼ିଆ (Odia)';
      default: return 'English';
    }
  };

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('i18nextLng', i18n.language);
  }, [i18n.language]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 px-3 gap-2 border border-gray-200 rounded-full hover:bg-gray-100">
          <Globe className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium md:inline hidden">{getCurrentLanguageName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => changeLanguage('en')} className="cursor-pointer">
          {t('languageSwitcher.english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('hi')} className="cursor-pointer">
          {t('languageSwitcher.hindi')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ta')} className="cursor-pointer">
          {t('languageSwitcher.tamil')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('te')} className="cursor-pointer">
          {t('languageSwitcher.telugu')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('bn')} className="cursor-pointer">
          {t('languageSwitcher.bengali')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('od')} className="cursor-pointer">
          {t('languageSwitcher.odia')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
