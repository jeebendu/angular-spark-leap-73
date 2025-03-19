
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
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">{getCurrentLanguageName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          {t('languageSwitcher.english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('hi')}>
          {t('languageSwitcher.hindi')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ta')}>
          {t('languageSwitcher.tamil')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('te')}>
          {t('languageSwitcher.telugu')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('bn')}>
          {t('languageSwitcher.bengali')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('od')}>
          {t('languageSwitcher.odia')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
