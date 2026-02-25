import { useState } from 'react';
import { Menu, X, Sprout } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language, languageNames } from '@/i18n/translations';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { key: 'navHome', path: '/' },
    { key: 'navDashboard', path: '/dashboard' },
    { key: 'navFeatures', path: '/#features' },
    { key: 'navImpact', path: '/#impact' },
  ];

  const handleNav = (path: string) => {
    setMobileOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') navigate('/');
      setTimeout(() => {
        document.getElementById(path.replace('/#', ''))?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 gradient-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button onClick={() => handleNav('/')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">{t('brand')}</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <button
                key={l.key}
                onClick={() => handleNav(l.path)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(l.key)}
              </button>
            ))}
            {/* Language selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="text-xs bg-muted rounded-lg px-2 py-1.5 border border-border text-foreground"
            >
              {(Object.entries(languageNames) as [Language, string][]).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {links.map(l => (
              <button
                key={l.key}
                onClick={() => handleNav(l.path)}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                {t(l.key)}
              </button>
            ))}
            <select
              value={language}
              onChange={(e) => { setLanguage(e.target.value as Language); setMobileOpen(false); }}
              className="w-full mt-2 text-sm bg-muted rounded-lg px-3 py-2.5 border border-border text-foreground"
            >
              {(Object.entries(languageNames) as [Language, string][]).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
