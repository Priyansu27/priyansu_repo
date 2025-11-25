import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Globe, Languages } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  onLanguageChange?: (languageCode: string) => void;
  variant?: 'default' | 'compact';
}

export function LanguageSelector({ onLanguageChange, variant = 'default' }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    onLanguageChange?.(languageCode);
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  if (variant === 'compact') {
    return (
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-20 h-9 border-orange-200 bg-white hover:bg-orange-50">
          <SelectValue>
            <div className="flex items-center gap-1">
              <span className="text-sm">{currentLanguage.flag}</span>
              <Languages className="h-3 w-3 text-orange-600" />
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-64">
          <div className="p-2 border-b border-orange-100">
            <div className="flex items-center gap-2 text-sm font-medium text-orange-800">
              <Globe className="h-4 w-4" />
              Select Language | भाषा चुनें
            </div>
          </div>
          {languages.map((language) => (
            <SelectItem 
              key={language.code} 
              value={language.code}
              className="flex items-center justify-between py-3 hover:bg-orange-50 focus:bg-orange-50"
            >
              <div className="flex items-center gap-3 w-full">
                <span className="text-lg">{language.flag}</span>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{language.name}</div>
                  <div className="text-sm text-muted-foreground">{language.nativeName}</div>
                </div>
                {selectedLanguage === language.code && (
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-48 border-orange-200 bg-white hover:bg-orange-50">
        <SelectValue>
          <div className="flex items-center gap-2">
            <span>{currentLanguage.flag}</span>
            <span className="font-medium">{currentLanguage.nativeName}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-64">
        <div className="p-3 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-green-50">
          <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
            <Globe className="h-4 w-4" />
            Select Language | भाषा चुनें
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Choose your preferred language for Kisan Pragati
          </p>
        </div>
        {languages.map((language) => (
          <SelectItem 
            key={language.code} 
            value={language.code}
            className="flex items-center justify-between py-3 hover:bg-orange-50 focus:bg-orange-50"
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-lg">{language.flag}</span>
              <div className="flex-1">
                <div className="font-medium text-foreground">{language.name}</div>
                <div className="text-sm text-muted-foreground font-normal">{language.nativeName}</div>
              </div>
              {selectedLanguage === language.code && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <span className="text-xs text-green-600 font-medium">Selected</span>
                </div>
              )}
            </div>
          </SelectItem>
        ))}
        <div className="p-3 border-t border-orange-100 bg-gradient-to-r from-green-50 to-blue-50">
          <p className="text-xs text-center text-muted-foreground">
            🌾 Empowering farmers across India | भारत के किसानों का सश���्तिकरण
          </p>
        </div>
      </SelectContent>
    </Select>
  );
}