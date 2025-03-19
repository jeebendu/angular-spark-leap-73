
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguageName = () => {
    switch(i18n.language) {
      case 'en': return 'English';
      case 'hi': return 'हिंदी';
      case 'ta': return 'தமிழ்';
      case 'te': return 'తెలుగు';
      case 'bn': return 'বাংলা';
      case 'od': return 'ଓଡ଼ିଆ';
      default: return 'English';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 px-3 gap-2 border border-gray-300 rounded-md hover:bg-gray-100">
          <Globe className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{getCurrentLanguageName()}</span>
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
