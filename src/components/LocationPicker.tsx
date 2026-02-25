import { useState } from 'react';
import { MapPin, Globe, ChevronRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language, languageNames } from '@/i18n/translations';

const indianStates = [
  'Andhra Pradesh', 'Bihar', 'Chhattisgarh', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu',
  'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const LocationPicker = () => {
  const { t, setLanguageFromState, setLanguage, setLocationSet } = useLanguage();
  const [detecting, setDetecting] = useState(false);

  const handleDetect = () => {
    setDetecting(true);
    // Simulate geolocation detection
    setTimeout(() => {
      setLanguageFromState('maharashtra');
      setDetecting(false);
    }, 1500);
  };

  const handleStateSelect = (state: string) => {
    setLanguageFromState(state);
  };

  const handleLanguageDirect = (lang: Language) => {
    setLanguage(lang);
    setLocationSet(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-card shadow-elevated p-6 md:p-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('locationTitle')}</h2>
            <p className="text-sm text-muted-foreground">{t('locationSubtitle')}</p>
          </div>
        </div>

        {/* Detect button */}
        <button
          onClick={handleDetect}
          disabled={detecting}
          className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl gradient-hero text-primary-foreground font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
        >
          {detecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
          {t('locationDetect')}
        </button>

        {/* Language direct select */}
        <div className="mt-5">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Choose Language</p>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(languageNames) as [Language, string][]).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLanguageDirect(code)}
                className="px-4 py-2 rounded-lg border border-border bg-muted text-sm font-medium text-foreground hover:bg-accent hover:border-primary transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* State select */}
        <div className="mt-5">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">{t('locationManual')}</p>
          <div className="max-h-48 overflow-y-auto rounded-xl border border-border">
            {indianStates.map(state => (
              <button
                key={state}
                onClick={() => handleStateSelect(state)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors border-b border-border last:border-0"
              >
                {state}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
