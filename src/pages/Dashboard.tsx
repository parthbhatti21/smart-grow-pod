import { Thermometer, Droplets, CloudRain, Wind, Beaker, Sun, CheckCircle, Waves, Brain, Settings } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSetups } from '@/contexts/SetupContext';
import SensorCard from '@/components/SensorCard';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Mock 24h sensor data
const chartData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  temperature: 22 + Math.sin(i / 4) * 6 + Math.random() * 2,
  humidity: 60 + Math.cos(i / 3) * 15 + Math.random() * 5,
  moisture: 45 + Math.sin(i / 5) * 10 + Math.random() * 3,
}));

const Dashboard = () => {
  const { t } = useLanguage();
  const { setups, activeSetupId } = useSetups();
  const navigate = useNavigate();
  const activeSetup = setups.find(s => s.id === activeSetupId) || setups[0];
  const sensors = [
    { icon: Thermometer, label: t('temperature'), value: '28.5', unit: '°C', status: 'normal' as const },
    { icon: Droplets, label: t('humidity'), value: '72', unit: '%', status: 'normal' as const },
    { icon: CloudRain, label: t('soilMoisture'), value: '48', unit: '%', status: 'normal' as const },
    { icon: Wind, label: t('co2Level'), value: '420', unit: 'ppm', status: 'warning' as const },
    { icon: Beaker, label: t('nutrientPH'), value: '6.5', unit: 'pH', status: 'normal' as const },
    { icon: Sun, label: t('lightIntensity'), value: '850', unit: 'lux', status: 'normal' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              {activeSetup ? activeSetup.name : t('dashTitle')}
            </h1>
            <p className="text-muted-foreground mt-1">{t('dashSubtitle')}</p>
          </div>
          <button
            onClick={() => navigate('/setups')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">{t('setupManage')}</span>
          </button>
        </div>

        {/* Status banner */}
        <div className="mb-6 p-4 rounded-2xl gradient-hero flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-primary-foreground" />
            <div>
              <p className="text-sm font-bold text-primary-foreground">{t('systemStatus')}: {t('allSystemsNormal')}</p>
              <p className="text-xs text-primary-foreground/70">{t('irrigationActive')} • {t('aiAnalyzing')}</p>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-2">
            <Waves className="w-4 h-4 text-primary-foreground/70" />
            <Brain className="w-4 h-4 text-primary-foreground/70 animate-pulse" />
          </div>
        </div>

        {/* Sensor grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sensors.map(s => (
            <SensorCard key={s.label} {...s} />
          ))}
        </div>

        {/* Chart */}
        <div className="p-5 md:p-6 rounded-2xl bg-card shadow-card border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">{t('sensorHistory')}</h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 70%, 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0, 70%, 55%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="moistGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 52%, 35%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142, 52%, 35%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(120, 15%, 88%)" />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="hsl(150, 10%, 45%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(150, 10%, 45%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(120, 15%, 88%)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="temperature" stroke="hsl(0, 70%, 55%)" fill="url(#tempGrad)" strokeWidth={2} name="Temp °C" />
                <Area type="monotone" dataKey="humidity" stroke="hsl(200, 80%, 50%)" fill="url(#humGrad)" strokeWidth={2} name="Humidity %" />
                <Area type="monotone" dataKey="moisture" stroke="hsl(142, 52%, 35%)" fill="url(#moistGrad)" strokeWidth={2} name="Moisture %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
