import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate } from 'react-router-dom';
import heroDome from '@/assets/hero-dome.jpg';

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={heroDome} alt="KrishiDome smart agriculture" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 mb-6 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-semibold text-primary-foreground tracking-wider uppercase">
              {t('tagline')}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {t('heroTitle')}
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('heroSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl gradient-hero text-primary-foreground font-bold text-base shadow-glow hover:opacity-90 transition-all active:scale-[0.98]"
            >
              {t('ctaDashboard')}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 transition-all"
            >
              <Play className="w-5 h-5" />
              {t('ctaLearnMore')}
            </button>
          </div>

          {/* Stats bar */}
          <div className="mt-12 flex flex-wrap gap-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {[
              { val: '50%+', label: t('impactYield') },
              { val: '70%', label: t('impactWater') },
              { val: '365', label: t('impactUptime') },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-secondary">{s.val}</p>
                <p className="text-sm text-primary-foreground/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
