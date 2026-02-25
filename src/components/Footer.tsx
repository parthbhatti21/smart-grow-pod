import { Sprout } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground border-t border-primary-foreground/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Sprout className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold text-primary-foreground">{t('brand')}</span>
          </div>
          <p className="text-sm text-primary-foreground/50 text-center">{t('footerTagline')}</p>
          <p className="text-sm text-primary-foreground/40">{t('madeWith')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
