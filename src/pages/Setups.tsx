import { useState } from 'react';
import { Plus, Trash2, Radio, MapPin, Wheat, Ruler, ArrowRight, Sprout } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSetups, DomeSetup } from '@/contexts/SetupContext';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';

const Setups = () => {
  const { t } = useLanguage();
  const { setups, addSetup, removeSetup, activeSetupId, setActiveSetupId } = useSetups();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', cropType: '', area: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addSetup(form);
    setForm({ name: '', location: '', cropType: '', area: '' });
    setShowForm(false);
  };

  const handleMonitor = (id: string) => {
    setActiveSetupId(id);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">{t('setupTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('setupSubtitle')}</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-hero text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all active:scale-[0.97]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t('addSetup')}</span>
          </button>
        </div>

        {/* Add form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-5 rounded-2xl bg-card border border-border shadow-card animate-slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{t('setupName')}</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="e.g. Farm Dome #1"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{t('setupLocation')}</label>
                <input
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="e.g. Pune, Maharashtra"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{t('setupCropType')}</label>
                <input
                  value={form.cropType}
                  onChange={e => setForm(f => ({ ...f, cropType: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="e.g. Tomatoes, Leafy Greens"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{t('setupArea')}</label>
                <input
                  value={form.area}
                  onChange={e => setForm(f => ({ ...f, area: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="e.g. 500"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-accent transition-colors">
                {t('setupCancel')}
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl gradient-hero text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all">
                {t('setupSave')}
              </button>
            </div>
          </form>
        )}

        {/* Empty state */}
        {setups.length === 0 && !showForm && (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 rounded-2xl gradient-hero mx-auto flex items-center justify-center mb-4">
              <Sprout className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{t('setupEmpty')}</h3>
            <p className="text-muted-foreground text-sm mb-6">{t('setupEmptyDesc')}</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-hero text-primary-foreground font-semibold hover:opacity-90 transition-all"
            >
              <Plus className="w-5 h-5" />
              {t('addSetup')}
            </button>
          </div>
        )}

        {/* Setup cards */}
        <div className="space-y-4">
          {setups.map(setup => (
            <div
              key={setup.id}
              className={`p-4 sm:p-5 rounded-2xl border-2 bg-card shadow-card transition-all hover:shadow-elevated ${
                activeSetupId === setup.id ? 'border-primary/50' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-foreground truncate">{setup.name}</h3>
                    {activeSetupId === setup.id && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        <Radio className="w-3 h-3" />
                        {t('setupConnected')}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    {setup.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {setup.location}
                      </span>
                    )}
                    {setup.cropType && (
                      <span className="flex items-center gap-1">
                        <Wheat className="w-3.5 h-3.5" />
                        {setup.cropType}
                      </span>
                    )}
                    {setup.area && (
                      <span className="flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5" />
                        {setup.area} sq ft
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleMonitor(setup.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl gradient-hero text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all"
                  >
                    {t('setupMonitor')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeSetup(setup.id)}
                    className="p-2 rounded-xl border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Setups;
