import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
}

const statusColors = {
  normal: 'border-primary/30 bg-accent/50',
  warning: 'border-secondary/50 bg-secondary/10',
  critical: 'border-destructive/50 bg-destructive/10',
};

const statusDot = {
  normal: 'bg-primary',
  warning: 'bg-secondary',
  critical: 'bg-destructive',
};

const SensorCard = ({ icon: Icon, label, value, unit, status }: SensorCardProps) => {
  return (
    <div className={`p-4 md:p-5 rounded-2xl border-2 ${statusColors[status]} shadow-card transition-all hover:shadow-elevated hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className={`w-3 h-3 rounded-full ${statusDot[status]} animate-pulse`} />
      </div>
      <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl md:text-3xl font-extrabold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
};

export default SensorCard;
