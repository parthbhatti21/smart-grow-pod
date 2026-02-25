import { TrendingUp, Droplets, DollarSign, Calendar } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const ImpactSection = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: TrendingUp, value: '30–50%', label: t('impactYield'), desc: 'Higher crop production per cycle' },
    { icon: Droplets, value: '60–70%', label: t('impactWater'), desc: 'Less water consumption' },
    { icon: DollarSign, value: '40%', label: t('impactCost'), desc: 'Lower input costs' },
    { icon: Calendar, value: '365', label: t('impactUptime'), desc: 'Days of farming capability' },
  ];

  return (
    <section id="impact" className="py-20 md:py-28 bg-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-4">{t('impactTitle')}</h2>
          <p className="text-lg text-primary-foreground/60 max-w-2xl mx-auto">{t('impactSubtitle')}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors">
              <div className="w-14 h-14 mx-auto rounded-xl gradient-hero flex items-center justify-center mb-4 animate-pulse-glow">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="text-4xl font-extrabold text-secondary mb-1">{s.value}</p>
              <p className="text-sm font-semibold text-primary-foreground mb-1">{s.label}</p>
              <p className="text-xs text-primary-foreground/50">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
