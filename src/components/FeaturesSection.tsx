import { Brain, Droplets, Beaker, Thermometer, ShieldCheck, Sun } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Brain, titleKey: 'feat1Title', descKey: 'feat1Desc', color: 'from-primary to-accent' },
    { icon: Droplets, titleKey: 'feat2Title', descKey: 'feat2Desc', color: 'from-blue-500 to-cyan-400' },
    { icon: Beaker, titleKey: 'feat3Title', descKey: 'feat3Desc', color: 'from-secondary to-amber-400' },
    { icon: Thermometer, titleKey: 'feat4Title', descKey: 'feat4Desc', color: 'from-red-400 to-orange-400' },
    { icon: ShieldCheck, titleKey: 'feat5Title', descKey: 'feat5Desc', color: 'from-emerald-500 to-green-400' },
    { icon: Sun, titleKey: 'feat6Title', descKey: 'feat6Desc', color: 'from-yellow-400 to-orange-300' },
  ];

  return (
    <section id="features" className="py-20 md:py-28 gradient-earth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">{t('featuresTitle')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('featuresSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.titleKey}
              className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t(f.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
