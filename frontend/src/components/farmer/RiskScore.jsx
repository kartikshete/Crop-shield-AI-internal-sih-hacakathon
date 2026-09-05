import React from 'react';
import { ShieldAlert, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const RiskScore = ({ riskScore = 82, riskLevel = 'HIGH' }) => {
  const { t } = useLanguage();

  const isHigh = riskLevel === 'HIGH' || riskScore >= 70;
  const isModerate = riskLevel === 'MODERATE' || (riskScore >= 40 && riskScore < 70);

  const colors = {
    bg: isHigh ? 'bg-rose-50 border-rose-200' : isModerate ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200',
    text: isHigh ? 'text-rose-700' : isModerate ? 'text-amber-700' : 'text-emerald-700',
    badge: isHigh ? 'bg-rose-100 text-rose-800' : isModerate ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800',
  };

  return (
    <div className={`p-6 rounded-3xl border shadow-card transition-all ${colors.bg}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`w-5 h-5 ${colors.text}`} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {t('farmer.riskScoreLabel')}
          </span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${colors.badge}`}>
          {riskLevel} RISK OUTBREAK
        </span>
      </div>

      <div className="flex items-baseline gap-3 my-3">
        <span className={`text-4xl sm:text-5xl font-black tracking-tight ${colors.text}`}>
          {riskScore}
        </span>
        <span className="text-sm font-bold text-slate-500">/ 100 Outbreak Probability</span>
      </div>

      <div className="w-full h-3 rounded-full bg-slate-200/80 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isHigh ? 'bg-rose-600' : isModerate ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${Math.min(100, riskScore)}%` }}
        />
      </div>

      <p className="text-xs text-slate-600 mt-3 leading-relaxed">
        {isHigh
          ? 'Urgent attention required. Environmental factors match aggressive spore development curve.'
          : isModerate
          ? 'Elevated risk detected. Implement Tier 1 sanitation and physical traps.'
          : 'Low epidemic pressure. Crop environment is resilient.'}
      </p>
    </div>
  );
};

export default RiskScore;
